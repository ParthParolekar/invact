"use client";
import { useSession } from "@/app/providers/SessionProvider";
import { supabase } from "@/utils/supabase";
import { Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const { session } = useSession();
  const [signup, setSignup] = useState({ email: "", password: "" });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const signupHandler = async (e) => {
    e.preventDefault();

    if (!signup.email) {
      toast.error("Please Enter an email");
      return;
    }
    if (!signup.password) {
      toast.error("Please Enter the password");
      return;
    }

    try {
      let { user, error } = await supabase.auth.signUp({
        email: signup.email,
        password: signup.password,
      });

      if (error) {
        throw new Error(error);
      } else {
        toast.success("Signed Up Successfully!");
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
          Signup
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
          value={signup.email}
          onChange={(e) => setSignup({ ...signup, email: e.target.value })}
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
          value={signup.password}
          onChange={(e) => setSignup({ ...signup, password: e.target.value })}
        />
        <Button colorScheme="orange" mt={4} onClick={signupHandler}>
          Signup
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signup;
