import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div
      className={`relative rounded-[30px] p-[3px] ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #7c3aed 0%, #00e5ff 45%, #ff4fd8 75%, #78a6ff 100%)",
        boxShadow:
          "0 0 20px rgba(0,229,255,0.18), 0 0 35px rgba(255,79,216,0.14), 0 0 60px rgba(124,58,237,0.12)",
      }}
    >
      <div className="rounded-[27px] bg-[#070b16] h-full overflow-hidden">{children}</div>
    </div>
  );
}
