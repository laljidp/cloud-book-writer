import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SectionPayloadT } from "../../types/book.type";

interface AddSectionProps {
  path: string;
  handleAddSection?: (path: string, section: SectionPayloadT) => void;
}

export default function AddSection(props: AddSectionProps) {
  const { path, handleAddSection = () => {} } = props;
  const [isAddMode, setAddMode] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState<number | string>("");

  const handleSaveSection = () => {
    handleAddSection(path, { name, pageNo: Number(page) });
    resetState();
  };

  const resetState = () => {
    setAddMode(false);
    setName("");
    setPage("");
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
            borderRadius={5}
          />
          <Button size="sm" onClick={handleSaveSection} colorScheme="teal">
            Save
          </Button>
          <Button onClick={resetState} size={"sm"}>
            Cancel
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
