import { Box, Text } from "@chakra-ui/react";
import { BookSectionT, SectionPayloadT } from "../../../types/book.type";
import AddSection from "./AddSection";
import React from "react";
import EditViewSection from "./EditViewSection";

interface SectionListsProps {
  sections: BookSectionT[];
  prevIndex?: number;
  bookId: string;
  handleAddSection?: (path: string, section: SectionPayloadT) => void;
}

export default function SectionLists(props: SectionListsProps) {
  const { sections, prevIndex, bookId, handleAddSection = () => {} } = props;
  return (
    <Box display={"flex"} flexDir={"column"} gap={2}>
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <EditViewSection
            index={index}
            prevIndex={prevIndex}
            section={section}
          />
          <Box marginLeft={5}>
            {section?.sections?.length > 0 && (
              <SectionLists
                bookId={bookId}
                handleAddSection={handleAddSection}
                prevIndex={index + 1}
                sections={section.sections}
              />
            )}
            <Box marginTop={2}>
              <AddSection
                path={section.path}
                bookId={bookId}
                handleAddSection={handleAddSection}
              />
              <Text as="small">{section.path}</Text>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}
