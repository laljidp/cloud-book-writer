import { Box, Text } from "@chakra-ui/react";
import { fetchBookByID } from "../../services/book.service";
import useSWR from "swr";
import { useParams } from "react-router-dom";

export default function EditBookSection() {
  const { id } = useParams();

  const { data: book } = useSWR({ id: id }, fetchBookByID, {
    fallbackData: null,
  });

  console.log({ book });

  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"}>
      <Box
        padding={5}
        display={"flex"}
        justifyContent={"space-between"}
        width={"50%"}
      >
        <Text display={"flex"} alignItems={"center"}>
          Book name:&nbsp;&nbsp;
          <Text fontWeight={600}>{book?.name || "--"}</Text>
        </Text>
        <Text>Collaborators: {book?.collaborators.length}</Text>
      </Box>
    </Box>
  );
}
