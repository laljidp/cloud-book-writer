import { Box, Text } from "@chakra-ui/react";
import { BookSectionT } from "../../../types/book.type";

interface EditViewSectionProps {
  section: BookSectionT;
  index: number;
  prevIndex?: number;
}

export default function EditViewSection(props: EditViewSectionProps) {
  const { section, index, prevIndex } = props;
  return (
    <Box
      key={section.id + index + 1}
      display={"flex"}
      gap={3}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Text fontSize={"sm"}>
          {prevIndex ? prevIndex + "." : null}
          {index + 1}. &nbsp;
        </Text>{" "}
        {section.name}
      </Box>
      <Text>{section.pageNo}</Text>
    </Box>
  );
}
