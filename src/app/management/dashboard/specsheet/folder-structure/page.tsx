// app/folder-structure/page.tsx  (or pages/folder-structure.tsx)

import DecorativeHeading from "@/components/common/DecorativeHeading";
import React from "react";

const FolderStructurePage: React.FC = () => {
  /*────────────────────────────  ASCII TREE  ────────────────────────────*/
  const tree = String.raw`
devops-automation-tool/
├── README.md
├── .gitignore
├── src/
│   ├── api/
│   │   ├── app.ts
│   │   ├── schema.graphql
│   │   └── resolvers/
│   ├── database/
│   │   ├── db.ts
│   │   └── migration.ts
│   ├── services/
│   │   ├── auth.ts
│   │   └── websocket.ts
│   └── utils/
├── docs/
├── tests/
├── config/
        ├── passport.js
        └── newrelic.json
`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <DecorativeHeading text="Spec" highlightText="sheet" />
      </div>

      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          DevOps Automation Tool Project
        </h2>

        <div className="flex gap-3">
          <button
            type="button"
            className="rounded bg-[#FB5711] px-5 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
          >
            Upload to Github
          </button>

          <button
            type="button"
            className="rounded border border-[#FB5711] px-5 py-2 text-sm font-medium text-[#FB5711] hover:bg-orange-50 transition-colors"
          >
            Specification Sheet
          </button>
        </div>
      </div>

      {/* Folder-structure canvas */}
      <div
        className="mt-8 rounded border-2 border-orange-200 p-8 overflow-auto
                   bg-[radial-gradient(#ffedd520_1px,transparent_1px)]
                   bg-[length:14px_14px]"
      >
        <pre className="whitespace-pre font-mono text-[13px] leading-5 text-slate-700">
          {tree}
        </pre>
      </div>
    </div>
  );
};

export default FolderStructurePage;
