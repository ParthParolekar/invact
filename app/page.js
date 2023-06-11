"use client";
import { supabase } from "@/utils/supabase";
import { useSession } from "./providers/SessionProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Flex, Heading } from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Note from "./components/Note";
import Filters from "./components/filters/Filters";

export default function Home() {
  const { session } = useSession();
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [displayNotes, setDisplayNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    sortByDate: "OLDEST",
    filterByImportance: "ALL",
    search: "",
  });

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
          .eq("user_id", session.user.id)
          .order("id", { ascending: true });

        if (error) throw Error(error);

        setNotes(data);
        setDisplayNotes(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchNotes();
    }
  }, []);

  const deleteNoteHandler = async (id) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id)
        .select();

      if (error) throw Error(error);

      setNotes(notes.filter((note) => note.id !== data[0].id));
      setDisplayNotes(displayNotes.filter((note) => note.id !== data[0].id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <Flex w="100vw" alignItems="center" justifyContent="center">
        <SpinnerIcon w={20} h={20} color="orange.400" />
      </Flex>
    );
  }

  return (
    <main>
      {displayNotes.length ? (
        <Flex w={["70vw", "60vw", "40vw"]} direction="column" mx="auto" mt="10">
          <Filters
            filters={filters}
            setFilters={setFilters}
            notes={notes}
            setDisplayNotes={setDisplayNotes}
          />
          {displayNotes.map((note) => (
            <Note
              note={note}
              key={note.id}
              deleteNoteHandler={deleteNoteHandler}
            />
          ))}
        </Flex>
      ) : (
        <Flex mx="auto" mt="10" w="100vw">
          <Heading textAlign="center" color="white" w="100% " mx="auto">
            {session && !loading && "No Notes to show"}
          </Heading>
        </Flex>
      )}
    </main>
  );
}
