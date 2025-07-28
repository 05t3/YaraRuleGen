import type { YaraRule, YaraString, YaraRuleSet } from "@shared/schema";

export function generateYaraRuleSet(ruleSet: YaraRuleSet): string {
  if (ruleSet.rules.length === 0) {
    return "// No rules defined";
  }

  // Generate header comment
  const firstRule = ruleSet.rules[0];
  let output = "/*\n";
  output += "   Yara Rule Set\n";
  if (firstRule.metadata.author) {
    output += `   Author: ${firstRule.metadata.author}\n`;
  }
  if (firstRule.metadata.date) {
    output += `   Date: ${firstRule.metadata.date}\n`;
  }
  if (firstRule.metadata.reference) {
    output += `   Reference: ${firstRule.metadata.reference}\n`;
  }
  output += "*/\n\n";
  output += "/* Rule Set ----------------------------------------------------------------- */\n\n";

  // Add import if any rule uses pe functions
  const needsPeImport = ruleSet.rules.some(rule => 
    rule.condition.includes('pe.') || 
    rule.strings.some(str => str.value.includes('pe.'))
  );
  
  if (needsPeImport) {
    output += 'import "pe"\n\n';
  }

  // Generate each rule
  ruleSet.rules.forEach((rule, index) => {
    if (index > 0) output += "\n";
    output += generateYaraRule(rule);
  });

  return output;
}

export function generateYaraRule(rule: YaraRule): string {
  const { metadata, strings, condition } = rule;
  
  // Build the rule name (ensure it's valid YARA identifier)
  const ruleName = metadata.ruleName || "Unnamed_Rule";
  const validRuleName = ruleName.replace(/[^a-zA-Z0-9_]/g, '_');
  
  let yaraRule = `rule ${validRuleName} {\n`;
  
  // Meta section
  yaraRule += "    meta:\n";
  
  if (metadata.description) {
    yaraRule += `        description = "${escapeString(metadata.description)}"\n`;
  }
  
  if (metadata.author) {
    yaraRule += `        author = "${escapeString(metadata.author)}"\n`;
  }
  
  if (metadata.reference) {
    yaraRule += `        reference = "${escapeString(metadata.reference)}"\n`;
  }
  
  if (metadata.date) {
    yaraRule += `        date = "${metadata.date}"\n`;
  }
  
  if (metadata.score !== undefined) {
    yaraRule += `        score = ${metadata.score}\n`;
  }
  
  // Add hashes
  metadata.hashes.forEach(hash => {
    if (hash.value.trim()) {
      yaraRule += `        ${hash.label} = "${hash.value}"\n`;
    }
  });
  
  yaraRule += `        id = "${metadata.id}"\n`;
  
  // Strings section (only if strings exist)
  if (strings.length > 0) {
    yaraRule += "    strings:\n";
    
    strings.forEach(string => {
      if (string.value.trim()) {
        let stringLine = `        ${string.label} = "${escapeString(string.value)}"`;
        
        // Add modifiers
        const modifiers = [];
        if (string.modifiers.ascii) modifiers.push('ascii');
        if (string.modifiers.wide) modifiers.push('wide');
        if (string.modifiers.fullword) modifiers.push('fullword');
        if (string.modifiers.nocase) modifiers.push('nocase');
        
        if (modifiers.length > 0) {
          stringLine += ` ${modifiers.join(' ')}`;
        }
        
        yaraRule += stringLine + '\n';
      }
    });
  }
  
  // Condition section with improved formatting
  yaraRule += "    condition:\n";
  const formattedCondition = formatCondition(condition || 'true');
  yaraRule += formattedCondition;
  
  yaraRule += "}";
  
  return yaraRule;
}

function formatCondition(condition: string): string {
  // Check if condition contains complex logic that needs formatting
  const hasComplexLogic = condition.includes(' or ') && condition.includes(' and ');
  const hasParentheses = condition.includes('(') && condition.includes(')');
  
  if (!hasComplexLogic && !hasParentheses) {
    // Simple condition - keep on one line
    return `        ${condition}\n`;
  }
  
  // Complex condition - format with proper indentation
  let formatted = condition.trim();
  
  // Handle pe.imphash() patterns specifically
  if (formatted.includes('pe.imphash()') && formatted.includes(' or ')) {
    // Split at 'and' to separate main conditions from the or clause
    const parts = formatted.split(' and ');
    const mainPart = parts.slice(0, -1).join(' and ');
    const lastPart = parts[parts.length - 1];
    
    if (lastPart.includes(' or ')) {
      // Format as: main conditions and (
      //   complex or conditions
      // )
      const orParts = lastPart.split(' or ');
      let result = `        ${mainPart} and (\n`;
      orParts.forEach((part, index) => {
        const trimmedPart = part.trim();
        if (index === orParts.length - 1) {
          result += `         ${trimmedPart}\n`;
        } else {
          result += `         ${trimmedPart} or\n`;
        }
      });
      result += `      )\n`;
      return result;
    }
  }
  
  // Default formatting for other complex conditions
  return `        ${formatted}\n`;
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')  // Escape backslashes
    .replace(/"/g, '\\"')    // Escape quotes
    .replace(/\n/g, '\\n')   // Escape newlines
    .replace(/\r/g, '\\r')   // Escape carriage returns
    .replace(/\t/g, '\\t');  // Escape tabs
}

export function validateYaraRule(rule: YaraRule): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate rule name
  if (!rule.metadata.ruleName) {
    errors.push("Rule name is required");
  } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(rule.metadata.ruleName)) {
    errors.push("Rule name must be a valid identifier (letters, numbers, underscores only, cannot start with number)");
  }
  
  // Validate strings
  const stringLabels = new Set<string>();
  rule.strings.forEach((string, index) => {
    if (stringLabels.has(string.label)) {
      errors.push(`Duplicate string label: ${string.label}`);
    }
    stringLabels.add(string.label);
    
    if (!string.value.trim()) {
      errors.push(`String ${string.label} cannot be empty`);
    }
  });
  
  // Validate condition
  if (!rule.condition.trim()) {
    errors.push("Condition cannot be empty");
  }
  
  // Validate UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(rule.metadata.id)) {
    errors.push("Invalid UUID format");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
