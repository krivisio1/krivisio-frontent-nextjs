import React from 'react';
import DecorativeHeading from '../common/DecorativeHeading';

const services = [
  { id: '01', title: 'Project Analysis', isActive: true },
  { id: '01', title: 'Project Analysis', isActive: false },
  { id: '01', title: 'Project Analysis', isActive: false },
  { id: '01', title: 'Project Analysis', isActive: false },
  { id: '01', title: 'Project Analysis', isActive: false },
  { id: '01', title: 'Project Analysis', isActive: false },
];

const ServicesSection = () => {
  return (
    <section className="mt-56 mb-44 px-10 bg-[#fcfbf9]">
      {/* Services Heading */}
      <div className="text-center mb-32">
        <DecorativeHeading 
          text='Our' 
          highlightText='Services' 
          className="text-7xl xl:text-7xl font-medium"
        />
      </div>

      <div className="max-w-7xl mx-auto flex gap-16">
        {/* Left */}
        <div className="flex flex-col justify-center">
          {/* Subheading */}
          <div className="mb-32 text-left">
            <h2 className="text-2xl leading-snug text-gray-900">
              Lorem ipsum dolor sit amet<br />
              consectetur adipiscing elit.
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-rows-3 grid-cols-2 place-items-center gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`w-full p-6 px-8 rounded-lg text-center transition-all duration-300 cursor-pointer 
                  ${idx === 0
                    ? 'bg-gradient-to-b from-[#F9A629B2] to-[#F9A629B2]/30 text-black font-medium border-none'
                    : 'bg-white text-gray-500 font-medium border border-gray-200'
                  }
                `}
              >
                <div className={`text-2xl mb-1 ${idx !== 0 ? 'text-gray-400 font-bold' : ''}`}>
                  {service.id}
                </div>
                <div className="text-sm">{service.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - content panel */}
        <div className="flex-1 ">
          <div className="bg-[#F9A62933] rounded-2xl p-6 h-full w-full flex flex-col">
            <div className="flex-1 bg-white rounded-2xl mb-10 min-h-[220px] flex items-center justify-center ">
              {/* Optional Image or Animation */}
            </div>
            <div className="text-gray-800 leading-relaxed text-base mb-4">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
              quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
              Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
