import type { Metadata } from "next";
import SurveyForm from "@/components/ui/SurveyForm";

export const metadata: Metadata = {
  title: "แบบสอบถาม",
  description: "กรอกแบบสอบถามและขอใบกำกับภาษี",
};

export default function SurveyPage() {
  return (
    <main className="bg-black min-h-screen text-gray-50">
      <SurveyForm />
    </main>
  );
}
