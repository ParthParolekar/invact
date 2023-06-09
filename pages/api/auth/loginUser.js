import { supabase } from "@/utils/supabase";

export default async function loginUser(req, res) {
  const { email, password } = req.body;

  if (req.method === "POST") {
    let { user, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) return res.status(401).json({ error: error.message });

    return res.status(200).json({ user: user });
  }
}
