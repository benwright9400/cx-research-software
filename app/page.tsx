"use client"

import Header from "./components/Header";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("google")}>Sign in with google</button>;
  }

  return (
    <div className="">
      <Header />

      <div>
        <p>User: {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}
