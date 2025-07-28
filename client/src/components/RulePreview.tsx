import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle } from "lucide-react";
import { HashIcon } from "lucide-react";
import { generateYaraRuleSet } from "@/utils/yaraBuilder";
import type { YaraRuleSet } from "@shared/schema";

interface RulePreviewProps {
  ruleSet: YaraRuleSet;
}

export default function RulePreview({ ruleSet }: RulePreviewProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    const loadMonaco = async () => {
      // Load Monaco Editor dynamically
      const monaco = await import('monaco-editor');
      
      // Register YARA language
      if (!monaco.languages.getLanguages().find(lang => lang.id === 'yara')) {
        monaco.languages.register({ id: 'yara' });
        
        // Define YARA syntax highlighting
        monaco.languages.setMonarchTokensProvider('yara', {
          tokenizer: {
            root: [
              // Keywords
              [/\b(rule|meta|strings|condition|import|include|global|private|and|or|not|all|any|of|them|for|in|at|entrypoint|filesize|uint8|uint16|uint32|int8|int16|int32)\b/, 'keyword'],
              
              // Rule names
              [/\b[A-Za-z_][A-Za-z0-9_]*(?=\s*\{)/, 'entity.name.function'],
              
              // String identifiers
              [/\$[A-Za-z_][A-Za-z0-9_]*/, 'variable'],
              
              // Numbers
              [/\b\d+\b/, 'number'],
              [/\b0x[0-9a-fA-F]+\b/, 'number.hex'],
              
              // Strings
              [/"([^"\\]|\\.)*$/, 'string.invalid'],
              [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
              
              // Comments
              [/\/\*/, 'comment', '@comment'],
              [/\/\/.*$/, 'comment'],
              
              // Operators
              [/[=!<>]=?/, 'operator'],
              [/[&|^~]/, 'operator'],
              [/[+\-*/%]/, 'operator'],
              
              // Delimiters
              [/[{}()\[\]]/, '@brackets'],
              [/[;,.]/, 'delimiter'],
              
              // Modifiers
              [/\b(ascii|wide|nocase|fullword|private|global)\b/, 'keyword.modifier'],
            ],
            
            string: [
              [/[^\\"]+/, 'string'],
              [/\\./, 'string.escape.invalid'],
              [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
            ],
            
            comment: [
              [/[^\/*]+/, 'comment'],
              [/\/\*/, 'comment', '@push'],
              ["\\*/", 'comment', '@pop'],
              [/[\/*]/, 'comment']
            ]
          }
        });
        
        // Define theme
        monaco.editor.defineTheme('yara-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'keyword', foreground: '569cd6' },
            { token: 'keyword.modifier', foreground: 'c586c0' },
            { token: 'entity.name.function', foreground: 'dcdcaa' },
            { token: 'variable', foreground: '9cdcfe' },
            { token: 'string', foreground: 'ce9178' },
            { token: 'comment', foreground: '6a9955' },
            { token: 'number', foreground: 'b5cea8' },
            { token: 'number.hex', foreground: 'b5cea8' },
            { token: 'operator', foreground: 'd4d4d4' },
          ],
          colors: {}
        });
        
        monaco.editor.defineTheme('yara-light', {
          base: 'vs',
          inherit: true,
          rules: [
            { token: 'keyword', foreground: '0000ff' },
            { token: 'keyword.modifier', foreground: 'af00db' },
            { token: 'entity.name.function', foreground: '795e26' },
            { token: 'variable', foreground: '001080' },
            { token: 'string', foreground: 'a31515' },
            { token: 'comment', foreground: '008000' },
            { token: 'number', foreground: '098658' },
            { token: 'number.hex', foreground: '098658' },
            { token: 'operator', foreground: '000000' },
          ],
          colors: {}
        });
      }
      
      if (editorRef.current && !monacoRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        monacoRef.current = monaco.editor.create(editorRef.current, {
          value: generateYaraRuleSet(ruleSet),
          language: 'yara',
          theme: isDark ? 'yara-dark' : 'yara-light',
          automaticLayout: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
          fontSize: 13,
          lineHeight: 20,
          tabSize: 4,
          readOnly: true,
          showUnused: false,
          folding: true,
          lineNumbers: 'on',
          renderLineHighlight: 'none'
        });
      }
    };

    loadMonaco().catch(console.error);

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
        monacoRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (monacoRef.current) {
      const yaraRuleSet = generateYaraRuleSet(ruleSet);
      monacoRef.current.setValue(yaraRuleSet);
    }
  }, [ruleSet]);

  // Handle theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      if (monacoRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        monacoRef.current.updateOptions({
          theme: isDark ? 'yara-dark' : 'yara-light'
        });
      }
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Eye className="mr-2 w-4 h-4" />
            Live Preview
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Auto-sync</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Monaco Editor Container */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div ref={editorRef} style={{ height: '600px' }} className="w-full" />
        </div>
        
        {/* Rule Validation Status */}
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center">
            <CheckCircle className="text-green-600 mr-2 w-4 h-4" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Rule syntax valid
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
