import { Box, Text } from "@chakra-ui/react";
import {
  fetchBookByID,
  upsertBookSections,
} from "../../../services/book.service";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { UserContext } from "../../../context/UserContext";
import AddSection from "./AddSection";
import SectionLists from "./SectionLists";
import {
  appendStringPathToNested,
  generateUID,
} from "../../../utils/helperFunction";
import { BookSectionT, BookT, SectionPayloadT } from "../../../types/book.type";
import _get from "lodash/get";
import _set from "lodash/set";

export default function EditBookSection() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const {
    data: book,
    isLoading,
    mutate,
  } = useSWR({ id: id }, fetchBookByID, {
    fallbackData: null,
    revalidateOnFocus: false,
  });

  const handleAddSection = async (path: string, section: SectionPayloadT) => {
    debugger;
    const __section = book?.sections.slice();
    if (!path.trim()) {
      // it means it's a root section
      const sectionItem = {
        id: generateUID(),
        name: section.name,
        pageNo: section.pageNo,
        sections: [],
        path: "",
      } as BookSectionT;
      __section?.push(sectionItem);
      const updatedBook = { ...(book || {}), sections: __section } as BookT;
      mutate(updatedBook, {
        revalidate: false,
      });
      return;
    }
    const subsection = _get(__section, path) as BookSectionT;
    const sectionItem = {
      id: generateUID(),
      name: section.name,
      pageNo: section.pageNo,
      sections: [],
      path: "",
    } as BookSectionT;
    subsection?.sections?.push(sectionItem);

    console.log("subSection", subsection);
    _set(_sections, path, subsection);
    const updatedBook = { ...(book || {}), sections: _sections } as BookT;
    console.log({ updatedBook });
    mutate(updatedBook, {
      revalidate: false,
    });
    await upsertBookSections(updatedBook.id, updatedBook.sections);
  };

  console.log({ book });

  const am_I_Owner = useMemo(() => {
    if (book?.userId === user?.id) {
      return true;
    }
    return false;
  }, [book, user]);

  const _sections = useMemo(() => {
    if (book?.sections?.length) {
      return appendStringPathToNested(book.sections);
    }
    return [];
  }, [book?.sections]);

  console.log({ _sections });

  if (isLoading) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        Loading..
      </Box>
    );
  }

  if (!book) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={10}
      >
        You're not authorized to access this page.
      </Box>
    );
  }

  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"}>
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={4}
        padding={5}
        width={["100%", "90%", "80%", "60%"]}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text display={"flex"} alignItems={"center"}>
            Book name:&nbsp;&nbsp;
            <Text fontWeight={600}>
              {book?.name || "--"} (You're{" "}
              {am_I_Owner ? "Owner" : "Collaborator"})
            </Text>
          </Text>
          <Text>Collaborators: {book?.collaborators?.length || 0}</Text>
        </Box>
        <Box
          textAlign={"center"}
          border={"1px solid gray"}
          p={2}
          fontWeight={600}
          borderRadius={5}
        >
          Sections
        </Box>
        <Box>
          <SectionLists
            bookId={book?.id || ""}
            sections={_sections || []}
            handleAddSection={handleAddSection}
          />
          <Box marginTop={3}>
            <AddSection
              path={""}
              bookId={book.id}
              handleAddSection={handleAddSection}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
