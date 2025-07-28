import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge, Info, Plus, X, RefreshCw } from "lucide-react";
import { HashIcon } from "lucide-react";
import type { YaraMetadata } from "@shared/schema";

interface MetaFormProps {
  metadata: YaraMetadata;
  onUpdate: (metadata: Partial<YaraMetadata>) => void;
}

export default function MetaForm({ metadata, onUpdate }: MetaFormProps) {
  const generateUUID = () => {
    return crypto.randomUUID();
  };

  const addHash = () => {
    const newHash = {
      id: crypto.randomUUID(),
      label: `hash${metadata.hashes.length + 1}`,
      value: ""
    };
    onUpdate({
      hashes: [...metadata.hashes, newHash]
    });
  };

  const removeHash = (id: string) => {
    onUpdate({
      hashes: metadata.hashes.filter(hash => hash.id !== id)
    });
  };

  const updateHash = (id: string, value: string) => {
    onUpdate({
      hashes: metadata.hashes.map(hash => 
        hash.id === id ? { ...hash, value } : hash
      )
    });
  };

  return (
    <>
      {/* Rule Name */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Badge className="mr-2 w-4 h-4" />
            Rule Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ruleName">Rule Name</Label>
            <Input
              id="ruleName"
              placeholder="APT_Sample_Rule"
              value={metadata.ruleName}
              onChange={(e) => onUpdate({ ruleName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="id">ID (UUID)</Label>
            <div className="flex">
              <Input
                id="id"
                placeholder="Auto-generated"
                value={metadata.id}
                readOnly
                className="rounded-r-none bg-muted"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onUpdate({ id: generateUUID() })}
                className="rounded-l-none border-l-0"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metadata Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Info className="mr-2 w-4 h-4" />
            Metadata
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detects malicious behavior..."
              rows={3}
              value={metadata.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Security Analyst"
                value={metadata.author || ""}
                onChange={(e) => onUpdate({ author: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={metadata.date || ""}
                onChange={(e) => onUpdate({ date: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                placeholder="85"
                value={metadata.score || ""}
                onChange={(e) => onUpdate({ score: e.target.value ? parseInt(e.target.value) : undefined })}
              />
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                type="url"
                placeholder="https://..."
                value={metadata.reference || ""}
                onChange={(e) => onUpdate({ reference: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hash Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <HashIcon className="mr-2" />
              Hashes
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={addHash}
              className="text-primary hover:text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Hash
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {metadata.hashes.map((hash) => (
            <div key={hash.id} className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground w-12">{hash.label}</span>
              <Input
                placeholder="SHA256 hash..."
                value={hash.value}
                onChange={(e) => updateHash(hash.id, e.target.value)}
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeHash(hash.id)}
                className="text-destructive hover:text-destructive-foreground p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}