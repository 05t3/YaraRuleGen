import { z } from "zod";

export const yaraMetadataSchema = z.object({
  ruleName: z.string().min(1, "Rule name is required"),
  description: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
  score: z.number().min(0).max(100).optional(),
  reference: z.string().url().optional().or(z.literal("")),
  id: z.string().uuid(),
  hashes: z.array(z.object({
    id: z.string(),
    label: z.string(),
    value: z.string()
  })).default([])
});

export const yaraStringSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  modifiers: z.object({
    ascii: z.boolean().default(false),
    wide: z.boolean().default(false),
    fullword: z.boolean().default(false),
    nocase: z.boolean().default(false)
  }).default({})
});

export const yaraRuleSchema = z.object({
  metadata: yaraMetadataSchema,
  strings: z.array(yaraStringSchema).default([]),
  condition: z.string().default("uint16(0) == 0x5a4d and filesize < 1MB and all of them")
});

export const yaraRuleSetSchema = z.object({
  rules: z.array(yaraRuleSchema).default([])
});

export type YaraMetadata = z.infer<typeof yaraMetadataSchema>;
export type YaraString = z.infer<typeof yaraStringSchema>;
export type YaraRule = z.infer<typeof yaraRuleSchema>;
export type YaraRuleSet = z.infer<typeof yaraRuleSetSchema>;

export type InsertUser = {
  username: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
};
