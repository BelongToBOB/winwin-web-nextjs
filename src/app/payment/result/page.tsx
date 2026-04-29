import type { Metadata } from "next";
import PaymentResult from "@/components/ui/PaymentResult";

export const metadata: Metadata = {
  title: "ผลการชำระเงิน",
  description: "ผลการชำระเงินคอร์สออนไลน์",
};

export default function PaymentResultPage() {
  return (
    <main className="bg-black min-h-screen text-gray-50 flex items-center justify-center py-20">
      <PaymentResult />
    </main>
  );
}
