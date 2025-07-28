import { useState } from "react";
import { FileCode2, Plus, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MetaForm from "@/components/MetaForm";
import StringsForm from "@/components/StringsForm";
import ConditionBuilder from "@/components/ConditionBuilder";
import RulePreview from "@/components/RulePreview";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "wouter";
import { useYaraRuleSet } from "@/hooks/use-yara-rule";
import { generateYaraRuleSet } from "@/utils/yaraBuilder";
import { Footer } from "@/components/footer";

export default function RuleSmith() {
  const { toast } = useToast();
  const { 
    ruleSet, 
    addRule, 
    removeRule, 
    updateMetadata, 
    updateStrings, 
    updateCondition 
  } = useYaraRuleSet();

  const handleCopyRule = async () => {
    try {
      const yaraRuleSet = generateYaraRuleSet(ruleSet);
      await navigator.clipboard.writeText(yaraRuleSet);
      toast({
        title: "Copied!",
        description: "YARA rule set copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy rule set to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownloadRule = () => {
    try {
      const yaraRuleSet = generateYaraRuleSet(ruleSet);
      const blob = new Blob([yaraRuleSet], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const firstRuleName = ruleSet.rules[0]?.metadata.ruleName || "ruleset";
      a.download = `${firstRuleName}.yar`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: "YARA rule set file downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download rule set file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <FileCode2 className="text-primary-foreground w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">YARA Rule Generator</h1>
              </div>
              {/* <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">YARA Rule Generator</span> */}
            </div>

            {/* Actions */}

            
            <div className="flex items-center space-x-2">
              <Link href="/about">
                <Button variant="outline">
                  <Info className="w-4 h-4 mr-2" />
                  About
                </Button>
              </Link>
              <ThemeToggle />
              
              {/* Export Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyRule}
                  className="flex items-center2"
                >
                  <span className="text-xs"></span>
                  <span>Copy</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownloadRule}
                  className="flex items-center "
                >
                  <span className="text-xs"></span>
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-8">
          {/* Rules */}
          {ruleSet.rules.map((rule, index) => (
            <div key={index} className="space-y-6">
              {/* Rule Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rule {index + 1}
                </h2>
                {ruleSet.rules.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRule(index)}
                    className="text-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove Rule
                  </Button>
                )}
              </div>

              {/* Rule Identity */}
              <MetaForm 
                metadata={rule.metadata} 
                onUpdate={(updates) => updateMetadata(index, updates)} 
              />

              {/* Strings */}
              <StringsForm 
                strings={rule.strings} 
                onUpdate={(strings) => updateStrings(index, strings)} 
              />

              {/* Condition */}
              <ConditionBuilder 
                condition={rule.condition} 
                onUpdate={(condition) => updateCondition(index, condition)} 
              />

              {/* Separator for multiple rules */}
              {index < ruleSet.rules.length - 1 && (
                <hr className="border-gray-200 dark:border-gray-700" />
              )}
            </div>
          ))}

          {/* Add Rule Button */}
          <div className="flex justify-center">
            <Button
              onClick={addRule}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add More Rules</span>
            </Button>
          </div>

          {/* Live Preview */}
          <div className="mt-8">
            <RulePreview ruleSet={ruleSet} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
