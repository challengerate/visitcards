"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaPopup } from "@/components/MediaPopup";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PlusCircle,
  Pencil,
  X,
  Eye,
  User,
  Building,
  Phone,
  ShoppingBag,
  Share2,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";
import { z } from "zod";
import dynamic from "next/dynamic";
import { FloatingDock } from "@/components/ui/floating-dock";
import { cardSchema } from "@/lib/schemas/cardSchema";



const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

type CardFormData = z.infer<typeof cardSchema>;

export default function Component() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<CardFormData | null>(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [currentMediaField, setCurrentMediaField] = useState<string | null>(
    null
  );

  const sectionRefs = {
    personal: useRef<HTMLDivElement>(null),
    company: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    social: useRef<HTMLDivElement>(null),
    payment: useRef<HTMLDivElement>(null),
    additional: useRef<HTMLDivElement>(null),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      bio: "",
      about: "",
      profilePhoto: "",
      companyLogo: "",
      emails: [{ title: "", email: "" }],
      mobileNumbers: [{ title: "", mobileNumber: "" }],
      photoGallery: [],
      customSocialMediaLinks: [],
      videos: [],
      ctaButtons: [],
    },
  });

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

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  const {
    fields: photoGalleryFields,
    append: appendPhoto,
    remove: removePhoto,
  } = useFieldArray({
    control,
    name: "photoGallery",
  });

  const {
    fields: customSocialMediaFields,
    append: appendCustomSocial,
    remove: removeCustomSocial,
  } = useFieldArray({
    control,
    name: "customSocialMediaLinks",
  });

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

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  const profilePhoto = watch("profilePhoto");

  const handleMediaSelect = (mediaItem: any) => {
    if (currentMediaField) {
      setValue(currentMediaField as any, mediaItem.id);
      setIsMediaPopupOpen(false);
      setCurrentMediaField(null);
    }
  };

  const openMediaPopup = (fieldName: string) => {
    setCurrentMediaField(fieldName);
    setIsMediaPopupOpen(true);
  };

  const {
    data: cards,
    isLoading: isLoadingCards,
    error: cardsError,
    refetch: refetchCards,
  } = trpc.digitalBusinessCards.getUserCards.useQuery();

  const { mutate: createCard } = trpc.digitalBusinessCards.create.useMutation({
    onSuccess: (data) => {
      toast.success("Digital business card created successfully");
      refetchCards();
      reset();
      router.push(`/dashboard`);
    },
    onError: (error) => {
      toast.error("Failed to create digital business card");
      console.error(error);
      setIsLoading(false);
    },
  });

  const { mutate: updateCard } = trpc.digitalBusinessCards.update.useMutation({
    onSuccess: (data) => {
      toast.success("Digital business card updated successfully");
      refetchCards();
      setEditingCard(null);
      reset();
      router.push(`/${data.customName}`);
    },
    onError: (error) => {
      toast.error("Failed to update digital business card");
      console.error(error);
      setIsLoading(false);
    },
  });

  const onSubmit = (data: CardFormData) => {
    setIsLoading(true);
    if (editingCard) {
      updateCard({ ...data, id: editingCard.id! });
    } else {
      createCard(data);
    }
  };

  const handleEditCard = (card: CardFormData) => {
    setEditingCard(card);
    Object.keys(card).forEach((key) => {
      if (key === "bio") {
        setValue("bio", card.bio || "");
      } else {
        setValue(key as keyof CardFormData, card[key as keyof CardFormData]);
      }
    });
    setActiveSection("personal");
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    reset();
  };

  const renderMediaField = (fieldName: string, label: string) => {
    const mediaId = watch(fieldName as any);
    return (
      <div className="space-y-2">
        <Label
          htmlFor={fieldName}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </Label>
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            onClick={() => openMediaPopup(fieldName)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {mediaId ? `Change ${label}` : `Upload ${label}`}
          </Button>
          {mediaId && (
            <span className="text-sm text-gray-500">Media selected</span>
          )}
        </div>
      </div>
    );
  };

  const sections = [
    { id: "personal", title: "Personal", icon: <User />, href: "#personal" },
    { id: "company", title: "Company", icon: <Building />, href: "#company" },
    { id: "contact", title: "Contact", icon: <Phone />, href: "#contact" },
    {
      id: "products",
      title: "Products",
      icon: <ShoppingBag />,
      href: "#products",
    },
    { id: "social", title: "Social", icon: <Share2 />, href: "#social" },
    { id: "payment", title: "Payment", icon: <CreditCard />, href: "#payment" },
    {
      id: "additional",
      title: "Additional",
      icon: <MoreHorizontal />,
      href: "#additional",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    sectionRefs[sectionId as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "personal":
        return (
          <div ref={sectionRefs.personal} id="personal" className="space-y-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  className="w-full"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="jobTitle"
                  className="text-sm font-medium text-gray-700"
                >
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  {...register("jobTitle")}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="tagline"
                className="text-sm font-medium text-gray-700"
              >
                Tagline
              </Label>
              <Input id="tagline" {...register("tagline")} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="bio"
                className="text-sm font-medium text-gray-700"
              >
                Bio
              </Label>
              <Controller
                name="bio"
                control={control}
                defaultValue={editingCard?.bio || ""}
                render={({ field }) => (
                  <RichTextEditor
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="about"
                className="text-sm font-medium text-gray-700"
              >
                About
              </Label>
              <Controller
                name="about"
                control={control}
                defaultValue={editingCard?.about || ""}
                render={({ field }) => (
                  <RichTextEditor
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="customName"
                className="text-sm font-medium text-gray-700"
              >
                Custom URL Name
              </Label>
              <Input
                id="customName"
                {...register("customName")}
                className="w-full"
              />
              {errors.customName && (
                <p className="text-red-500 text-sm">
                  {errors.customName.message}
                </p>
              )}
            </div>
            {renderMediaField("profilePhoto", "Profile Photo")}
            {renderMediaField("bannerImage", "Banner Image")}
            {renderMediaField("qrCode", "QR Code")}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="photo-gallery">
                <AccordionTrigger className="text-sm font-medium text-gray-700">
                  Photo Gallery
                </AccordionTrigger>
                <AccordionContent>
                  {photoGalleryFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      {renderMediaField(
                        `photoGallery.${index}.photo`,
                        `Photo ${index + 1}`
                      )}
                      <Button
                        type="button"
                        onClick={() => removePhoto(index)}
                        variant="outline"
                        size="icon"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendPhoto({ photo: "" })}
                    className="mt-2"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case "company":
        return (
          <div ref={sectionRefs.company} id="company" className="space-y-6">
            <h2 className="text-2xl font-bold">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  {...register("companyName")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="websiteURL"
                  className="text-sm font-medium text-gray-700"
                >
                  Website URL
                </Label>
                <Input
                  id="websiteURL"
                  {...register("websiteURL")}
                  className="w-full"
                />
                {errors.websiteURL && (
                  <p className="text-red-500 text-sm">
                    {errors.websiteURL.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="companyAddress"
                className="text-sm font-medium text-gray-700"
              >
                Company Address
              </Label>
              <Textarea
                id="companyAddress"
                {...register("companyAddress")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="googleMapsLink"
                className="text-sm font-medium text-gray-700"
              >
                Google Maps Link
              </Label>
              <Input
                id="googleMapsLink"
                {...register("googleMapsLink")}
                className="w-full"
              />
            </div>
            {renderMediaField("companyLogo", "Company Logo")}
          </div>
        );
      case "contact":
        return (
          <div ref={sectionRefs.contact} id="contact" className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="emails">
                <AccordionTrigger className="text-sm font-medium text-gray-700">
                  Emails
                </AccordionTrigger>
                <AccordionContent>
                  {emailFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Input
                        {...register(`emails.${index}.title`)}
                        placeholder="Title"
                        className="w-1/3"
                      />
                      <Input
                        {...register(`emails.${index}.email`)}
                        placeholder="Email"
                        className="w-2/3"
                      />
                      <Button
                        type="button"
                        onClick={() => removeEmail(index)}
                        variant="outline"
                        size="icon"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendEmail({ title: "", email: "" })}
                    className="mt-2"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Email
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="mobile-numbers">
                <AccordionTrigger className="text-sm font-medium text-gray-700">
                  Mobile Numbers
                </AccordionTrigger>
                <AccordionContent>
                  {mobileFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Input
                        {...register(`mobileNumbers.${index}.title`)}
                        placeholder="Title"
                        className="w-1/3"
                      />
                      <Input
                        {...register(`mobileNumbers.${index}.mobileNumber`)}
                        placeholder="Mobile Number"
                        className="w-2/3"
                      />
                      <Button
                        type="button"
                        onClick={() => removeMobile(index)}
                        variant="outline"
                        size="icon"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      appendMobile({ title: "", mobileNumber: "" })
                    }
                    className="mt-2"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Mobile Number
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="space-y-2">
              <Label
                htmlFor="whatsAppNumber"
                className="text-sm font-medium text-gray-700"
              >
                WhatsApp Number
              </Label>
              <Input
                id="whatsAppNumber"
                {...register("whatsAppNumber")}
                className="w-full"
              />
            </div>
          </div>
        );
      case "products":
        return (
          <div ref={sectionRefs.products} id="products" className="space-y-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="products">
                <AccordionTrigger className="text-sm font-medium text-gray-700">
                  Products
                </AccordionTrigger>
                <AccordionContent>
                  {productFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex flex-col space-y-2 mb-4 p-4 border rounded"
                    >
                      <Input
                        {...register(`products.${index}.name`)}
                        placeholder="Product Name"
                        className="w-full"
                      />
                      <Input
                        {...register(`products.${index}.price`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Price"
                        className="w-full"
                      />
                      <Input
                        {...register(`products.${index}.discountPrice`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Discount Price (optional)"
                        className="w-full"
                      />
                      {renderMediaField(
                        `products.${index}.image`,
                        "Product Image"
                      )}
                      <Button
                        type="button"
                        onClick={() => removeProduct(index)}
                        variant="destructive"
                        className="mt-2"
                      >
                        Remove Product
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendProduct({ name: "", price: 0 })}
                    className="mt-2"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case "social":
        return (
          <div ref={sectionRefs.social} id="social" className="space-y-6">
            <h2 className="text-2xl font-bold">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="linkedin"
                  className="text-sm font-medium text-gray-700"
                >
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  {...register("socialMediaLinks.linkedin")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="twitter"
                  className="text-sm font-medium text-gray-700"
                >
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  {...register("socialMediaLinks.twitter")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="instagram"
                  className="text-sm font-medium text-gray-700"
                >
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  {...register("socialMediaLinks.instagram")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="facebook"
                  className="text-sm font-medium text-gray-700"
                >
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  {...register("socialMediaLinks.facebook")}
                  className="w-full"
                />
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="custom-social-media">
                <AccordionTrigger className="text-sm font-medium text-gray-700">
                  Custom Social Media Links
                </AccordionTrigger>
                <AccordionContent>
                  {customSocialMediaFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Input
                        {...register(`customSocialMediaLinks.${index}.title`)}
                        placeholder="Title"
                        className="w-1/4"
                      />
                      <Input
                        {...register(`customSocialMediaLinks.${index}.url`)}
                        placeholder="URL"
                        className="w-2/4"
                      />
                      {renderMediaField(
                        `customSocialMediaLinks.${index}.icon`,
                        "Icon"
                      )}
                      <Button
                        type="button"
                        onClick={() => removeCustomSocial(index)}
                        variant="outline"
                        size="icon"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      appendCustomSocial({ title: "", url: "", icon: "" })
                    }
                    className="mt-2"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Custom Social Link
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case "payment":
        return (
          <div ref={sectionRefs.payment} id="payment" className="space-y-6">
            <h2 className="text-2xl font-bold">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="upiId"
                  className="text-sm font-medium text-gray-700"
                >
                  UPI ID
                </Label>
                <Input
                  id="upiId"
                  {...register("paymentInfo.upiLinks.0.upiId")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="bank"
                  className="text-sm font-medium text-gray-700"
                >
                  Bank
                </Label>
                <Input
                  id="bank"
                  {...register("paymentInfo.bank")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="ifsc"
                  className="text-sm font-medium text-gray-700"
                >
                  IFSC
                </Label>
                <Input
                  id="ifsc"
                  {...register("paymentInfo.ifsc")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="beneficiary"
                  className="text-sm font-medium text-gray-700"
                >
                  Beneficiary
                </Label>
                <Input
                  id="beneficiary"
                  {...register("paymentInfo.beneficiary")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="accountNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  {...register("paymentInfo.accountNumber")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="accountType"
                  className="text-sm font-medium text-gray-700"
                >
                  Account Type
                </Label>
                <Input
                  id="accountType"
                  {...register("paymentInfo.accountType")}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="gstNumber"
                className="text-sm font-medium text-gray-700"
              >
                GST Number
              </Label>
              <Input
                id="gstNumber"
                {...register("paymentInfo.gstNumber")}
                className="w-full"
              />
            </div>
          </div>
        );
      case "additional":
        return (
          <div
            ref={sectionRefs.additional}
            id="additional"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="googleReviewsLink"
                  className="text-sm font-medium text-gray-700"
                >
                  Google Reviews Link
                </Label>
                <Input
                  id="googleReviewsLink"
                  {...register("googleReviewsLink")}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="newsletterSignup"
                  className="text-sm font-medium text-gray-700"
                >
                  Newsletter Signup
                </Label>
                <Input
                  id="newsletterSignup"
                  {...register("newsletterSignup")}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="brandWebsiteLink"
                className="text-sm font-medium text-gray-700"
              >
                Brand Website Link
              </Label>
              <Input
                id="brandWebsiteLink"
                {...register("brandWebsiteLink")}
                className="w-full"
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="videos">
                <AccordionTrigger className="text-sm font-medium text-gray-700">
                  Videos
                </AccordionTrigger>
                <AccordionContent>
                  {videoFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Input
                        {...register(`videos.${index}.videoUrl`)}
                        placeholder="Video URL"
                        className="w-full"
                      />
                      <Button
                        type="button"
                        onClick={() => removeVideo(index)}
                        variant="outline"
                        size="icon"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendVideo({ videoUrl: "" })}
                    className="mt-2"
                    variant="outline"
                  >
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
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Input
                        {...register(`ctaButtons.${index}.label`)}
                        placeholder="Label"
                        className="w-1/3"
                      />
                      <Input
                        {...register(`ctaButtons.${index}.url`)}
                        placeholder="URL"
                        className="w-1/3"
                      />
                      {renderMediaField(`ctaButtons.${index}.icon`, "Icon")}
                      <Button
                        type="button"
                        onClick={() => removeCtaButton(index)}
                        variant="outline"
                        size="icon"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      appendCtaButton({ label: "", url: "", icon: "" })
                    }
                    className="mt-2"
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add CTA Button
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        {editingCard
          ? "Edit Your Digital Business Card"
          : "Create Your Digital Business Card"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto"
      >
        <div className="mt-8">
          {renderSection("personal")}
          {renderSection("company")}
          {renderSection("contact")}
          {renderSection("products")}
          {renderSection("social")}
          {renderSection("payment")}
          {renderSection("additional")}
        </div>

        <div className="flex gap-4 justify-end mt-8">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading
              ? "Saving..."
              : editingCard
                ? "Update Card"
                : "Create Card"}
          </Button>
          {editingCard && (
            <Button type="button" variant="outline" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mt-16 mb-8 text-gray-900">
        Your Digital Business Cards
      </h2>
      {isLoadingCards ? (
        <p className="text-gray-600">Loading your cards...</p>
      ) : cardsError ? (
        <p className="text-red-500">
          Error loading cards: {cardsError.message}
        </p>
      ) : cards && cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="bg-gray-50 border-b flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={card.profilePhoto} alt={card.fullName} />
                  <AvatarFallback>{getInitials(card.fullName)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-gray-900">
                  {card.fullName}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Job Title:</strong> {card.jobTitle || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Company:</strong> {card.companyName || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Custom URL:</strong> {card.customName}
                </p>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t flex justify-between">
                <Button onClick={() => handleEditCard(card as CardFormData)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/responses?cardId=${card.id}`)
                  }
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Responses
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          You haven&apos;t created any digital business cards yet.
        </p>
      )}
      <MediaPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={handleMediaSelect}
        title={`Select ${
          currentMediaField
            ? currentMediaField.charAt(0).toUpperCase() +
              currentMediaField.slice(1)
            : "Media"
        }`}
      />
      <FloatingDock
  items={sections}
  desktopClassName="hidden md:flex fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
  mobileClassName="md:hidden z-50"
  labelPosition="below"
  onClick={(sectionId) => scrollToSection(sectionId)}
/>
    </div>
  );
}
