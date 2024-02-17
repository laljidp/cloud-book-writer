import { Box, Text } from "@chakra-ui/react";
import { fetchBookByID } from "../../../services/book.service";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import AddSection from "./AddSection";
import SectionLists from "./SectionLists";

export default function EditBookSection() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { data: book } = useSWR({ id: id }, fetchBookByID, {
    fallbackData: null,
  });

  // const [sections, setSections] = useState(book?.sections || []);

  // const handleAddSection = (name: string, page: number) => {

  // };

  console.log({ book });

  const am_I_Owner = useMemo(() => {
    if (book?.userId === user?.id) {
      return true;
    }
    return false;
  }, [book, user]);

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
          <Text>Collaborators: {book?.collaborators.length}</Text>
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
            sections={book?.sections || []}
          />
        </Box>
      </Box>
    </Box>
  );
}
