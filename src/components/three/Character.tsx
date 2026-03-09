"use client";

import { Suspense } from "react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import CharacterModel from "./CharacterModel";
import CharacterPlaceholder from "./CharacterPlaceholder";

/**
 * Character on the seam: uses .fbx from /models/character.fbx when available
 * (Idle/Run clips via useAnimations); falls back to rendering nothing on load error or missing file.
 */
export default function Character() {
  return (
    <ErrorBoundary fallback={<CharacterPlaceholder />}>
      <Suspense fallback={<CharacterPlaceholder />}>
        <CharacterModel />
      </Suspense>
    </ErrorBoundary>
  );
}
