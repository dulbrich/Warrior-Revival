import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-light px-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-card" />
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
