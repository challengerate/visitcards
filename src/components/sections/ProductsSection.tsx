import { useFormContext, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, X } from "lucide-react";
import { CardFormData, RenderMediaFieldType } from "@/types/card";

interface ProductsSectionProps {
  renderMediaField: RenderMediaFieldType;
}

export function ProductsSection({ renderMediaField }: ProductsSectionProps) {
  const { register, control } = useFormContext<CardFormData>();

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Products</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="products">
          <AccordionTrigger className="text-sm font-medium text-gray-700">
            Products
          </AccordionTrigger>
          <AccordionContent>
            {productFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4 p-4 border rounded">
                <Input {...register(`products.${index}.name`)} placeholder="Product Name" className="w-full" />
                <Input {...register(`products.${index}.price`, { valueAsNumber: true })} type="number" placeholder="Price" className="w-full" />
                <Input {...register(`products.${index}.discountPrice`, { valueAsNumber: true })} type="number" placeholder="Discount Price (optional)" className="w-full" />
                {renderMediaField(`products.${index}.image`, "Product Image")}
                <Button type="button" onClick={() => removeProduct(index)} variant="destructive" className="mt-2">
                  Remove Product
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendProduct({ name: "", price: 0 })} className="mt-2" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
