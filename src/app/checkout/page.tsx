import type { Metadata } from "next";
import CheckoutForm from "@/components/ui/CheckoutForm";

export const metadata: Metadata = {
  title: "สมัครเรียน Bank Uncensored Online",
  description: "ชำระเงินและสมัครเรียนคอร์ส Bank Uncensored Online",
};

export default function CheckoutPage() {
  return (
    <main className="bg-black min-h-screen text-gray-50">
      <CheckoutForm courseSlug="bank-uncensored-2026" />
    </main>
  );
}
