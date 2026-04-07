import { ElementType } from "react";

/**
 * Models the specific metadata states a module card can possess.
 * Utilizes a Discriminated Union to enforce strict rendering logic in the UI.
 */
export type ModuleCardMetadata =
  | { type: "progress"; percentComplete: number }
  | { type: "tags"; tags: string[] };

/**
 * Blueprint for the interactive Module Cards on the Ijarah homepage.
 */
export interface ModuleCardData {
  id: string;
  title: string;
  description: string;
  href: string;
  actionText: string;
  icon: string;
  metadata: ModuleCardMetadata;
}
