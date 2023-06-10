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

  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      justifyContent={["center", "space-between"]}
      gap="2"
      mt={2}
    >
      <Box p="2" display={["none", "block"]}>
        <Link href="/">
          <Heading size="lg" color={"orange.400"}>
            Invact
          </Heading>
        </Link>
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
          <Link href="/createnote">
            <Button colorScheme="orange" variant="solid" marginRight={2}>
              Create Note
            </Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
