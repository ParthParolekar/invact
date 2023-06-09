"use client";
import { supabase } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ session: session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
