import { Box } from "@chakra-ui/react";
import { BookSectionT, SectionPayloadT } from "../../../types/book.type";
import AddSection from "./AddSection";
import React from "react";
import EditViewSection from "./EditViewSection";

interface SectionListsProps {
  sections: BookSectionT[];
  bookId: string;
  owner?: boolean;
  handleAddSection?: (path: string, section: SectionPayloadT) => void;
}

export default function SectionLists(props: SectionListsProps) {
  const {
    sections,
    bookId,
    handleAddSection = () => {},
    owner = false,
  } = props;
  return (
    <Box display={"flex"} flexDir={"column"} gap={2}>
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <EditViewSection index={index} section={section} />
          <Box marginLeft={5}>
            {section?.sections?.length > 0 && (
              <SectionLists
                bookId={bookId}
                owner={owner}
                handleAddSection={handleAddSection}
                sections={section.sections}
              />
            )}
            {owner && (
              <Box marginTop={2}>
                <AddSection
                  path={section.path}
                  handleAddSection={handleAddSection}
                />
              </Box>
            )}
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}
