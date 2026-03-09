import React from "react";

type ComplianceSectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export default function ComplianceSection({
  eyebrow,
  title,
  intro,
}: ComplianceSectionProps) {
  return (
    <header className="compliance-page-header">
      {eyebrow ? <div className="compliance-eyebrow">{eyebrow}</div> : null}
      <h1 className="compliance-page-title">{title}</h1>
      {intro ? <p className="compliance-page-intro">{intro}</p> : null}
    </header>
  );
}