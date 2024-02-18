import useSWR from "swr";
import AddSection from "./AddSection";
import SectionLists from "./SectionLists";
import _get from "lodash/get";
import _set from "lodash/set";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  fetchBookByID,
  upsertBookSections,
} from "../../../services/book.service";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { UserContext } from "../../../context/UserContext";
import {
  appendStringPathToNested,
  generateUID,
} from "../../../utils/helperFunction";
import { BookSectionT, BookT, SectionPayloadT } from "../../../types/book.type";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function EditBookSection() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    data: book,
    isLoading,
    mutate,
  } = useSWR({ id: id }, fetchBookByID, {
    fallbackData: null,
    revalidateOnFocus: false,
  });

  const onEditSection = async (path: string, payload: SectionPayloadT) => {
    console.log({ payload });
    const __section = book?.sections?.slice() || [];
    let subsection = _get(__section, path) as BookSectionT;
    subsection.name = payload.name;
    subsection.pageNo = payload.pageNo;
    // Update nested object
    _set(_sections, path, subsection);
    const updatedBook = { ...(book || {}), sections: _sections } as BookT;
    // save into json server
    await upsertBookSections(updatedBook.id, updatedBook.sections);
    mutate();
  };

  const handleAddSection = async (path: string, section: SectionPayloadT) => {
    const __section = book?.sections?.slice() || [];
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
      await upsertBookSections(updatedBook.id, updatedBook.sections);
      mutate();
      return;
    }
    // FOR NESTED SECTIONS (COULD BE ANY NESTED)
    const subsection = _get(__section, path) as BookSectionT;
    const sectionItem = {
      id: generateUID(),
      name: section.name,
      pageNo: section.pageNo,
      sections: [],
      path: "",
    } as BookSectionT;
    subsection?.sections?.push(sectionItem);
    _set(_sections, path, subsection);
    const updatedBook = { ...(book || {}), sections: _sections } as BookT;
    await upsertBookSections(updatedBook.id, updatedBook.sections);
    mutate();
  };

  const am_I_Owner = useMemo(() => {
    if (book?.userId === user?.id) {
      return true;
    }
    return false;
  }, [book, user]);

  // appended string paths to N nested objects
  const _sections = useMemo(() => {
    if (book?.sections?.length) {
      return appendStringPathToNested(book.sections);
    }
    return [];
  }, [book?.sections]);

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
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text display={"flex"} alignItems={"center"}>
            Book name:&nbsp;
            <Text fontWeight={600}>
              {book?.name || "--"} (You're{" "}
              {am_I_Owner ? "Owner" : "Collaborator"})
            </Text>
          </Text>
          <Text>Collaborators: {book?.collaborators?.length || 0}</Text>
          <Button
            size={"sm"}
            onClick={() => navigate("/books")}
            leftIcon={<ArrowBackIcon />}
          >
            Go back
          </Button>
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
            owner={am_I_Owner}
            onEditSection={onEditSection}
            sections={_sections || []}
            handleAddSection={handleAddSection}
          />
          {!_sections.length && <Box as="small">No section found.</Box>}
          <Box marginTop={3}>
            {am_I_Owner && (
              <AddSection path={""} handleAddSection={handleAddSection} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
