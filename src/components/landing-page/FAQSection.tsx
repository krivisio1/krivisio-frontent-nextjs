"use client"
import React, { useState } from 'react';
import DecorativeHeading from '../common/DecorativeHeading';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number>(0); // First FAQ is open by default
  const [question, setQuestion] = useState<string>('');

  const faqs = [
    {
      question: "What exactly does Krivisio do?",
      answer: "Krivisio is an AI-native execution platform that turns messy project briefs into sprint-ready tasks straight from kickoff and coda workflows over—all in one space."
    },
    {
      question: "How is it different from tools like Jira or Notion?",
      answer: "Unlike traditional project management tools, Krivisio uses AI to automatically break down projects, assign tasks, and generate code, eliminating manual setup and coordination overhead."
    },
    {
      question: "What is Krivisio built for?",
      answer: "Krivisio is built for tech teams, agencies, and freelancers who want to streamline their project execution from brief to delivery with AI-powered automation."
    },
    {
      question: "Can it generate code?",
      answer: "Yes, Krivisio can generate context-aware code based on your project requirements, tech stack, and team specifications, integrated directly into your workflow."
    },
    {
      question: "How does task assignment work?",
      answer: "Our AI automatically assigns tasks based on team member skills, availability, and project requirements, ensuring optimal resource allocation and efficient execution."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle question submission
    console.log('Question submitted:', question);
    setQuestion('');
  };

  return (
    <section className="mt-56 mb-36 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* FAQ Heading */}
        <div className="text-center mb-16">
          <DecorativeHeading 
            text='FAQ' 
            highlightText='s' 
            className="text-7xl xl:text-7xl font-medium font-outfit"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Side - Question Form */}
          <div className="lg:pr-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Got Question?
            </h3>
            
            <form onSubmit={handleSubmit} className="relative group">
              {/* Soft Glow Effect */}
              <div className="absolute -inset-2 ">
                <div className="w-full h-full bg-gradient-to-r from-[#FB5711]/15 to-[#FF7A47]/10 blur-lg rounded-xl" />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Send your question"
                  className="w-full px-4 py-4 pr-16 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FB5711] focus:border-transparent text-gray-700 placeholder-gray-500 text-base"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#FB5711] text-white rounded-lg hover:bg-[#e94e0a] transition-all duration-200 flex items-center justify-center"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" 
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - FAQ List */}
          <div className="lg:pl-8">
            {faqs.map((faq, index) => (
              <div key={index} className="relative">
                <div className="py-5">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                    className="w-full text-left flex items-center justify-between group"
                  >
                    <span className="text-gray-900 font-medium text-lg pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  {openFAQ === index && (
                    <div className="mt-4 pr-8">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Gradient separator line - faded at both ends */}
                {index < faqs.length - 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;