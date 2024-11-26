import { useFormContext, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, X } from "lucide-react";
import { CardFormData, RenderMediaFieldType } from "@/types/card";

interface AdditionalSectionProps {
  renderMediaField: RenderMediaFieldType;
}

export function AdditionalSection({ renderMediaField }: AdditionalSectionProps) {
  const { register, control } = useFormContext<CardFormData>();

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control,
    name: "videos",
  });

  const {
    fields: ctaButtonFields,
    append: appendCtaButton,
    remove: removeCtaButton,
  } = useFieldArray({
    control,
    name: "ctaButtons",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Additional Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="googleReviewsLink">Google Reviews Link</Label>
          <Input id="googleReviewsLink" {...register("googleReviewsLink")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newsletterSignup">Newsletter Signup</Label>
          <Input id="newsletterSignup" {...register("newsletterSignup")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="brandWebsiteLink">Brand Website Link</Label>
        <Input id="brandWebsiteLink" {...register("brandWebsiteLink")} />
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="videos">
          <AccordionTrigger className="text-sm font-medium text-gray-700">
            Videos
          </AccordionTrigger>
          <AccordionContent>
            {videoFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Input {...register(`videos.${index}.videoUrl`)} placeholder="Video URL" className="w-full" />
                <Button type="button" onClick={() => removeVideo(index)} variant="outline" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendVideo({ videoUrl: "" })} className="mt-2" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="cta-buttons">
          <AccordionTrigger className="text-sm font-medium text-gray-700">
            CTA Buttons
          </AccordionTrigger>
          <AccordionContent>
            {ctaButtonFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Input {...register(`ctaButtons.${index}.label`)} placeholder="Label" className="w-1/3" />
                <Input {...register(`ctaButtons.${index}.url`)} placeholder="URL" className="w-1/3" />
                {renderMediaField(`ctaButtons.${index}.icon`, "Icon")}
                <Button type="button" onClick={() => removeCtaButton(index)} variant="outline" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendCtaButton({ label: "", url: "", icon: "" })} className="mt-2" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add CTA Button
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
