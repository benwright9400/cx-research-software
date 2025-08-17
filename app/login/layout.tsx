import { ReactNode } from "react";

export const metadata = {
  title: "Special Page",
};

export const dynamic = 'force-static';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}
