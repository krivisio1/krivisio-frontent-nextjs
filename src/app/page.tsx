import React from "react";

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/landing-page/HeroSection";
import AboutSection from "@/components/landing-page/AboutSection";
import ServicesSection from "@/components/landing-page/ServicesSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import KrivisioVsOthersSection from "@/components/landing-page/KrivisioVsOthersSection";
import DropTheChaosSection from "@/components/landing-page/DropTheChaosSection";
import FAQSection from "@/components/landing-page/FAQSection";
import Footer from "@/components/landing-page/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection/>
      <HowItWorksSection/>
      <KrivisioVsOthersSection/>
      <DropTheChaosSection/>
      <FAQSection/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
