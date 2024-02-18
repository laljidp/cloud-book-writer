import { Box, Text } from "@chakra-ui/react";
import { BookSectionT } from "../../../types/book.type";

interface EditViewSectionProps {
  section: BookSectionT;
  index: number;
}

export default function EditViewSection(props: EditViewSectionProps) {
  const { section } = props;
  return (
    <Box
      key={section.id}
      display={"flex"}
      gap={3}
      borderBottom={"1px solid lightgray"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Text fontSize={"sm"}>&#9733;. &nbsp;</Text> {section.name}
      </Box>
      <Text>{section.pageNo}</Text>
    </Box>
  );
}
