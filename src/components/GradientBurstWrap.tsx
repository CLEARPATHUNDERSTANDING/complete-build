'use client';

import React from "react";

interface GradientBurstWrapProps {
  children: React.ReactNode;
  tight?: boolean;
  style?: React.CSSProperties;
}

/**
 * High-Intensity Gradient Burst Wrapper.
 * Usage:
 * <GradientBurstWrap>
 *   <YourCardStuff />
 * </GradientBurstWrap>
 */
export default function GradientBurstWrap({ children, tight = false, style }: GradientBurstWrapProps) {
  return (
    <div className="gb-wrap" style={style}>
      <div className={"gb-inner" + (tight ? " tight" : "")}>
        {children}
      </div>
    </div>
  );
}