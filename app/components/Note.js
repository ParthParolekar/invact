import { ArrowForwardIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const Note = ({ note, deleteNoteHandler }) => {
  return (
    <Link
      key={note.id}
      href={{
        pathname: "/viewnote",
        query: { ...note },
      }}
    >
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
          <ArrowForwardIcon color={note.important ? "black" : "orange.400"} />
        </Flex>
        <Flex mt={2} gap={2}>
          <EditButton note={note} />
          <DeleteButton deleteNoteHandler={deleteNoteHandler} note={note} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default Note;
