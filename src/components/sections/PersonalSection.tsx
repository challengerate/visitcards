import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardFormData, RenderMediaFieldType } from "@/types/card";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

interface PersonalSectionProps {
  renderMediaField: RenderMediaFieldType;
}

export function PersonalSection({ renderMediaField }: PersonalSectionProps) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<CardFormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" {...register("jobTitle")} />
        </div>
      </div>
      {/* Add other personal fields */}
      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input id="tagline" {...register("tagline")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <RichTextEditor onChange={field.onChange} value={field.value} />
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="customName">Custom URL Name</Label>
        <Input id="customName" {...register("customName")} />
        {errors.customName && (
          <p className="text-red-500 text-sm">{errors.customName.message}</p>
        )}
      </div>
      {renderMediaField("profilePhoto", "Profile Photo")}
      {renderMediaField("bannerImage", "Banner Image")}
      {renderMediaField("qrCode", "QR Code")}
    </div>
  );
}