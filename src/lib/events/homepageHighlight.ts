const HOMEPAGE_HIGHLIGHT_MARKER = "[[homepage-highlight]]";

export function isHomepageHighlighted(notes: string | null | undefined): boolean {
  return notes?.includes(HOMEPAGE_HIGHLIGHT_MARKER) ?? false;
}

export function stripHomepageHighlightMarker(
  notes: string | null | undefined
): string | null {
  if (!notes) return null;
  const cleaned = notes.split(HOMEPAGE_HIGHLIGHT_MARKER).join("").trim();
  return cleaned || null;
}

export function setHomepageHighlight(
  notes: string | null | undefined,
  highlighted: boolean
): string | null {
  const cleaned = stripHomepageHighlightMarker(notes);
  if (!highlighted) return cleaned;
  return cleaned ? `${HOMEPAGE_HIGHLIGHT_MARKER}\n${cleaned}` : HOMEPAGE_HIGHLIGHT_MARKER;
}
