"use client";
import { useSession } from "@/app/providers/SessionProvider";
import { supabase } from "@/utils/supabase";
import { Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { session } = useSession();
  const [login, setLogin] = useState({ email: "", password: "" });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!login.email) {
      toast.error("Please Enter an email");
      return;
    }
    if (!login.password) {
      toast.error("Please Enter the password");
      return;
    }

    try {
      let { user, error } = await supabase.auth.signInWithPassword({
        email: login.email,
        password: login.password,
      });

      if (error) {
        throw new Error(error);
      } else {
        toast.success("Logged In Successfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const testCredentialsHandler = () => {
    setLogin({
      email: "john@gmail.com",
      password: process.env.NEXT_PUBLIC_TEST_PASSWORD,
    });
  };
  return (
    <Flex height="70vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        background="gray.800"
        p={12}
        alignItems="center"
        rounded={6}
      >
        <Heading mb={6} color="orange.400">
          Login
        </Heading>
        <FormLabel mr="auto" color="orange.400">
          Email
        </FormLabel>
        <Input
          type="email"
          mb={3}
          color="orange.400"
          borderColor="orange"
          placeholder="Enter your Email"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <FormLabel mr="auto" color="orange.400">
          Password
        </FormLabel>
        <Input
          type="password"
          mb={3}
          color="orange.400"
          borderColor="orange"
          placeholder="Enter your Password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <Button colorScheme="orange" mt={4} onClick={loginHandler}>
          Login
        </Button>
        <Button colorScheme="orange" mt={4} onClick={testCredentialsHandler}>
          Test Credentials
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
