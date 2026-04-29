/* ─── Landing page types ─── */

export interface SocialLink {
  platform: "facebook" | "youtube" | "line" | "instagram" | "tiktok" | "messenger";
  url: string;
  label: string;
}

export interface CTALink {
  text: string;
  url: string;
}

export interface LandingHeroData {
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  highlight: string;
  profileImage: string;
  ctaPrimary: CTALink;
  ctaSecondary: CTALink;
  socials: SocialLink[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
}

export interface LandingAboutData {
  heading: string;
  subtitle: string;
  experience: ExperienceItem[];
  bio: string;
  businesses: string[];
  philosophy: string[];
  quote: string;
}

export interface ServiceCard {
  title: string;
  subtitle: string;
  url: string;
  image?: string;
}

export interface LandingServicesData {
  heading: string;
  subtitle: string;
  cards: ServiceCard[];
}

export interface LandingCTAData {
  heading: string;
  body: string;
  buttons: CTALink[];
}

export interface FooterData {
  brand: string;
  tagline: string;
  copyright: string;
}

export interface LandingPageData {
  hero: LandingHeroData;
  about: LandingAboutData;
  services: LandingServicesData;
  cta: LandingCTAData;
  footer: FooterData;
}

/* ─── Sale page types ─── */

export interface SalePageMeta {
  title: string;
  description: string;
  slug: string;
}

export interface HeroKVData {
  heroImage: string;
  heroAlt?: string;
  badge?: string;
  headline: string;
  description: string;
  instructor?: string;
}

export interface SalePageSectionHeadline {
  heading: string;
  subheading?: string;
}

export interface PainPointsData {
  heading?: string;
  items: string[];
}

export interface SolutionTransitionData {
  text: string;
  highlight: string;
}

export interface InstructorData {
  name: string;
  role: string;
  bio: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Bonus {
  title: string;
  description: string;
  value?: string;
}

export interface PricingTier {
  label: string;
  price: string;
  originalPrice?: string;
  tag?: string;
  highlighted?: boolean;
}

export interface ClosingCTA {
  headline: string;
  highlight?: string;
}

export interface VideoItem {
  videoId: string;
}

export interface PhotoItem {
  img: string;
  span?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface BeforeAfterRow {
  before: string;
  after: string;
}

export interface MiniStoryData {
  lines: string[];
  highlightLine?: string;
  author?: string;
  authorNote?: string;
}

export interface WhoIsThisForData {
  heading?: string;
  yesItems: string[];
  noItems: string[];
  outcomes?: string[];
  canvasImages?: string[];
}

export interface ReframeCloseData {
  heading: string;
  introText?: string;
  introSub?: string;
  afterText?: string;
  bullets: { text: string }[];
  quoteHighlight?: string;
  quoteSub?: string;
  closingLines?: string[];
}

export interface BUCTestimonialClip {
  src: string;
  quote: string;
}

export interface BonusStackItem {
  title: string;
  description: string;
  value?: string;
  icon?: string;
}

export interface SalePageData {
  meta: SalePageMeta;
  hero: HeroKVData;
  sectionHeadline: SalePageSectionHeadline;
  painPoints: PainPointsData;
  solution: SolutionTransitionData;
  instructor: InstructorData;
  features: Feature[];
  featuresHeading?: string;
  bonuses: Bonus[];
  bonusHeading?: string;
  bonusTotalValue?: string;
  pricing: PricingTier[];
  pricingTag?: string;
  closing: ClosingCTA;
  videos: VideoItem[];
  videoHeading?: string;
  photos: PhotoItem[];
  photoHeading?: string;
  seminarImages?: string[];
  kvPosterCards?: string[];
}
