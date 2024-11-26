"use client";

import { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MediaPopup } from "@/components/MediaPopup";
import { FloatingDock } from "@/components/ui/floating-dock";
import { cardSchema } from "@/lib/schemas/cardSchema";
import { CardFormData } from "@/types/card";
import { PersonalSection } from "@/components/sections/PersonalSection";
import { CompanySection } from "@/components/sections/CompanySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { PaymentSection } from "@/components/sections/PaymentSection";
import { AdditionalSection } from "@/components/sections/AdditionalSection";
import { CardList } from "@/components/CardList";
import { User, Building, Phone, ShoppingBag, Share2, CreditCard, MoreHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";

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

  const methods = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      bio: "",
      about: "",
      profilePhoto: "",
      companyLogo: "",
      emails: [{ title: "", email: "" }],
      mobileNumbers: [{ title: "", mobileNumber: "" }],
      photoGallery: [{ photo: "" }],
      customSocialMediaLinks: [{ title: "", url: "", icon: "" }],
      videos: [{ videoUrl: "" }],
      ctaButtons: [{ label: "", url: "", icon: "" }],
      companyAddress: "",
      googleMapsLink: "",
      websiteURL: "",
      whatsAppNumber: "",
      customContactOptions: [{ linkName: "", url: "", icon: "" }],
      socialMediaLinks: {
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
      },
      paymentInfo: {
        upiLinks: [{ upiId: "" }],
        bank: "",
        ifsc: "",
        beneficiary: "",
        accountNumber: "",
        accountType: "",
        gstNumber: "",
      },
      googleReviewsLink: "",
      newsletterSignup: "",
      brandWebsiteLink: "",
      bannerImage: "",
      qrCode: "",
      products: [{ name: "", price: 0, discountPrice: 0, image: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
  } = methods;

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

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        {editingCard
          ? "Edit Your Digital Business Card"
          : "Create Your Digital Business Card"}
      </h1>
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto">
          <div className="mt-8">
            <div ref={sectionRefs.personal} id="personal">
              <PersonalSection renderMediaField={renderMediaField} />
            </div>
            <div ref={sectionRefs.company} id="company">
              <CompanySection renderMediaField={renderMediaField} />
            </div>
            <div ref={sectionRefs.contact} id="contact">
              <ContactSection />
            </div>
            <div ref={sectionRefs.products} id="products">
              <ProductsSection renderMediaField={renderMediaField} />
            </div>
            <div ref={sectionRefs.social} id="social">
              <SocialSection renderMediaField={renderMediaField} />
            </div>
            <div ref={sectionRefs.payment} id="payment">
              <PaymentSection />
            </div>
            <div ref={sectionRefs.additional} id="additional">
              <AdditionalSection renderMediaField={renderMediaField} />
            </div>
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
      </FormProvider>

      <h2 className="text-2xl font-bold mt-16 mb-8 text-gray-900">
        Your Digital Business Cards
      </h2>
      
      {isLoadingCards ? (
        <p className="text-gray-600">Loading your cards...</p>
      ) : cardsError ? (
        <p className="text-red-500">Error loading cards: {cardsError.message}</p>
      ) : cards && cards.length > 0 ? (
        <CardList 
          cards={cards} 
          onEdit={handleEditCard}
          onViewResponses={(cardId) => router.push(`/dashboard/responses?cardId=${cardId}`)}
        />
      ) : (
        <p className="text-gray-600">You haven&apos;t created any digital business cards yet.</p>
      )}

      <MediaPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={handleMediaSelect}
        title={`Select ${currentMediaField ? currentMediaField.charAt(0).toUpperCase() + currentMediaField.slice(1) : "Media"}`}
      />

      <FloatingDock
        items={sections}
        desktopClassName="hidden md:flex fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        mobileClassName="md:hidden z-50"
        labelPosition="below"
        //@ts-ignore
        onClick={(sectionId) => scrollToSection(sectionId)}
      />
    </div>
  );
}
