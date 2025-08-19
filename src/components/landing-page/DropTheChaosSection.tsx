import React from 'react';
import DecorativeHeading from '../common/DecorativeHeading';


const KrivisioMetrics = () => {
  const cards = [
    {
      id: 1,
      stat: '3X',
      title: 'Tool Consolidation',
      description: 'One AI-native workspace replaces your Jira, Notion, Slack, and docs.',
      isDark: false,
    },
    {
      id: 2,
      stat: '5X',
      title: 'Faster Execution',
      description: 'From ideas to sprint-ready tasks and code — all in minutes.',
      isDark: true,
    },
    {
      id: 3,
      stat: '30%',
      title: 'Lower Project Cost',
      description: 'AI-driven execution reduces waste, delays, and team bloat.',
      isDark: false,
    },
  ];

  return (
    <div className="bg-[#fdfcfb] mt-56 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center  mb-20">
          <DecorativeHeading
            text='#Dropthe'
            highlightText='chaos'
            className="text-6xl md:text-7xl font-medium"
          />
        </div>

        {/* Description */}
        <div className="text-center mb-24">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-medium">
            Messy whiteboards. Dozens of tools. Manual follow-ups. That's not execution — that's chaos.
            <br />
            Krivisio replaces it with AI that plans, assigns, and executes — from day zero.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32 max-w-5xl mx-auto">
          {cards.map(({ id, stat, title, description, isDark }) => (
            <div key={id} className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-r from-[#FB5711] to-[#FF7A47] blur-xl rounded-3xl opacity-40" />
              </div>
              
              {/* Subtle Base Glow */}
              <div className="absolute -inset-1">
                <div className={`w-full h-full rounded-2xl blur-sm ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#FB5711]/20 to-[#FF7A47]/10' 
                    : 'bg-gradient-to-br from-gray-200/30 to-gray-100/20'
                }`} />
              </div>

              {/* Main Card */}
              <div
                className={`
                  relative rounded-2xl p-8 text-center transition-all duration-300 
                  border-2 backdrop-blur-sm h-full border-[#FB5711]/30 shadow-2xl shadow-[#FB5711]/10
                  ${isDark
                    ? 'bg-[#0f1419]  text-white '
                    : 'bg-white/90 text-gray-900'
                  }
                  hover:scale-[1.02] hover:border-[#FB5711]/50
                `}
              >
                {/* Stat Number */}
                <div className={`text-5xl font-bold mb-4 ${
                  isDark ? 'text-[#FB5711]' : 'text-[#FB5711]'
                }`}>
                  {stat}
                </div>

                {/* Title */}
                <h4 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {title}
                </h4>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {description}
                </p>

                {/* Inner glow for dark card */}
                {isDark && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FB5711]/5 via-transparent to-transparent pointer-events-none" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KrivisioMetrics;