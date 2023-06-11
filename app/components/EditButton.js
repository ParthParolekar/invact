import { EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const EditButton = ({ note }) => {
  return (
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
  );
};

export default EditButton;
