import React from 'react';
import DecorativeHeading from '../common/DecorativeHeading';

const AboutSection: React.FC = () => {
  return (
    <section className="mt-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* About Us Heading with Box */}
        <div className="inline-block mb-32">
          <DecorativeHeading text='About' highlightText='Us'  className="text-7xl xl:text-7xl font-medium"/>
        </div>

        {/* Description */}
        <div className=" mx-auto">
          <p className="text-2xl lg:text-3xl xl:text-[3.2rem] text-gray-900 leading-normal font-light">
            Krip is an{' '}
            <span className="text-[#FB5711] font-medium">AI-powered execution engine</span>{' '}
            that helps tech teams, freelancers, and agencies go from project input 
            (brief, SRS, client call, or task dump) to execution 
            (roadmap, task assignment, and code delivery) — automatically.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;