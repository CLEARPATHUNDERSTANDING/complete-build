'use client';

import React from "react";
import DiagnosticLogo from "./DiagnosticLogo";

/**
 * REDIRECT COMPONENT - LEGACY SUPPORT
 * All branding is now consolidated in DiagnosticLogo.tsx.
 * This file remains as a bridge to prevent import breakages during transition.
 */
export default function AfterPatentLogo(props: any) {
  return <DiagnosticLogo {...props} />;
}
