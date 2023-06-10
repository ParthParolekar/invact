"use client";
import { useEffect, useState } from "react";
import { useSession } from "../providers/SessionProvider";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { supabase } from "@/utils/supabase";

const Page = (props) => {
  const router = useRouter();
  const { session } = useSession();

  const initialState = { title: "", description: "", isImportant: false };

  const [note, setNote] = useState(initialState);

  useEffect(() => {
    setNote({
      title: props.searchParams.title,
      description: props.searchParams.description,
      isImportant: props.searchParams.important === "true" ? true : false,
    });
  }, [props]);

  useEffect(() => {
    if (!session) {
      router.push("/authentication/login");
    }
  }, [session]);

  const noteHandler = async () => {
    if (!note.title) {
      toast.error("Please enter a title for the note");
      return;
    }

    if (!note.description) {
      toast.error("A note cannot be empty");
      return;
    }

    try {
      const { error } = await supabase
        .from("notes")
        .update({
          title: note.title,
          description: note.description,
          important: note.isImportant,
        })
        .eq("id", props.searchParams.id);

      if (error) throw Error(error);

      toast.success("Note updated successfully");

      setNote(initialState);
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Flex
      height="70vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      mt={6}
    >
      <Flex
        direction="column"
        background="gray.800"
        p={12}
        alignItems="center"
        rounded={6}
        w="90%"
        minH="90%"
      >
        <Heading mb={6} color="orange.400">
          Edit Note
        </Heading>
        <FormLabel mr="auto" color="orange.400">
          Title
        </FormLabel>
        <Input
          type="text"
          mb={3}
          color="orange.400"
          borderColor="orange"
          placeholder="Enter the title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <FormLabel mr="auto" color="orange.400">
          Note
        </FormLabel>
        <Textarea
          mb={3}
          resize="none"
          color="orange.400"
          height={44}
          borderColor="Write your note"
          value={note.description}
          onChange={(e) => setNote({ ...note, description: e.target.value })}
        />
        <FormLabel mr="auto" color="orange.400">
          Important
          <Checkbox
            checked={note.isImportant}
            defaultChecked={
              props.searchParams.important === "true" ? true : false
            }
            ml={2}
            mt={1}
            onChange={(e) =>
              setNote({ ...note, isImportant: e.target.checked })
            }
          />
        </FormLabel>

        <Button colorScheme="orange" mt={4} onClick={noteHandler}>
          Edit Note
        </Button>
      </Flex>
    </Flex>
  );
};

export default Page;
