import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div
      className={`relative rounded-[28px] p-[2.5px] ${className}`}
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #00e5ff 50%, #f43f5e 100%)",
        boxShadow: "0 0 25px rgba(0,229,255,0.15), 0 0 50px rgba(124,58,237,0.1)",
      }}
    >
      <div className="rounded-[25.5px] bg-[#070b16] h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
