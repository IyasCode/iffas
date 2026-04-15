/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Server Action (Paradigm B Persistence)
 * FILE: src/features/ijarah/actions/save-lesson-progress.ts
 * ============================================================================
 * Persists the student's lesson completion state to the database/session.
 * Utilizes Zod for strict payload validation at the server edge, ensuring
 * no corrupted completion states bypass the UI.
 * ============================================================================
 */

"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

// 1. Zod Schema for strict validation boundary
const CompleteLessonSchema = z.object({
  lessonId: z.string().min(1, "Lesson ID is required."),
  chapterId: z.string().min(1, "Chapter ID is required."),
  nextLessonId: z.string().min(1, "Next Lesson ID is required."),
});

// 2. Strongly typed Server Action response payload
export type SaveLessonState = {
  error?: string;
  success?: boolean;
  unlockedLessonId?: string;
} | null;

export async function saveLessonProgressAction(
  prevState: SaveLessonState,
  formData: FormData,
): Promise<SaveLessonState> {
  // 3. Extract and parse the untrusted client data
  const rawData = {
    lessonId: formData.get("lessonId"),
    chapterId: formData.get("chapterId"),
    nextLessonId: formData.get("nextLessonId"),
  };

  const validation = CompleteLessonSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: "Invalid lesson completion data submitted." };
  }

  const { nextLessonId } = validation.data;

  try {
    // TODO [Persistence]: Replace this block with actual DB call (e.g., Supabase)
    // await db.userProgress.upsert({ lessonId, status: 'COMPLETED' })
    // await db.userProgress.upsert({ lessonId: nextLessonId, status: 'JUST_UNLOCKED' })

    // Simulating network persistence delay for the pending state UI
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Revalidate the module path so the Server Components re-fetch the new state
    revalidatePath(`/ijarah`);

    return {
      success: true,
      unlockedLessonId: nextLessonId,
    };
  } catch (error: unknown) {
    // Catching as unknown and providing a safe, educational fallback
    return { error: "A server error occurred while saving your progress." };
  }
}
