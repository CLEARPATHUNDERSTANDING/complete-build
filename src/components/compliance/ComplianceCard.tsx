import React from "react";

type ComplianceCardProps = {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
};

export default function ComplianceCard({
  title,
  icon = "✦",
  children,
  className = "",
}: ComplianceCardProps) {
  return (
    <section className={`compliance-neon-wrap ${className}`}>
      <div className="compliance-neon-card">
        <div className="compliance-card-header">
          <span className="compliance-card-icon">{icon}</span>
          <h2 className="compliance-card-title">{title}</h2>
        </div>

        <div className="compliance-card-body">
          {children}
        </div>
      </div>
    </section>
  );
}