
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardFormData, RenderMediaFieldType } from "@/types/card";

interface CompanySectionProps {
  renderMediaField: RenderMediaFieldType;
}

export function CompanySection({ renderMediaField }: CompanySectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CardFormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Company Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" {...register("companyName")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="websiteURL">Website URL</Label>
          <Input id="websiteURL" {...register("websiteURL")} />
          {errors.websiteURL && (
            <p className="text-red-500 text-sm">{errors.websiteURL.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyAddress">Company Address</Label>
        <Textarea id="companyAddress" {...register("companyAddress")} />
      </div>
      {renderMediaField("companyLogo", "Company Logo")}
    </div>
  );
}