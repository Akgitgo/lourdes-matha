import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhatWeProvide from '@/components/WhatWeProvide'
import Services from '@/components/Services'
import WhyChooseUs from '@/components/WhyChooseUs'
import TreatmentJourney from '@/components/TreatmentJourney'
import About from '@/components/About'
import Mission from '@/components/Mission'
import Gallery from '@/components/Gallery'
import ContactForm from '@/components/ContactForm'
import Testimonials from '@/components/Testimonials'
import ScrollHashUpdater from '@/components/ScrollHashUpdater'


export default function Home() {
  return (
    <>
      <ScrollHashUpdater />
      <Header />
      <Hero />
      <WhatWeProvide />
      <Services />
      <WhyChooseUs />
      <TreatmentJourney />
      <About />
      <Mission />
      <Gallery />
      <Testimonials />
      <ContactForm />

    </>
  )
}
