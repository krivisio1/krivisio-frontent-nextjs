import React from 'react';
import DecorativeHeading from '../common/DecorativeHeading';
import { Check, X } from 'lucide-react';

const KrivisioComparison = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-44">
      <div className="max-w-7xl mx-auto">
         {/* Heading */}
        <div className="text-center mb-32">
          <DecorativeHeading
            text='KRIVISIO' 
            highlightText='Vs Others' 
            className="text-7xl xl:text-7xl font-medium font-outfit"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Traditional Problems */}
          <div className="bg-white border rounded-3xl p-8">
            {/* Header */}
            <div className="text-center mb-8">

               <div className="inline-block bg-white border border-gray-200 text-gray-600 mb-6 px-6 py-2 rounded-full text-lg font-medium ">
                The Old School Stack For Teams
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Still Building Projects Like It's 2015?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed text-left">
                Traditional tools trap teams in a loop - planning on Notion, assigning in Jira, 
                coordinating on Slack, and still losing clarity. You're operating at 10% effort for 1x 
                output.
              </p>
            </div>

            {/* Problems List */}
            <div className="space-y-6">
              {/* Problem 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 text-lg"><X className='w-5 h-5'/></span>
                  <h4 className="font-semibold text-red-500">Scattered Planning</h4>
                </div>
                <p className="text-gray-700 text-sm ml-6">
                  Teams brainstorm in docs, whiteboards, or ChatGPT — then 
                  manually transfer that to tools like Jira or Trello.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 text-lg"><X className='w-5 h-5'/></span>
                  <h4 className="font-semibold text-red-500">Manual Task Breakdown</h4>
                </div>
                <p className="text-gray-700 text-sm ml-6">
                  Project managers spend hours converting briefs into tasks, owners, 
                  and timelines.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 text-lg"><X className='w-5 h-5'/></span>
                  <h4 className="font-semibold text-red-500">No Context For AI</h4>
                </div>
                <p className="text-gray-700 text-sm ml-6">
                  Generic AI tools don't remember what was planned, why it was 
                  planned, or how it connects across the stack. You start from scratch 
                  every time.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-4 bg-red-50 border border-red-300 rounded-md ">
                <p className="text-gray-700 text-sm font-semibold">
                  "We'd plan in Notion, assign in Jira, chat on Slack, then lose context 
                  while using claude and cursor — and still wonder why nothing was 
                  moving."
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  — Frustrated Product Manager, Early-Stage SaaS
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - KRIVISIO Solution */}
          <div className="bg-[#111620] text-white rounded-3xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-[#FB5711] text-white px-6 py-2 rounded-full text-lg font-medium mb-6">
                KRIVISIO
              </div>
              <h2 className="text-3xl font-bold mb-6">
                100x Execution Transformation
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed text-left">
                Krivisio is an AI-first execution engine - turning messy project inputs into structured 
                action. From planning to ownership to code scaffolds — it's all automatic.
              </p>
            </div>

            {/* Solutions List */}
            <div className="space-y-6">
              {/* Solution 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 text-lg"><Check className='w-5 h-5' /></span>
                  <h4 className="font-semibold text-green-400">One-Click Brief To Sprint</h4>
                </div>
                <p className="text-gray-300 text-sm ml-6">
                  Drop a project brief and get sprint-ready tasks, assignments, and 
                  timelines — instantly.
                </p>
              </div>

              {/* Solution 2 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 text-lg"><Check className='w-5 h-5' /></span>
                  <h4 className="font-semibold text-green-400">AI-Powered Task Ownership</h4>
                </div>
                <p className="text-gray-300 text-sm ml-6">
                  Tasks are auto-assigned based on skill, load, and role — no 
                  spreadsheets, no back-and-forth.
                </p>
              </div>

              {/* Solution 3 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 text-lg"><Check className='w-5 h-5' /></span>
                  <h4 className="font-semibold text-green-400">Context-Aware LLMs</h4>
                </div>
                <p className="text-gray-300 text-sm ml-6">
                  Krivisio remembers your project's history, goals, and team structure 
                  to provide smarter, more relevant tasking and planning with every 
                  new input.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-4 bg-green-900/30 rounded-md border border-green-300">
                <p className="text-gray-300 text-sm font-semibold">
                  "We dropped a rough brief, and Krivisio turned it into sprint tasks with 
                  owners automatically signed in 5 minutes. We've never shipped 
                  faster."
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  — Founding Engineer, Series A Startup
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrivisioComparison;