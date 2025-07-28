import { useState, useCallback } from "react";
import type { YaraRule, YaraMetadata, YaraString, YaraRuleSet } from "@shared/schema";

function createNewRule(): YaraRule {
  return {
    metadata: {
      ruleName: "",
      description: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      score: 85,
      reference: "",
      id: crypto.randomUUID(),
      hashes: []
    },
    strings: [],
    condition: "uint16(0) == 0x5a4d and filesize < 1MB and all of them"
  };
}

export function useYaraRuleSet() {
  const [ruleSet, setRuleSet] = useState<YaraRuleSet>({
    rules: [createNewRule()]
  });

  const addRule = useCallback(() => {
    setRuleSet(prev => ({
      rules: [...prev.rules, createNewRule()]
    }));
  }, []);

  const removeRule = useCallback((index: number) => {
    setRuleSet(prev => ({
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  }, []);

  const updateRule = useCallback((index: number, updates: Partial<YaraRule>) => {
    setRuleSet(prev => ({
      rules: prev.rules.map((rule, i) => 
        i === index ? { ...rule, ...updates } : rule
      )
    }));
  }, []);

  const updateMetadata = useCallback((index: number, updates: Partial<YaraMetadata>) => {
    setRuleSet(prev => ({
      rules: prev.rules.map((rule, i) => 
        i === index 
          ? { ...rule, metadata: { ...rule.metadata, ...updates } }
          : rule
      )
    }));
  }, []);

  const updateStrings = useCallback((index: number, strings: YaraString[]) => {
    setRuleSet(prev => ({
      rules: prev.rules.map((rule, i) => 
        i === index ? { ...rule, strings } : rule
      )
    }));
  }, []);

  const updateCondition = useCallback((index: number, condition: string) => {
    setRuleSet(prev => ({
      rules: prev.rules.map((rule, i) => 
        i === index ? { ...rule, condition } : rule
      )
    }));
  }, []);

  return {
    ruleSet,
    addRule,
    removeRule,
    updateRule,
    updateMetadata,
    updateStrings,
    updateCondition,
    setRuleSet
  };
}

// Legacy hook for backward compatibility
export function useYaraRule() {
  const {
    ruleSet,
    updateMetadata: updateMetadataSet,
    updateStrings: updateStringsSet,
    updateCondition: updateConditionSet,
    setRuleSet
  } = useYaraRuleSet();

  const rule = ruleSet.rules[0] || createNewRule();

  const updateMetadata = useCallback((updates: Partial<YaraMetadata>) => {
    updateMetadataSet(0, updates);
  }, [updateMetadataSet]);

  const updateStrings = useCallback((strings: YaraString[]) => {
    updateStringsSet(0, strings);
  }, [updateStringsSet]);

  const updateCondition = useCallback((condition: string) => {
    updateConditionSet(0, condition);
  }, [updateConditionSet]);

  const setRule = useCallback((rule: YaraRule) => {
    setRuleSet({ rules: [rule] });
  }, [setRuleSet]);

  return {
    rule,
    updateMetadata,
    updateStrings,
    updateCondition,
    setRule
  };
}
