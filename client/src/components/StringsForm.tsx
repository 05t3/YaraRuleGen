import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Code, Plus, X, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { YaraString } from "@shared/schema";

interface StringsFormProps {
  strings: YaraString[];
  onUpdate: (strings: YaraString[]) => void;
}

export default function StringsForm({ strings, onUpdate }: StringsFormProps) {
  const addString = () => {
    const newString: YaraString = {
      id: crypto.randomUUID(),
      label: `$s${strings.length + 1}`,
      value: "",
      modifiers: {
        ascii: false,
        wide: false,
        fullword: false,
        nocase: false
      }
    };
    onUpdate([...strings, newString]);
  };

  const removeString = (id: string) => {
    onUpdate(strings.filter(str => str.id !== id));
  };

  const updateString = (id: string, updates: Partial<YaraString>) => {
    onUpdate(strings.map(str => 
      str.id === id ? { ...str, ...updates } : str
    ));
  };

  const updateStringModifier = (id: string, modifier: keyof YaraString['modifiers'], value: boolean) => {
    onUpdate(strings.map(str => 
      str.id === id 
        ? { ...str, modifiers: { ...str.modifiers, [modifier]: value } }
        : str
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Code className="mr-2 w-4 h-4" />
            Strings
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={addString}
            className="text-primary hover:text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add String
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {strings.map((string, index) => (
          <div key={string.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{string.label}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeString(string.id)}
                className="text-destructive hover:text-destructive-foreground p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <Input
                placeholder="String value..."
                value={string.value}
                onChange={(e) => updateString(string.id, { value: e.target.value })}
                className="font-mono text-sm"
              />
              <div className="flex flex-wrap gap-4">
                {Object.entries(string.modifiers).map(([modifier, checked]) => (
                  <div key={modifier} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${string.id}-${modifier}`}
                      checked={checked}
                      onCheckedChange={(value) => 
                        updateStringModifier(string.id, modifier as keyof YaraString['modifiers'], !!value)
                      }
                    />
                    <Label htmlFor={`${string.id}-${modifier}`} className="text-sm">
                      {modifier}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Use escape sequences like \x00 for binary patterns, \" for quotes
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
