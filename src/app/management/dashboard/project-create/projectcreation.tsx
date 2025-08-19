"use client";
import { X } from "lucide-react";
import { useState, FormEvent, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useChatbot } from "@/app/providers/chatBotProvider/chatbot.context";

type ComplexityLevel = "basic" | "Intermediate" | "Advanced" | "";

interface Item {
  id: string;
  text: string;
}

function extractFeatureTexts(features: Item[]) {
  return features.map((feature) => feature.text);
}

export default function CreateProjectPage() {
  const searchParams = useSearchParams();

  const [projectDescription, setProjectDescription] = useState("");
  const [complexity, setComplexity] = useState<ComplexityLevel>("");
  const [features, setFeatures] = useState<Item[]>([]);
  const [techStack, setTechStack] = useState<Item[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [newTechStack, setNewTechStack] = useState("");

  const [isLoading, startTransition] = useTransition();

  const [errors, setErrors] = useState<{
    description?: string;
    complexity?: string;
  }>({});

  const { getChatbotResponse } = useChatbot();
  // Prefill description from URL
  useEffect(() => {
    const desc = searchParams.get("description");
    if (desc) {
      setProjectDescription(decodeURIComponent(desc));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!complexity) {
      newErrors.complexity = "Please select project complexity";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generic add item function
  const addItem = (
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
    text: string,
    setText: (v: string) => void,
  ) => {
    if (text.trim()) {
      setItems([...items, { id: crypto.randomUUID(), text: text.trim() }]);
      setText("");
    }
  };

  const removeItem = (
    id: string,
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  ) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    startTransition(async () => {
      const featureArr = extractFeatureTexts(features);
      const techStackArr = extractFeatureTexts(techStack);

      const res = await getChatbotResponse({
        project_description: projectDescription,
        level: complexity,
        features: featureArr,
        tech_stacks: techStackArr,
      });

      console.log(res);
    });

    // API submission here
  };

  const handleReset = () => {
    setProjectDescription("");
    setComplexity("");
    setFeatures([]);
    setTechStack([]);
    setNewFeature("");
    setNewTechStack("");
    setErrors({});
  };

  // Reusable input section
  const renderTagSection = (
    title: string,
    items: Item[],
    newValue: string,
    setNewValue: (v: string) => void,
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  ) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={`Enter ${title.toLowerCase()}`}
          className="flex-1 px-4 py-2.5 border border-none rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem(items, setItems, newValue, setNewValue);
            }
          }}
        />
        <button
          type="button"
          onClick={() => addItem(items, setItems, newValue, setNewValue)}
          className="text-white px-6 py-2.5 bg-[#FB5711] rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
            >
              <span>{item.text}</span>
              <button
                type="button"
                onClick={() => removeItem(item.id, setItems)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-fit bg-white">
      <div className="p-8">
        <div className="max-w-4xl">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-2">
                What can I help you build?
              </h2>
            </div>

            {/* Description */}
            {/* Uncomment if you want description input */}
            <div className="mb-8">
              <textarea
                value={projectDescription}
                onChange={(e) => {
                  setProjectDescription(e.target.value);
                  if (errors.description)
                    setErrors({ ...errors, description: undefined });
                }}
                placeholder="Describe your project"
                className={`w-full h-32 px-4 py-3 border-none rounded-lg resize-none focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Complexity */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-black mb-4">
                Complexity of project
              </h3>
              <div className="space-y-3">
                {["Basic", "Intermediate", "Advanced"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="complexity"
                      value={option}
                      checked={complexity === option}
                      onChange={(e) => {
                        setComplexity(e.target.value as ComplexityLevel);
                        if (errors.complexity)
                          setErrors({ ...errors, complexity: undefined });
                      }}
                      className={`w-4 h-4 text-accent focus:ring-accent ${
                        errors.complexity ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
              {errors.complexity && (
                <p className="mt-1 text-sm text-red-500">{errors.complexity}</p>
              )}
            </div>

            {/* Features */}
            {renderTagSection(
              "Features",
              features,
              newFeature,
              setNewFeature,
              setFeatures,
            )}

            {/* Tech Stack */}
            {renderTagSection(
              "Tech Stack",
              techStack,
              newTechStack,
              setNewTechStack,
              setTechStack,
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-[#FB5711] text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-white text-[#FB5711] px-8 py-3 rounded-sm font-semibold border border-[#FB5711] hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
