import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { BookT } from "../../types/book.type";
import { ArrowRightIcon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

interface BookListsProps {
  books: BookT[];
  onEditBook?: (book: BookT) => void;
  onSelectBook?: (book: BookT) => void;
}

export default function BookLists(props: BookListsProps) {
  const { books, onEditBook = () => {}, onSelectBook = () => {} } = props;
  const { user } = useContext(UserContext);

  if (!books.length) {
    return <Box>No Books found</Box>;
  }

  return (
    <Box>
      {books.map((book) => (
        <Box
          padding={".5rem 1rem"}
          border={"1px solid lightgray"}
          marginBottom={2}
          alignItems={"center"}
          borderRadius={10}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Text>{book.name}</Text>
          <Box display={"flex"} gap={3}>
            <Tooltip label="Collaboration">
              <Text display={"flex"} alignItems={"center"}>
                <LinkIcon />
                &nbsp;
                {book.collaborators.length}
              </Text>
            </Tooltip>
            {user?.id === book.userId && (
              <Tooltip label="Edit">
                <Button onClick={() => onEditBook(book)} size={"sm"}>
                  <EditIcon />
                </Button>
              </Tooltip>
            )}

            <Tooltip label="Edit Book section">
              <Button size={"sm"} onClick={() => onSelectBook(book)}>
                <ArrowRightIcon />
              </Button>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
