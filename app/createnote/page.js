"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "../providers/SessionProvider";
import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { supabase } from "@/utils/supabase";

const Page = () => {
  const router = useRouter();
  const { session } = useSession();

  const initialState = { title: "", description: "", isImportant: false };

  const [note, setNote] = useState(initialState);

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
      const { data, error } = await supabase
        .from("notes")
        .insert({
          title: note.title,
          description: note.description,
          important: note.isImportant,
          user_id: session.user.id,
        })
        .select();

      if (error) throw Error(error);

      toast.success("Note created successfully");

      setNote(initialState);
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Flex height="70vh" w="100vw" alignItems="center" justifyContent="center">
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
          New Note
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
            value={note.isImportant}
            ml={2}
            mt={1}
            onChange={(e) =>
              setNote({ ...note, isImportant: e.target.checked })
            }
          />
        </FormLabel>

        <Button colorScheme="orange" mt={4} onClick={noteHandler}>
          Create Note
        </Button>
      </Flex>
    </Flex>
  );
};

export default Page;
