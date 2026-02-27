# **App Name**: InsightFlow

## Core Features:

- Secure User Authentication: Enable user registration and login securely using Firebase Authentication, supporting email/password and Google providers.
- Dynamic Market Dashboards: Provide a flexible UI for displaying configurable market data and news dashboards across different 'modes' (e.g., Minimal, Pro Desk), including robust panel error handling.
- Data Normalization & Proxy: Implement server-side Next.js API routes or Cloud Run endpoints to securely fetch, normalize, and cache diverse vendor data (market, news, economic calendar) before serving it to the client.
- User Preferences & Layout Management: Store and retrieve user-defined preferences, visual profiles, and custom dashboard panel configurations in Firestore, including schema versioning.
- AI-Powered Market Insights Tool: Provide a generative AI tool that summarizes relevant market news and data directly within the dashboard to quickly highlight key trends or potential impacts.
- Remote Configuration & Feature Toggling: Utilize Firebase Remote Config to dynamically enable/disable features, control UI elements, and A/B test without requiring application redeployments, ensuring 'publish safety'.
- Mode Selection & Guidance: A dedicated UI for users to select between pre-configured 'modes' (Focus, Minimal, Pro Desk), each with guided overlays explaining their purpose and features.

## Style Guidelines:

- Primary brand color: A muted, professional blue (#4689C9) to evoke clarity and reliability for data analysis, supporting a calm UX.
- Background color: A very light, desaturated blue (#EEF3F8) for the main background to ensure readability and reduce visual fatigue over long sessions.
- Accent color: A bright, but harmonious cyan (#6BDEDE) to highlight interactive elements and calls to action without being overly distracting.
- Headline and body font: 'Inter' (sans-serif) for its modern, clean, and highly readable qualities, suitable for dense data display and a professional feel.
- Use minimalist, clean line-based or subtly filled icons to maintain visual clarity and reduce noise, aligning with the app's 'reduced motion, reduced visual noise' directive.
- Implement an adaptive, modular dashboard layout with clear data separation and 'guardrails' to prevent user overwhelming. Ensure responsiveness across devices, focusing on content priority for each 'mode'.
- Animations should be subtle and functional, primarily used for smooth transitions during data updates, mode switching, or UI interactions. Avoid distracting or excessive motion to maintain a 'calm UX'.