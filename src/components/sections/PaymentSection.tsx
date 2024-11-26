import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardFormData } from "@/types/card";

export function PaymentSection() {
  const { register } = useFormContext<CardFormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="upiId">UPI ID</Label>
          <Input id="upiId" {...register("paymentInfo.upiLinks.0.upiId")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bank">Bank</Label>
          <Input id="bank" {...register("paymentInfo.bank")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC</Label>
          <Input id="ifsc" {...register("paymentInfo.ifsc")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="beneficiary">Beneficiary</Label>
          <Input id="beneficiary" {...register("paymentInfo.beneficiary")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input id="accountNumber" {...register("paymentInfo.accountNumber")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <Input id="accountType" {...register("paymentInfo.accountType")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="gstNumber">GST Number</Label>
        <Input id="gstNumber" {...register("paymentInfo.gstNumber")} />
      </div>
    </div>
  );
}
