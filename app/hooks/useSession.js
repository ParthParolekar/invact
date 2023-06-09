import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const useSession = async () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return session;
};

export default useSession;
