"use client";
import React, { useState } from "react";
import DecorativeHeading from "../common/DecorativeHeading";

// Expanded data to include descriptions for the content area
const stepsData = [
  {
    id: "01",
    title: "User Signup & Role Assignment",
    description:
      "Team members sign up and are assigned roles like Project Manager, Developer, or Stakeholder. This defines their permissions and tailors their experience within the Krip platform.",
  },
  {
    id: "02",
    title: "Project Creation & Spec Generation",
    description:
      "A Project Manager initiates a new project by providing a high-level brief. Our AI analyzes the brief, asks clarifying questions, and generates a detailed technical specification document.",
  },
  {
    id: "03",
    title: "Developer Task Intake & ML Agent Trigger",
    description:
      "The generated spec is automatically broken down into sprint-ready tasks. When a developer picks up a task, it triggers an ML agent that scaffolds boilerplate code and sets up the development environment.",
  },
  {
    id: "04",
    title: "Compliance + Status Sync",
    description:
      "As work is completed, our system continuously checks for compliance with the project specs and coding standards. Task statuses are synced across the board, providing real-time visibility.",
  },
  {
    id: "05",
    title: "Meetings & MOM Generation (Phase 3)",
    description:
      "Krip can join virtual meetings, transcribe discussions, and automatically generate Minutes of Meeting (MOM). Action items are identified and converted into tasks for seamless follow-up.",
  },
];

const HowItWorksSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState("01");

  const activeStep = stepsData.find((step) => step.id === activeStepId);

  return (
    <section className="py-24 px-6 bg-[#111620]">
      <div className="max-w-7xl mx-auto">
        {/* How It Works Heading */}
        <div className="text-center mb-12">
          <DecorativeHeading
            text="How It"
            highlightText="Works"
            color="white"
            className="text-6xl md:text-7xl font-medium text-white"
          />
        </div>

        {/* Description */}
        <div className="text-center mb-20">
          <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
            Krip streamlines your entire development workflow through an
            intelligent, automated process that takes you from concept to
            completion seamlessly.
          </p>
        </div>

        {/* Steps Grid*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          {stepsData.map((step) => (
            <div
              className="bg-white rounded-lg"
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
            >
              <div
                className={`flex flex-col justify-between p-6 rounded-lg cursor-pointer transition-all duration-300 min-h-[170px] ${
                  activeStepId === step.id
                    ? "bg-gradient-to-br from-[#F9A629B2] to-[#F9A629B2]/30 text-black shadow-lg"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <div className="text-4xl font-bold">{step.id}</div>
                <div className="text-base font-medium leading-tight">
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Large Content Area - Now dynamic */}
        <div className="bg-white rounded-2xl p-10 min-h-[500px] flex flex-col justify-center border-8 border-[#41454d]">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            {activeStep?.title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            {activeStep?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
