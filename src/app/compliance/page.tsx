import "@/styles/compliance.css";
import ComplianceCard from "@/components/compliance/ComplianceCard";
import ComplianceSection from "@/components/compliance/ComplianceSection";

export default function CompliancePage() {
  return (
    <main className="compliance-page">
      <div className="compliance-page-inner">
        <ComplianceSection
          eyebrow="CLEARPATH LEGAL / RISK / USER DISCLOSURES"
          title="International Compliance & User Disclosures"
          intro="ClearPath is designed as an informational platform with user-controlled presentation adjustments. It is not legal counsel, and users must verify eligibility, restrictions, and regulatory status in their own jurisdiction."
        />

        <div className="compliance-grid">
          <ComplianceCard title="ClearPath Compliance Positioning" icon="⚖">
            <ul className="compliance-list">
              <li>Data visualization + education + journaling + community.</li>
              <li>No trade execution, routing, settlement, or custody.</li>
              <li>No personalized buy/sell/enter/exit recommendations.</li>
              <li>Designed to stay informational and user-directed.</li>
            </ul>
          </ComplianceCard>

          <ComplianceCard title="Jurisdiction & Eligibility" icon="🌍">
            <p>
              Product availability may vary by country, state, province, entity structure,
              or provider restrictions. Users must verify eligibility in their own region.
            </p>
            <p>
              Some financial providers, leveraged products, or derivatives-related services
              may not be available to U.S. residents or to residents of specific regulated markets.
            </p>
          </ComplianceCard>

          <ComplianceCard title="Verify a Broker / Firm" icon="✅">
            <ul className="compliance-links">
              <li><a href="#" target="_blank" rel="noreferrer">CFTC Check</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">NFA BASIC</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">SEC Broker-Dealer Resources</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">FCA Financial Services Register</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">ESMA CFDs Measures</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">ASIC Professional Registers Search</a></li>
            </ul>
            <p className="compliance-footnote">
              These links are for user verification only and do not imply endorsement.
            </p>
          </ComplianceCard>

          <ComplianceCard title="Partner Referral Links" icon="🔗">
            <p>
              If ClearPath receives compensation for a referral, the relevant button, card,
              or call-to-action must be labeled clearly as <strong>Paid Link</strong> or
              <strong> Sponsored Referral</strong>.
            </p>
          </ComplianceCard>

          <ComplianceCard title="Legal Pages (The Big Four)" icon="📘">
            <ul className="compliance-list">
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Risk Disclosure</li>
              <li>Regulatory Landscape / Verification Links</li>
            </ul>
          </ComplianceCard>

          <ComplianceCard title="Geo-Gate Where It Actually Matters" icon="🧭">
            <ul className="compliance-list">
              <li>Country selector for restricted-product pages.</li>
              <li>User checkbox confirming eligibility in their jurisdiction.</li>
              <li>Optional market-specific disclosures before outbound partner links.</li>
            </ul>
            <p className="compliance-footnote">
              This is a mitigation tool, not a substitute for legal review or user verification.
            </p>
          </ComplianceCard>

          <ComplianceCard title="One Thing to Avoid Saying" icon="🚫" className="compliance-card-wide">
            <p>
              Do not say: <strong>“We are compliant in every country”</strong> or
              <strong> “internationally legal”</strong>.
            </p>
            <p>
              Say instead: <strong>
                “We are designed as an informational platform and apply jurisdiction-aware disclosures;
                users must verify eligibility and regulatory status.”
              </strong>
            </p>
          </ComplianceCard>
        </div>

        <div className="compliance-last-updated">
          Last updated: March 2026
        </div>
      </div>
    </main>
  );
}