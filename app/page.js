"use client";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [signUp, setSignUp] = useState({ email: "", password: "", name: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      setSession(session);
    });
  }, []);

  const signUpHandler = async (e) => {
    e.preventDefault();

    let { user, error } = await supabase.auth.signUp({
      email: signUp.email,
      password: signUp.password,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    let { user, error } = await supabase.auth.signInWithPassword({
      email: login.email,
      password: login.password,
    });
  };

  const logoutHandler = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="bg-black">
      {session && (
        <div>
          <h1>authenticated</h1>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
      <form onSubmit={signUpHandler} className="flex flex-col w-2/6">
        <label htmlFor="s-email">Email</label>
        <input
          type="email"
          name="email"
          id="s-email"
          className="bg-red-500"
          value={signUp.email}
          onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
        />

        <label htmlFor="s-password">Password</label>
        <input
          type="password"
          name="password"
          id="s-password"
          className="bg-red-500"
          value={signUp.password}
          onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
        />

        <label htmlFor="name">User name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-red-500"
          value={signUp.name}
          onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
        />

        <button type="submit">SignUp</button>
      </form>
      <form onSubmit={loginHandler} className="flex flex-col w-2/6">
        <label htmlFor="l-email">Email</label>
        <input
          type="email"
          name="email"
          id="l-email"
          className="bg-red-500"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />

        <label htmlFor="l-password">Password</label>
        <input
          type="password"
          name="password"
          id="l-password"
          value={login.password}
          className="bg-red-500"
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
