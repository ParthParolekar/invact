import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const DeleteButton = ({ deleteNoteHandler, note }) => {
  return (
    <Button
      colorScheme="red"
      size="sm"
      onClick={() => deleteNoteHandler(note.id)}
    >
      <DeleteIcon />
    </Button>
  );
};

export default DeleteButton;
