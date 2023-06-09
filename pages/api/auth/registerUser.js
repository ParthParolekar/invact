import { supabase } from "@/utils/supabase";

export default async function registerUser(req, res) {
  // destructure the e-mail and password received in the request body.
  const { email, password, username } = req.body;

  //make a SignUp attempt to Supabase and
  // capture the user (on success) and/or error.
  if (req.method === "POST") {
    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    // Send a 400 response if something went wrong
    if (error) return res.status(401).json({ error: error.message });
    // Send 200 success if there were no errors!
    // and also return a copy of the object we received from Supabase
    return res.status(200).json({ user });
  }
}
