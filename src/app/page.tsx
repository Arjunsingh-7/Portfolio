import AnimatedHeroSection from "@/components/portfolio/animated-hero-section"
import AboutSection from "@/components/portfolio/about-section"
import InteractiveSkillsSection from "@/components/portfolio/interactive-skills-section"
import ProjectsShowcase from "@/components/portfolio/projects-showcase"
import EducationTimeline from "@/components/portfolio/education-timeline"
import CodingProfilesStats from "@/components/portfolio/coding-profiles-stats"
import { ComprehensiveContactForm } from "@/components/contact/comprehensive-contact-form"
import { AnimatedIndicatorNavbar } from "@/components/navbars/animated-indicator-navbar"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <AnimatedIndicatorNavbar />
      
      <section id="home">
        <AnimatedHeroSection />
      </section>
      
      <section id="about">
        <AboutSection />
      </section>
      
      <section id="skills">
        <InteractiveSkillsSection />
      </section>
      
      <section id="projects">
        <ProjectsShowcase />
      </section>
      
      <section id="education">
        <EducationTimeline />
      </section>
      
      <section id="coding-profiles">
        <CodingProfilesStats />
      </section>
      
      <section id="contact">
        <ComprehensiveContactForm />
      </section>
    </main>
  )
}