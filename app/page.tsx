"use client"

import { redirect } from "next/dist/server/api-utils";
import Header from "./components/Header";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SidebarLayoutWrapper from "./components/SidebarLayoutWrapper";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return router.push("/login")
  }

  return (
    <SidebarLayoutWrapper>
      <div className="">
        <Header />

        <div>
          <p>User: {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    </SidebarLayoutWrapper>
  );
}
