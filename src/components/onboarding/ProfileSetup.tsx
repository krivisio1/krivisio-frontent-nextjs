'use client';

import { useState } from 'react';

export default function ProfileSetup() {
  const [position, setPosition] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const handleContinue = () => {
    if (position.trim() && skills.length > 0) {
      // TODO: Save profile data and continue to dashboard
      console.log('Profile setup complete', { position, skills });
    }
  };

  return (
    <>
      {/* Position Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Frontend, backend, DevOps etc..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Skills Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
        
        {/* Skills Tags */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter the skills"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
          />
          
          {/* Skill suggestions */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                setSkillInput('React');
                setTimeout(() => addSkill(), 100);
              }}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              React
            </button>
            <button
              onClick={() => {
                setSkillInput('Node.js');
                setTimeout(() => addSkill(), 100);
              }}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              Node.js
            </button>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Continue
      </button>
    </>
  );
}
