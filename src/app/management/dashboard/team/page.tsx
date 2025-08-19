// app/(dashboard)/team-details/page.tsx
"use client";
import { useState } from "react";
import { ListFilter, ChevronDown, Phone, Mail, Star } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  team: string;
  availability: "Available" | "Not Available" | "Partly Available";
  project: string;
  skills: string[];
  avatar: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Vikash Singh",
    role: "Full Stack Developer",
    team: "Backend Team",
    availability: "Available",
    project: "E-commerce Platform",
    skills: ["Node.js", "Express.js", "MongoDB", "Redis", "AWS", "Docker"],
    avatar: "VS",
  },
  {
    name: "Kavya Nair",
    role: "Frontend Developer",
    team: "UI/UX Team",
    availability: "Not Available",
    project: "E-commerce Platform",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "SCSS"],
    avatar: "KN",
  },
  {
    name: "Ankit Gupta",
    role: "DevOps Engineer",
    team: "Infrastructure Team",
    availability: "Partly Available",
    project: "E-commerce Platform",
    skills: ["Kubernetes", "Jenkins", "Terraform", "AWS", "Docker", "Monitoring"],
    avatar: "AG",
  },
  {
    name: "Meera Joshi",
    role: "QA Engineer",
    team: "Quality Assurance",
    availability: "Available",
    project: "E-commerce Platform",
    skills: ["Selenium", "Jest", "Cypress", "API Testing", "Python", "Postman"],
    avatar: "MJ",
  },
]


const getAvailabilityStatus = (status: string) => {
  switch (status) {
    case "Available":
      return "text-green-600"; // Only text color
    case "Not Available":
      return "text-red-600"; // Only text color
    case "Partly Available":
      return "text-yellow-600"; // Only text color
    default:
      return "text-gray-600"; // Only text color
  }
};

export default function TeamDetailsPage() {
  const [members, setMembers] = useState(teamMembers);
  /* update a single member’s availability */
  const handleAvailabilityChange = (
    idx: number,
    newStatus: "Available" | "Partly Available" | "Not Available"
  ) => {
    const updated = [...members];
    updated[idx].availability = newStatus;
    setMembers(updated);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="flex justify-between items-start w-full px-8 pt-10 pb-4 mb-20">
        <div>
          <div className="text-[42px] text-[#FB5711] font-bold mt-1">
            Workspace
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-[#FB5711] hover:bg-orange-400 text-white px-6 py-2 rounded font-semibold shadow mt-1 transition flex items-center gap-2">
            Invite
          </button>
          <button className="border-[#FB5711] border hover:bg-orange-400 text-[#FB5711] px-6 py-2 rounded font-semibold shadow mt-1 transition flex items-center gap-2">
            Edit
          </button>
        </div>
      </header>

      {/* Team Stats Header */}
      <div className="px-8 pb-6 mx-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-normal text-gray-900">4 Members</h2>
          <button className="bg-gray-100 hover:bg-gray-200 text-black text-lg px-4 py-2 rounded-lg font-medium transition flex items-center gap-2">
            <ListFilter size={24} className="text-black" />
            Filter
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Table Header */}
        <div className="bg-white rounded-t-lg border-b-[0.5px] border-gray-200">
          <div className="grid grid-cols-6 gap-4 p-4 font-normal text-gray-600 text-lg">
            <div>Name</div>
            <div>Position</div>
            <div>Team</div>
            <div>Availability</div>
            <div>Current Project</div>
            <div>Skills</div>
          </div>
        </div>

        {/* Team Members List */}
        <div className="bg-white rounded-b-lg ">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 p-4 border-b-[0.5px] border-gray-200 hover:bg-gray-50 transition-colors items-center"
            >
              {/* Name Column */}
              <div className="flex items-center gap-3">
                <span className="font-normal text-lg text-gray-900">
                  {member.name}
                </span>
              </div>

              {/* Position Column */}
              <div>
                <span className="font-normal text-lg text-gray-900">
                  {member.role}
                </span>
              </div>

              {/* Team Column */}
              <div>
                <span className="font-normal text-lg text-gray-900">
                  {member.team}
                </span>
              </div>

              {/* Availability Column */}
              <div>
                <select
                  value={member.availability}
                  onChange={(e) =>
                    handleAvailabilityChange(
                      index,
                      e.target.value as
                        | "Available"
                        | "Partly Available"
                        | "Not Available"
                    )
                  }
                  className={`pr-7 pl-3 py-1 rounded-md text-lg font-normal bg-transparent focus:outline-none cursor-pointer ${
                    // colour text only
                    member.availability === "Available"
                      ? "text-green-600"
                      : member.availability === "Partly Available"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  <option className="text-green-600" value="Available">
                    Available
                  </option>
                  <option className="text-yellow-600" value="Partly Available">
                    Partly Available
                  </option>
                  <option className="text-red-600" value="Not Available">
                    Not Available
                  </option>
                </select>
                {/* small chevron icon */}
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>

              {/* Current Project Column */}
              <div>
                <span className="font-normal text-lg text-gray-900">
                  {member.project}
                </span>
              </div>

              {/* Skills Column */}
              <div>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1  text-gray-700 text-[16px] rounded "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
