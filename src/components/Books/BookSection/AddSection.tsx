import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

interface AddSectionProps {
  bookId: string;
  path: string;
}

export default function AddSection(props: AddSectionProps) {
  const { bookId, path } = props;
  const [isAddMode, setAddMode] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState<number | string>("");

  const handleSaveSection = () => {
    console.log(path);
    console.log(bookId);
  };

  return (
    <Box display={"flex"} alignItems={"center"} gap={2}>
      {isAddMode ? (
        <Box display={"flex"} width={"100%"} gap={2}>
          <Input
            flexGrow={1}
            placeholder="Enter section name"
            size={"sm"}
            value={name}
            name={name}
            onChange={({ target }) => setName(target.value)}
            borderRadius={5}
          />
          <Input
            maxW={"120px"}
            size={"sm"}
            name={"pageNo"}
            value={page}
            onChange={({ target }) => setPage(target.value)}
            placeholder="Enter page no."
            type="number"
          />
          <Button onClick={handleSaveSection} colorScheme="teal" size={"sm"}>
            Save
          </Button>
        </Box>
      ) : (
        <Button onClick={() => setAddMode(true)} size={"xs"}>
          +<Text as="small">Add section</Text>
        </Button>
      )}
    </Box>
  );
}
