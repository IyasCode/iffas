/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client)
 * FILE: src/features/ijarah/components/MathProofDrawer.tsx
 * ============================================================================
 * Client boundary: A localized LaTeX rendering engine and custom modal.
 * Uses a strict, dependency-free Regex tokenizer to parse mixed Markdown
 * and Math strings safely without importing bloated AST parsers.
 * Relies exclusively on react-katex for the actual mathematical rendering.
 * ============================================================================
 */

"use client";

import { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css"; // CRITICAL: Required for LaTeX CSS formatting
import { MathProofConfig } from "../types/lesson";
import { Button } from "@/components/ui/button";
import { X, Calculator } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MathProofDrawerProps {
  config: MathProofConfig;
}

export function MathProofDrawer({ config }: MathProofDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Mount/Unmount logic to allow CSS exit animations
  useEffect(() => {
    if (isOpen) setIsRendered(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsRendered(false), 300); // Matches the Tailwind duration
  };

  // ==========================================================================
  // THE TEXT TOKENIZER (Zero-Dependency AST Alternative)
  // ==========================================================================
  const processInline = (text: string) => {
    // Splits by: BlockMath ($$), InlineMath ($), Bold (**), Italic (*)
    // (?<!\\) ensures we DO NOT match escaped dollar signs like \$100,000
    const regex =
      /(\$\$[\s\S]*?\$\$|(?<!\\)\$[\s\S]*?(?<!\\)\$|\*\*[\s\S]*?\*\*|\*[^*]+\*)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      if (part.startsWith("$$") && part.endsWith("$$")) {
        return <BlockMath key={index} math={part.slice(2, -2)} />;
      }
      if (part.startsWith("$") && part.endsWith("$")) {
        return <InlineMath key={index} math={part.slice(1, -1)} />;
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-black text-brand-dark-navy">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={index} className="text-slate-600">
            {part.slice(1, -1)}
          </em>
        );
      }

      // Cleanup manual escape characters from the raw string
      const cleanedText = part.replace(/\\(\$|%)/g, "$1");
      return <span key={index}>{cleanedText}</span>;
    });
  };

  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split("\n\n");

    return paragraphs.map((para, pIdx) => {
      const lines = para.split("\n");

      // Detect if this paragraph is a bulleted list
      if (lines.some((line) => line.trim().startsWith("* "))) {
        return (
          <ul
            key={pIdx}
            className="list-disc pl-6 space-y-3 mb-6 marker:text-brand-light-navy"
          >
            {lines.map((line, lIdx) => {
              if (line.trim().startsWith("* ")) {
                // Strip the bullet and process the rest of the line
                return (
                  <li
                    key={lIdx}
                    className="text-lg text-slate-800 leading-relaxed"
                  >
                    {processInline(line.replace(/^\*\s/, ""))}
                  </li>
                );
              }
              return (
                <li
                  key={lIdx}
                  className="list-none text-lg text-slate-800 leading-relaxed"
                >
                  {processInline(line)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p key={pIdx} className="mb-6 text-lg text-slate-800 leading-relaxed">
          {processInline(para)}
        </p>
      );
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="mt-6 w-full md:w-auto text-brand-dark-navy border-brand-dark-navy hover:bg-brand-dark-navy hover:text-white transition-all shadow-sm font-bold text-base h-12 px-6"
      >
        {config.buttonLabel}
      </Button>

      {/* CUSTOM OVERLAY PORTAL */}
      {isRendered && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-brand-navy/40 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          {/* THE "FALL" ANIMATION:
            It starts translated up (slide-in-from-top-12) to create the heavy 'drop' effect you requested. 
          */}
          <div
            className={cn(
              "relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] bg-white sm:rounded-xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden",
              isOpen
                ? "animate-in fade-in zoom-in-95 slide-in-from-top-12 opacity-100"
                : "animate-out fade-out zoom-out-95 slide-out-to-top-12 opacity-0 pointer-events-none",
            )}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-brand-dark-navy" />
                <h2 className="text-xl font-black text-brand-dark-navy uppercase tracking-wider">
                  {config.title}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full"
              >
                <X className="w-6 h-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-10 overflow-y-auto overscroll-contain">
              {renderFormattedContent(config.latexContent)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
