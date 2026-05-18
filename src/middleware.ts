import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Run on all paths except Next.js internals and static asset extensions.
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.png|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js|css|ico)$).*)"
  ]
};
