// Display rules for volunteer cards, codified once so the public /about page
// and the /admin/volunteers list show identical labels.
//
// - Names render as "First L." when last_initial is set; bare "First" when not.
// - Branch always renders uppercase regardless of how it was typed in.

export function formatVolunteerName(firstName: string, lastInitial: string): string {
  const trimmedInitial = lastInitial.trim();
  if (!trimmedInitial) return firstName;
  // Display the first character only; defensive against admins typing more.
  return `${firstName} ${trimmedInitial.charAt(0).toUpperCase()}.`;
}

export function formatVolunteerBranch(branch: string): string {
  return branch.toUpperCase();
}
