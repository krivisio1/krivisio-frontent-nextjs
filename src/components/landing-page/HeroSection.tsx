import React from 'react';
import DecorativeHeading from '../common/DecorativeHeading';
import Image from 'next/image';
import ellipse from '@/assets/shapes/ellipse.svg';

const HeroSection: React.FC = () => {
  return (
    <section className=" min-h-screen px-8 py-16 pt-24 overflow-x-hidden z-10">

       {/* Dotted Background */}
      <div 
        className="absolute inset-0 -z-1"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(156, 163, 175, 0.4) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          mask: 'radial-gradient(circle at center, black 400px, transparent 800px)',
          WebkitMask: 'radial-gradient(circle at center, black 400px, transparent 800px)'
        }}
      ></div>

      {/* Decorative dashed circle - top right */}
      <div className="absolute -top-0 right-0 z-0">
        <Image src={ellipse} alt='ellipse'/>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-16 items-start pt-16">
          {/* Left Content */}
          <div className="space-y-6 font-body">
            {/* Main Heading */}
            <div className="space-y-9">
              <h1 className="text-7xl xl:text-7xl font-medium text-black font-body ">
                AI THAT PLANS,
              </h1>

              {/* BUILDS with decorative heading */}
              <div className="flex items-center gap-6 text-7xl xl:text-7xl font-medium">
                <DecorativeHeading
                  highlightText="BUILDS" 
                  className="text-7xl xl:text-7xl font-medium text-[#FB5711]"
                />
                <span className="text-black  ">AND SHIPS</span>
              </div>

              {/* YOUR PROJECTS line */}
              <div className="flex items-center gap-6 text-7xl xl:text-7xl font-medium">
                <span className="text-black  ">YOUR</span>
                <DecorativeHeading 
                  highlightText="PROJECTS" 
                  className="text-7xl xl:text-7xl font-medium text-[#FB5711]  "
                />
              </div>

              {/* FASTER */}
              <h1 className="text-7xl xl:text-7xl font-medium text-black  ">
                FASTER
              </h1>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-12 pt-6 max-w-lg ml-auto">
            <div className="grid grid-cols-1 gap-6">
              <p className="text-lg text-gray-800 leading-relaxed font-medium font-dm">
                It eliminates the manual work behind planning, 
                communication, and coordination, making execution 3x 
                faster and 40% cheaper.
              </p>
            

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-start">
              <button className="px-6 py-2 bg-[#FB5711] text-white rounded-md font-medium hover:bg-orange-600 transition-colors font-dm">
                Get Started
              </button>
              <button className="px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-md font-medium hover:bg-gray-50 transition-colors font-dm">
                Get Demo
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;