import { useFormContext, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, X } from "lucide-react";
import { CardFormData, RenderMediaFieldType } from "@/types/card";

interface SocialSectionProps {
  renderMediaField: RenderMediaFieldType;
}

export function SocialSection({ renderMediaField }: SocialSectionProps) {
  const { register, control } = useFormContext<CardFormData>();

  const {
    fields: customSocialMediaFields,
    append: appendCustomSocial,
    remove: removeCustomSocial,
  } = useFieldArray({
    control,
    name: "customSocialMediaLinks",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Social Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" {...register("socialMediaLinks.linkedin")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter</Label>
          <Input id="twitter" {...register("socialMediaLinks.twitter")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" {...register("socialMediaLinks.instagram")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input id="facebook" {...register("socialMediaLinks.facebook")} />
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="custom-social-media">
          <AccordionTrigger className="text-sm font-medium text-gray-700">
            Custom Social Media Links
          </AccordionTrigger>
          <AccordionContent>
            {customSocialMediaFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Input {...register(`customSocialMediaLinks.${index}.title`)} placeholder="Title" className="w-1/4" />
                <Input {...register(`customSocialMediaLinks.${index}.url`)} placeholder="URL" className="w-2/4" />
                {renderMediaField(`customSocialMediaLinks.${index}.icon`, "Icon")}
                <Button type="button" onClick={() => removeCustomSocial(index)} variant="outline" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendCustomSocial({ title: "", url: "", icon: "" })} className="mt-2" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Custom Social Link
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
