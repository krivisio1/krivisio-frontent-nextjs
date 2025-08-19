"use client";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import type React from "react";
import { useRouter } from "next/navigation";
import { MarkdownRenderer } from "./helpers/markdown-renderer";
import { useEffect, useState } from "react";
import { useChatbot } from "@/app/providers/chatBotProvider/chatbot.context";

const markdownContent = `# Video Call App Project Specification Document

---

## 1. Executive Summary
This document outlines the project specification for a video call application with an intermediate complexity level. The project aims to develop a robust video communication tool featuring a login system and one-to-one video calling capabilities. The application is designed to provide secure, seamless, and reliable video communication for users.

---

## 2. Project Overview

### Purpose
The primary purpose of this project is to create a user-friendly and efficient video call application that facilitates high-quality one-to-one video communication.

### Background
With the increasing demand for remote communication tools, this project seeks to address the need for a simple yet effective video call solution that integrates seamlessly into users' digital lives.

### Goals
- Develop a secure login system for user authentication.
- Implement stable one-to-one video call functionality.
- Ensure high performance and scalability to accommodate user growth.

---

## 3. Functional Requirements

### Login System
- User Registration: Users must be able to create accounts with email verification.
- Authentication: Secure login system utilizing encryption protocols.
- Password Recovery: Feature to reset passwords via email.

### One-to-One Video Call
- Initiate and accept calls between two users.
- High-definition video and audio quality.
- Mute/Unmute microphone and toggle video on/off during calls.

---

## 4. Non-Functional Requirements

### Performance
- Low latency during video calls.
- Quick authentication process under heavy load.

### Scalability
- Support up to 10,000 concurrent users initially with plans for expansion.

### Reliability
- 99.9% uptime with robust error handling mechanisms in place.

---

## 5. Technical Architecture

### System Diagrams
(To be provided in the final version)

### Services
- Authentication Service
- Video Streaming Service

### Technology Stack
- **Programming Language**: Python

---

## 6. Development Estimation

Based on COCOMO-II estimation:
- Estimated Equivalent SLOC (with reuse): 6262.5

(Note: Further breakdown of estimated effort, development time, and team size are pending detailed analysis.)

---

## 7. Risk Assessment

### Project Risks
1. **Technical Challenges**: Potential issues with real-time data transmission.
   - **Mitigation**: Utilize proven libraries and conduct thorough testing.

2. **Security Breaches**: Risks associated with unauthorized access.
   - **Mitigation**: Implement multi-factor authentication and regular security audits.

3. **Scalability Issues**: Difficulty in scaling infrastructure as user base grows.
   - **Mitigation**: Design architecture with scalability in mind from the outset.

---

## 8. Deliverables & Milestones

### Timelines & Phases
1. **Phase 1**: Requirements Gathering & Design (Month 1)
2. **Phase 2**: Development of Core Features (Months 2-4)
3. **Phase 3**: Testing & Quality Assurance (Month 5)
4. **Phase 4**: Deployment & Monitoring (Month 6)

---

## 9. Acceptance Criteria

### Completion Definition
The project is considered complete when:
- All functional requirements are met with documented evidence of functionality.
- Non-functional benchmarks including performance, scalability, and reliability standards are achieved.

### Quality Benchmarks
- Successful completion of unit, integration, and user acceptance testing phases without critical issues.

---

## 10. Resource Requirements

### Roles & Team Structure
1. **Project Manager**
2. **Software Developers (Python)**
3. **Quality Assurance Engineers**
4. **UI/UX Designers**
5. **DevOps Engineers**

### External Dependencies
- Third-party SDKs for video streaming capabilities.
- Hosting services for deployment.

---`;

const SpecSheetPage: React.FC = () => {
  const router = useRouter();
  const [specSheeDdata, setSpecSheetData] = useState<string | null>(null);
  const { specsSheet } = useChatbot();
  useEffect(() => {
    setSpecSheetData(specsSheet);
  }, [specsSheet]);
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <DecorativeHeading text="Spec" highlightText="sheet" />
      </div>

      {/* Main Content Container */}
      <div className="border border-orange-200 p-6 rounded">
        {/* Header with Title and Button */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Specification Document
          </h2>
          <button
            className="bg-[#FB5711] text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors"
            onClick={() => console.log("Navigate to folder structure")}
          >
            Folder Structure
          </button>
        </div>

        {/* Markdown Content */}
        <MarkdownRenderer content={specSheeDdata ?? ""} />
      </div>
    </div>
  );
};

export default SpecSheetPage;
