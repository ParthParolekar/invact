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
import { toast } from "react-hot-toast";

const Navbar = ({ session }) => {
  const logoutHandler = async () => {
    supabase.auth.signOut().then(toast.success("Logge Out Successfully"));
  };
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
          <Button colorScheme="orange" variant="outline" marginRight={2}>
            Sign Up
          </Button>
          <Button colorScheme="orange" variant="outline" marginRight={2}>
            Log in
          </Button>
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
