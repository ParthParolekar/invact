import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ deleteNoteHandler, note }) => {
  const router = useRouter();
  return (
    <Button
      colorScheme="red"
      size="sm"
      onClick={(e) => {
        deleteNoteHandler(note.id);
      }}
    >
      <DeleteIcon />
    </Button>
  );
};

export default DeleteButton;
