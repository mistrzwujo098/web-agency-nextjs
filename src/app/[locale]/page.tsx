import { Hero } from '@/components/sections/hero'
import { TrustSection } from '@/components/sections/trust-section'
import { EducationSection } from '@/components/sections/education-section'
import { LeadMagnetsSection } from '@/components/sections/lead-magnets-section'
import { ROICalculator } from '@/components/sections/roi-calculator'
import { BeforeAfterComparison } from '@/components/sections/before-after-comparison'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CaseStudy } from '@/components/sections/case-study'
import { MythsVsFacts } from '@/components/sections/myths-vs-facts'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { InteractiveQuiz } from '@/components/sections/interactive-quiz'
import { GuaranteeSection } from '@/components/sections/guarantee-section'
import { TeamSection } from '@/components/sections/team-section'
import { FAQSection } from '@/components/sections/faq-section'
import { ContactForm } from '@/components/sections/contact-form'
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
      <LeadMagnetsSection />
      <ROICalculator />
      <BeforeAfterComparison />
      <ProcessTimeline />
      <TestimonialsSection />
      <MythsVsFacts />
      <CaseStudy />
      <PortfolioSection />
      <GuaranteeSection />
      <InteractiveQuiz />
      <TeamSection />
      <FAQSection />
      <ContactForm />
      <FinalCTASection />
      <ExitIntentPopup />
    </>
  )
}
