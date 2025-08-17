import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}
