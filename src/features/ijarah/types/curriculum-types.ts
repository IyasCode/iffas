import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

/**
 * Defines the strict state machine for lesson progression.
 * 'JUST_UNLOCKED' acts as a transient trigger for the
 * Framer Motion portal sequence before settling into 'COMPLETED'.
 */
export type LessonStatus = "LOCKED" | "ACTIVE" | "COMPLETED" | "JUST_UNLOCKED";

export interface CurriculumChapter {
  readonly id: string;
  readonly chapterNumber: number;
  readonly title: string;
  readonly description: string;
  readonly icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
