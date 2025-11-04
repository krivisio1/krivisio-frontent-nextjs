// "use client";

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";
// import { MarkdownRenderer } from "./markdown-render";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface SRSGenerationDialogProps {
//   categoryContent: string;
//   selectedCategory: string;
//   additionalInstructions: string;
//   onClose: () => void;
//   onGenerate: () => void;
// }

// export default function SRSGenerationDialog({
//   categoryContent,
//   selectedCategory,
//   additionalInstructions,
//   onClose,
//   onGenerate,
// }: SRSGenerationDialogProps) {
//   const [step, setStep] = useState<"generating" | "result">("generating");
//   const [srsContent, setSRSContent] = useState("");

//   const generateSRS = async () => {
//     try {
//       // Mock SRS with the actual format provided
//       const mockSRS = `# Software Requirements Specification (SRS)

// ## 1. Introduction

// ### 1.1 Purpose
// This document outlines the software requirements for a Library Management System (LMS) designed to manage a library catalog. It serves as a formal agreement between stakeholders and the development team, detailing functional and non-functional requirements to guide the design, development, and testing phases.

// ### 1.2 Scope
// The LMS will enable librarians to manage books in the catalog, including adding, editing, and deleting entries. It will provide search functionality by title, author, or category, track book availability and borrowing status, and include a simple user authentication system for librarians. The system is intended for single-user or small-scale library use and does not include features for end-users (patrons) or advanced administrative functions.

// ### 1.3 Definitions, Acronyms, and Abbreviations
// - **LMS**: Library Management System
// - **SQLite**: A lightweight, file-based SQL database engine
// - **Node.js**: A JavaScript runtime for server-side development
// - **Express**: A web application framework for Node.js
// - **UI**: User Interface
// - **CRUD**: Create, Read, Update, Delete operations

// ## 2. Overall Description

// ### 2.1 Product Perspective
// The LMS is a standalone web application with a client-server architecture. The frontend is built with HTML, CSS, and JavaScript, while the backend uses Node.js and Express. Data is persisted in an SQLite database. It operates independently without integration to external systems.

// ### 2.2 Product Functions
// - Manage book catalog: Add, edit, delete books.
// - Search books by title, author, or category.
// - Track availability (e.g., available, borrowed) and borrowing status.
// - Authenticate librarians via a simple login system.

// ### 2.3 User Classes and Characteristics
// - **Librarian**: The primary user, responsible for managing the catalog and viewing book status. Assumed to have basic computer literacy.

// ## 3. Specific Requirements

// ### 3.1 Functional Requirements
// - FR1: User authentication and authorization
// - FR2: Book catalog management (CRUD operations)
// - FR3: Search and filter functionality
// - FR4: Availability tracking system
// - FR5: Data persistence and backup

// ### 3.2 Non-Functional Requirements
// - Performance: System should respond to user actions within 2 seconds
// - Security: All credentials must be encrypted
// - Availability: System should maintain 99% uptime
// - Scalability: Support for up to 100 concurrent users
// - Usability: Intuitive interface for librarians

// ## 4. Additional Instructions
// ${additionalInstructions || "No additional instructions provided."}`;

//       setSRSContent(mockSRS);
//       setStep("result");
//     } catch (error) {
//       console.error("Error generating SRS:", error);
//     }
//   };

//   useEffect(() => {
//     generateSRS();
//   }, []);

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="w-[80%] max-w-6xl max-h-[90vh] flex flex-col">
//         {step === "generating" && (
//           <div className="flex flex-col items-center justify-center py-12 gap-4">
//             <Spinner />
//             <p className="text-muted-foreground">Generating SRS document...</p>
//           </div>
//         )}

//         {step === "result" && (
//           <>
//             <DialogHeader>
//               <DialogTitle>Generated SRS Document</DialogTitle>
//             </DialogHeader>
//             <ScrollArea className="flex-1">
//               <div className="pr-4">
//                 <MarkdownRenderer content={srsContent} />
//               </div>
//             </ScrollArea>

//             <div className="flex gap-3 pt-4 border-t">
//               <Button onClick={onClose} variant="outline">
//                 Cancel
//               </Button>
//               <Button
//                 onClick={onGenerate}
//                 className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white ml-auto"
//               >
//                 Submit SRS
//               </Button>
//             </div>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MarkdownRenderer } from "./markdown-render";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SRSGenerationDialogProps {
  categoryContent: string;
  selectedCategory: string;
  additionalInstructions: string;
  onClose: () => void;
  onGenerate: () => void;
}

export default function SRSGenerationDialog({
  categoryContent,
  selectedCategory,
  additionalInstructions,
  onClose,
  onGenerate,
}: SRSGenerationDialogProps) {
  const [step, setStep] = useState<"generating" | "result">("generating");
  const [srsContent, setSRSContent] = useState("");

  const generateSRS = async () => {
    try {
      const mockSRS = `# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This document outlines the software requirements for a Library Management System (LMS) designed to manage a library catalog. It serves as a formal agreement between stakeholders and the development team, detailing functional and non-functional requirements to guide the design, development, and testing phases.

### 1.2 Scope
The LMS will enable librarians to manage books in the catalog, including adding, editing, and deleting entries. It will provide search functionality by title, author, or category, track book availability and borrowing status, and include a simple user authentication system for librarians. The system is intended for single-user or small-scale library use and does not include features for end-users (patrons) or advanced administrative functions.

### 1.3 Definitions, Acronyms, and Abbreviations
- **LMS**: Library Management System
- **SQLite**: A lightweight, file-based SQL database engine
- **Node.js**: A JavaScript runtime for server-side development
- **Express**: A web application framework for Node.js
- **UI**: User Interface
- **CRUD**: Create, Read, Update, Delete operations

## 2. Overall Description

### 2.1 Product Perspective
The LMS is a standalone web application with a client-server architecture. The frontend is built with HTML, CSS, and JavaScript, while the backend uses Node.js and Express. Data is persisted in an SQLite database. It operates independently without integration to external systems.

### 2.2 Product Functions
- Manage book catalog: Add, edit, delete books.
- Search books by title, author, or category.
- Track availability (e.g., available, borrowed) and borrowing status.
- Authenticate librarians via a simple login system.

### 2.3 User Classes and Characteristics
- **Librarian**: The primary user, responsible for managing the catalog and viewing book status. Assumed to have basic computer literacy.

## 3. Specific Requirements

### 3.1 Functional Requirements
- FR1: User authentication and authorization
- FR2: Book catalog management (CRUD operations)
- FR3: Search and filter functionality
- FR4: Availability tracking system
- FR5: Data persistence and backup

### 3.2 Non-Functional Requirements
- Performance: System should respond to user actions within 2 seconds
- Security: All credentials must be encrypted
- Availability: System should maintain 99% uptime
- Scalability: Support for up to 100 concurrent users
- Usability: Intuitive interface for librarians

## 4. Additional Instructions
${additionalInstructions || "No additional instructions provided."}`;

      setSRSContent(mockSRS);
      setStep("result");
    } catch (error) {
      console.error("Error generating SRS:", error);
    }
  };

  useEffect(() => {
    generateSRS();
  }, []);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {/* Increased dialog width and height */}
      <DialogContent className="w-[95%] max-w-7xl h-[90vh] flex flex-col">
        {step === "generating" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <Spinner />
            <p className="text-muted-foreground">Generating SRS document...</p>
          </div>
        )}

        {step === "result" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#fb5711]">
                Generated SRS Document
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable content area only */}
            <ScrollArea className="flex-1 border border-gray-200 p-4 bg-white/60 backdrop-blur-sm">
              <div className="pr-4">
                <MarkdownRenderer content={srsContent} />
              </div>
            </ScrollArea>

            {/* Buttons remain fixed below content */}
            <div className="flex gap-3 pt-4 border-gray-200">
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={onGenerate}
                className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white ml-auto"
              >
                Submit SRS
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
