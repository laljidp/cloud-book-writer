import { Box, Button, Input, Text } from "@chakra-ui/react";
import { BookSectionT, SectionPayloadT } from "../../../types/book.type";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

interface EditViewSectionProps {
  section: BookSectionT;
  onEditSection: (path: string, payload: SectionPayloadT) => void;
}

export default function EditViewSection(props: EditViewSectionProps) {
  const { section, onEditSection } = props;
  const [editMode, setEditMode] = useState(false);
  const [payload, setPayload] = useState({
    name: section.name,
    pageNo: section.pageNo,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleEditSection = () => {
    // TODO: call function to update a state
    onEditSection(section.path, payload);
    resetState();
  };

  const resetState = () => {
    setPayload({
      name: section.name,
      pageNo: section.pageNo,
    });
    setEditMode(false);
  };

  // console.log("path", section.path);

  return (
    <Box
      key={section.id}
      display={"flex"}
      gap={3}
      borderBottom={"1px dotted lightgray"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} alignItems={"center"} flexGrow={1}>
        {editMode ? (
          <Input
            onChange={handleChange}
            name="name"
            size={"sm"}
            borderRadius={5}
            placeholder="Section name"
            value={payload.name}
            width={"100%"}
          />
        ) : (
          <>
            <Text fontSize={"sm"}>&#9733;. &nbsp;</Text> {section.name}
          </>
        )}
      </Box>
      {editMode ? (
        <Input
          onChange={handleChange}
          name="pageNo"
          size={"sm"}
          borderRadius={5}
          placeholder="Enter page no"
          value={payload.pageNo}
          maxW={"120"}
        />
      ) : (
        <Box display={"flex"} gap={2}>
          <Text>{section.pageNo}</Text>
          <Button
            onClick={() => setEditMode(true)}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            size={"xs"}
          >
            <EditIcon />
          </Button>
        </Box>
      )}
      {editMode && (
        <Box display={"flex"} gap={2}>
          <Button onClick={handleEditSection} size={"sm"} colorScheme="teal">
            Save
          </Button>
          <Button onClick={resetState} size={"sm"}>
            close
          </Button>
        </Box>
      )}
    </Box>
  );
}
