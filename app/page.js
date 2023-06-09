"use client";
import { supabase } from "@/utils/supabase";
// import { useEffect, useState } from "react";
import { useSession } from "./providers/SessionProvider";

export default function Home() {
  const { session } = useSession();

  const logoutHandler = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main>
      {session && (
        <div>
          <h1>authenticated</h1>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </main>
  );
}
