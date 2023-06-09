"use client";
import { supabase } from "@/utils/supabase";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSession } from "../providers/SessionProvider";

const Navbar = () => {
  const logoutHandler = async () => {
    await supabase.auth
      .signOut()
      .then(toast.success("Logged Out Successfully"));
  };
  const { session } = useSession();
  console.log(session);
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      justifyContent={["center", "space-between"]}
      gap="2"
      mt={2}
    >
      <Box p="2" display={["none", "block"]}>
        <Heading size="lg" color={"orange.400"}>
          Chakra App
        </Heading>
      </Box>
      {/* <Spacer /> */}
      {!session ? (
        <Box gap="2">
          <Link href="/authentication/signup">
            <Button colorScheme="orange" variant="solid" marginRight={2}>
              Sign Up
            </Button>
          </Link>
          <Link href="/authentication/login">
            <Button colorScheme="orange" variant="solid" marginRight={2}>
              Log in
            </Button>
          </Link>
        </Box>
      ) : (
        <Box gap={2}>
          <Button
            colorScheme="orange"
            variant="outline"
            marginRight={2}
            onClick={logoutHandler}
          >
            Log Out
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
