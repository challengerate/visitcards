import { useFormContext, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardFormData } from "@/types/card";

export function ContactSection() {
  const { register, control } = useFormContext<CardFormData>();

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: "emails",
  });

  const {
    fields: mobileFields,
    append: appendMobile,
    remove: removeMobile,
  } = useFieldArray({
    control,
    name: "mobileNumbers",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emailFields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`emails.${index}.title`}>Email Title</Label>
            <Input id={`emails.${index}.title`} {...register(`emails.${index}.title`)} />
            <Label htmlFor={`emails.${index}.email`}>Email</Label>
            <Input id={`emails.${index}.email`} {...register(`emails.${index}.email`)} />
            <Button type="button" onClick={() => removeEmail(index)} variant="destructive">
              Remove Email
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => appendEmail({ title: "", email: "" })} variant="outline">
          Add Email
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mobileFields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`mobileNumbers.${index}.title`}>Mobile Title</Label>
            <Input id={`mobileNumbers.${index}.title`} {...register(`mobileNumbers.${index}.title`)} />
            <Label htmlFor={`mobileNumbers.${index}.mobileNumber`}>Mobile Number</Label>
            <Input id={`mobileNumbers.${index}.mobileNumber`} {...register(`mobileNumbers.${index}.mobileNumber`)} />
            <Button type="button" onClick={() => removeMobile(index)} variant="destructive">
              Remove Mobile
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => appendMobile({ title: "", mobileNumber: "" })} variant="outline">
          Add Mobile
        </Button>
      </div>
    </div>
  );
}
