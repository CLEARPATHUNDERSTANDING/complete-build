import React from "react";

type NeonBoardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * High-intensity NeonBoard component with a 3x thick wrap.
 * Features a 3-tone diagnostic gradient and deep layered shadows.
 */
export default function NeonBoard({ children, className = "" }: NeonBoardProps) {
  return (
    <div
      className={`relative rounded-[32px] p-[10px] transition-all duration-500 ${className}`}
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #00e5ff 50%, #f43f5e 100%)",
        boxShadow: "0 0 50px rgba(124,58,237,0.6), 0 0 80px rgba(0,229,255,0.5), 0 0 120px rgba(244,63,94,0.4)",
      }}
    >
      <div className="rounded-[24px] bg-[#070b16] h-full overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
