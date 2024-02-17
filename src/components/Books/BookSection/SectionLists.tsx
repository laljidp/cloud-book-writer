import { Box, Text } from "@chakra-ui/react";
import { BookSectionT } from "../../../types/book.type";
import AddSection from "./AddSection";
import React from "react";

interface SectionListsProps {
  sections: BookSectionT[];
  prevIndex?: number;
  path: string;
  bookId: string;
}

export default function SectionLists(props: SectionListsProps) {
  const { sections, prevIndex, bookId, path } = props;
  console.log({ sections });
  return (
    <Box display={"flex"} flexDir={"column"} gap={2}>
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <Box
            key={section.id + index + 1}
            display={"flex"}
            gap={3}
            justifyContent={"space-between"}
          >
            <Text display={"flex"} alignItems={"center"}>
              <Text fontSize={"sm"}>
                {prevIndex ? prevIndex + "." : null}
                {index + 1}. &nbsp;
              </Text>{" "}
              {section.name}
            </Text>
            <Text>{section.pageNo}</Text>
          </Box>
          <Box marginLeft={5}>
            {section?.sections?.length > 0 && (
              <SectionLists
                bookId={bookId}
                path={`${path}/${section.id}`}
                prevIndex={index + 1}
                sections={section.sections}
              />
            )}
            <Box marginTop={2}>
              <AddSection path={`${bookId}`} bookId={bookId} />
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}
