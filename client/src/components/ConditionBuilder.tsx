import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, GitBranch } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ConditionBuilderProps {
  condition: string;
  onUpdate: (condition: string) => void;
}

export default function ConditionBuilder({ condition, onUpdate }: ConditionBuilderProps) {
  const insertCondition = (text: string) => {
    const currentValue = condition;
    if (currentValue.trim()) {
      onUpdate(currentValue + ' ' + text);
    } else {
      onUpdate(text);
    }
  };

  const conditionButtons = [
    { text: 'all of them', category: 'quantifier' },
    { text: 'any of them', category: 'quantifier' },
    { text: '1 of them', category: 'quantifier' },
    { text: '2 of them', category: 'quantifier' },
    { text: 'and', category: 'operator' },
    { text: 'or', category: 'operator' },
    { text: 'not', category: 'operator' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <GitBranch className="mr-2 w-4 h-4" />
          Condition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {conditionButtons.slice(0, 4).map((btn) => (
            <Button
              key={btn.text}
              variant="outline"
              size="sm"
              onClick={() => insertCondition(btn.text)}
              className="text-sm"
            >
              {btn.text}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          {conditionButtons.slice(4).map((btn) => (
            <Button
              key={btn.text}
              variant="outline"
              size="sm"
              onClick={() => insertCondition(btn.text)}
              className="text-sm"
            >
              {btn.text}
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="uint16(0) == 0x5a4d and filesize < 1MB and all of them"
          rows={4}
          value={condition}
          onChange={(e) => onUpdate(e.target.value)}
          className="font-mono text-sm resize-none"
        />
        
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            Common: filesize &lt; 1MB, uint16(0) == 0x5a4d (PE header)
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
