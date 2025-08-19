import React from "react";

interface DecorativeHeadingProps {
  text?: string;
  highlightText?: string;
  className?: string;
  color?: string;
}

export default function DecorativeHeading({
  text,
  highlightText,
  color = "",
  className = "",
}: DecorativeHeadingProps) {
  return (
    <div className="inline-block relative">
      <div className={`border ${color && color =="white"? "border-white": "border-black"}  p-4 relative`}>
        <h1 className={`text-3xl font-body text-black ${className}`}>
          {text}{" "}
          {highlightText && (
            <span className="text-[#FB5711]">{highlightText}</span>
          )}
        </h1>
        <div className={`absolute -top-1 -left-1 w-2 h-2 ${color && color =="white"? "bg-white": "bg-black"}`}></div>
        <div className={`absolute -top-1 -right-1 w-2 h-2 ${color && color =="white"? "bg-white": "bg-black"}`}></div>
        <div className={`absolute -bottom-1 -left-1 w-2 h-2 ${color && color =="white"? "bg-white": "bg-black"}`}></div>
        <div
          className={`absolute -bottom-1 -right-1 w-2 h-2 ${color && color =="white"? "bg-white": "bg-black"}`}
        ></div>
      </div>
    </div>
  );
}
