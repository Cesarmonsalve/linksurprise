'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for code-splitting (performance)
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false });
const Templates = dynamic(() => import('@/components/Templates'), { ssr: false });
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), { ssr: false });
const Pricing = dynamic(() => import('@/components/Pricing'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const CtaFinal = dynamic(() => import('@/components/CtaFinal'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={handlePreloaderComplete} />

      <main
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Hero />
        <Marquee />
        <Templates />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CtaFinal />
        <Footer />
      </main>
    </>
  );
}
