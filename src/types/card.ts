import { z } from "zod";
import { cardSchema } from "@/lib/schemas/cardSchema";

export type CardFormData = z.infer<typeof cardSchema> & {
  customContactOptions: Array<{
    linkName: string;
    url: string;
    icon?: string;
  }>;
};
export type RenderMediaFieldType = (fieldName: string, label: string) => JSX.Element;