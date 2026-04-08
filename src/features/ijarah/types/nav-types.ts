import { ElementType } from "react";

/**
 * Represents a deeply nested curriculum item (e.g., "Chapter 1" or "Quiz").
 */
export interface IjarahNavSubItem {
  title: string;
  href: string;
}

/**
 * Represents a primary navigational pillar in the Ijarah module.
 * Accommodates the SVG icon requirements and active state mapping.
 */
export interface IjarahNavItem {
  title: string;
  href: string; // The base routing prefix for this pillar (e.g., /ijarah/learn)
  icon: ElementType; // Expects a Lucide React component or standard SVG wrapper
  subItems?: IjarahNavSubItem[];
}
