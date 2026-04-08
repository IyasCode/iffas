import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface CurriculumChapter {
  readonly id: string;
  readonly chapterNumber: number;
  readonly title: string;
  readonly description: string;
  readonly icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
