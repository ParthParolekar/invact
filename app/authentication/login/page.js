"use client";
import { supabase } from "@/utils/supabase";
import { Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });

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
      </Flex>
    </Flex>
  );
};

export default Login;
