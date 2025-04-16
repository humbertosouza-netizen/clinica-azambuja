"use client"

import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { AboutSection } from '@/components/home/AboutSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { BeforeAfterSection } from '@/components/home/BeforeAfterSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ContactSection } from '@/components/home/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
