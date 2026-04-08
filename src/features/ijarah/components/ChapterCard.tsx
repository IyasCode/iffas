import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils/cn";
import type { CurriculumChapter } from "../types/curriculum-types";

interface ChapterCardProps {
  chapter: CurriculumChapter;
  progress?: number;
}

/**
 * ChapterCard
 * * A semantic presentational wrapper utilizing shadcn/ui primitives to
 * display individual curriculum steps in a highly readable format.
 */

export function ChapterCard({ chapter, progress = 0 }: ChapterCardProps) {
  const Icon = chapter.icon;

  return (
    <Link
      href={`/ijarah/chapter-${chapter.chapterNumber}`}
      className="block outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-xl transition-all"
    >
      <Card
        className={cn(
          "relative transition-all duration-300 border-slate-200 bg-white z-10",
          // Interactive states to show it is a clickable route
          "hover:shadow-md hover:border-brand-light-navy group",
        )}
      >
        <CardHeader className="flex flex-row items-start gap-5 pb-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300",
              "bg-blue-100 border-blue-200 text-brand-navy",
              "group-hover:bg-blue-200 group-hover:border-blue-300",
            )}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>

          <div className="space-y-3 flex-1 pt-0.5">
            <div className="space-y-1">
              <span className="text-sm font-semibold tracking-wider text-brand-navy uppercase">
                Chapter {chapter.chapterNumber}
              </span>
              <CardTitle className="text-2xl text-slate-900 group-hover:text-brand-navy transition-colors">
                {chapter.title}
              </CardTitle>
            </div>

            {/* Pedagogical Progress Tracker */}
            <div className="flex items-center gap-3">
              <Progress value={progress} className="h-1.5" />
              <span className="text-xs font-semibold text-slate-500 min-w-[3ch]">
                {progress}%
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-brand-dark-navy leading-relaxed md:pl-17">
            {chapter.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
