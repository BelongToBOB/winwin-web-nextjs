import type { Metadata } from "next";
import HeroKV from "@/components/sections/HeroKV";
import PainPoints from "@/components/sections/PainPoints";
import SolutionTransition from "@/components/sections/SolutionTransition";
import InstructorProfile from "@/components/sections/InstructorProfile";
import FeaturesAndBonuses from "@/components/sections/FeaturesAndBonuses";
import KVPosterCards from "@/components/sections/KVPosterCards";
import PhotoTestimonials from "@/components/sections/PhotoTestimonials";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import SeminarGallery from "@/components/sections/SeminarGallery";
import ContactCTA from "@/components/sections/ContactCTA";
import { insideBankData as d } from "@/data/inside-bank";

export const metadata: Metadata = {
  title: "Inside Bank — เข้าใจโครงสร้างเงินธุรกิจในมุมมองแบงก์จริง",
  description: d.meta.description,
};

export default function InsideBankPage() {
  return (
    <main>
      <HeroKV
        heroImage={d.hero.heroImage}
        heroAlt={d.hero.heroAlt}
        headline={d.hero.headline}
        description={d.hero.description}
        instructor={d.hero.instructor}
      />

      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: d.sectionHeadline.heading }} />
            {d.sectionHeadline.subheading && (
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: d.sectionHeadline.subheading }} />
            )}
          </div>

          <div className="max-w-4xl mx-auto flex flex-col space-y-8">
            <PainPoints heading={d.painPoints.heading} items={d.painPoints.items} />
            <SolutionTransition text={d.solution.text} highlight={d.solution.highlight} />
            <InstructorProfile name={d.instructor.name} role={d.instructor.role} bio={d.instructor.bio} />
          </div>

          <FeaturesAndBonuses
            features={d.features}
            bonuses={d.bonuses}
            pricing={d.pricing}
            pricingTag={d.pricingTag}
          />

          <div className="mt-16 md:mt-20 text-center max-w-4xl mx-auto px-4">
            <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: d.closing.headline }} />
            {d.closing.highlight && (
              <p className="text-xl md:text-2xl text-yellow-400 font-medium pb-4 leading-relaxed">{d.closing.highlight}</p>
            )}
          </div>

          {d.kvPosterCards && <KVPosterCards images={d.kvPosterCards} />}
        </div>
      </section>

      <PhotoTestimonials photos={d.photos} />
      <VideoTestimonials videos={d.videos} />
      {d.seminarImages && <SeminarGallery images={d.seminarImages} />}
      <ContactCTA />
    </main>
  );
}
