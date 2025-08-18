"use client"

import Header from "./components/Header";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    
      <div className="">
        <Header />

        <div>
          <p>User: {session?.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
  );
}
