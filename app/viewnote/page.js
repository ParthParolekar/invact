"use client";
import { Flex, Heading, Text } from "@chakra-ui/react";

const Page = (props) => {
  return (
    <Flex mx="auto" mt="10" w="80vw" flexDirection="column">
      <Heading color="orange.400" w="100% " mx="auto" size="lg">
        {props.searchParams.title}
      </Heading>
      <Text fontSize="lg" w="100%" mx="auto" color="white" mt={6}>
        {props.searchParams.description}
      </Text>
    </Flex>
  );
};

export default Page;
