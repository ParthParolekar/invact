"use client";
import { supabase } from "@/utils/supabase";
// import { useEffect, useState } from "react";
import { useSession } from "./providers/SessionProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderIcon, toast } from "react-hot-toast";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Home() {
  const { session } = useSession();
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/authentication/login");
    }
  }, [session]);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", session.user.id);

        if (error) throw Error(error);

        setNotes(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchNotes();
    }
  }, [session]);

  const deleteNoteHandler = async (id) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id)
        .select();

      if (error) throw Error(error);

      setNotes(notes.filter((note) => note.id !== data[0].id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <h1>
        <LoaderIcon />
      </h1>
    );
  }

  return (
    <main>
      {notes.length ? (
        <Flex w={["70vw", "50vw", "40vw"]} direction="column" mx="auto" mt="10">
          {notes.map((note) => (
            <Flex
              key={note.id}
              w="100%"
              rounded={6}
              p={4}
              mt={4}
              background={note.important ? "orange.400" : "transparent"}
              border="1px"
              borderColor="orange"
              cursor="pointer"
              direction="column"
            >
              <Flex justifyContent="space-between" alignItems="center" w="100%">
                <Heading
                  size={["sm", "md"]}
                  color={note.important ? "black" : "orange.400"}
                  width="80%"
                >
                  {note.title}
                </Heading>
                <ArrowForwardIcon
                  color={note.important ? "black" : "orange.400"}
                />
              </Flex>
              <Flex mt={2} gap={2}>
                <Link
                  href={{
                    pathname: "/editnote",
                    query: { ...note },
                  }}
                >
                  <Button colorScheme={"gray"} size="sm">
                    <EditIcon />
                  </Button>
                </Link>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => deleteNoteHandler(note.id)}
                >
                  <DeleteIcon />
                </Button>
              </Flex>
            </Flex>
          ))}
        </Flex>
      ) : (
        "No notes found"
      )}
    </main>
  );
}
