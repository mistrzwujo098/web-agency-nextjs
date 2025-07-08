import { Hero } from '@/components/sections/hero'
import { TrustSection } from '@/components/sections/trust-section'
import { EducationSection } from '@/components/sections/education-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { GuaranteeSection } from '@/components/sections/guarantee-section'
import { TeamSection } from '@/components/sections/team-section'
import { FAQSection } from '@/components/sections/faq-section'
import { FinalCTASection } from '@/components/sections/final-cta-section'
import { ExitIntentPopup } from '@/components/exit-intent-popup'
import { generateMetadata } from './metadata'

export { generateMetadata }

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <EducationSection />
      <TestimonialsSection />
      <PricingSection />
      <PortfolioSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <TeamSection />
      <FAQSection />
      <TestimonialsSection />
      <FinalCTASection />
      <ExitIntentPopup />
    </>
  )
}
