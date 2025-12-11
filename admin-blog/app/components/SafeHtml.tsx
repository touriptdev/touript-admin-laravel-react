// components/SafeHtml.tsx
"use client";

import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

type SafeHtmlProps = {
  html: string | null | undefined;
  className?: string;
};

export function SafeHtml({ html, className }: SafeHtmlProps) {
  if (!html) return null;

  const clean = DOMPurify.sanitize(html);

  return <div className={className}>{parse(clean)}</div>;
}
