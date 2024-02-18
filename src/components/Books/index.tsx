import AddEditBookModal from "./AddEditBookModal";
import useSWR from "swr";
import BookLists from "./BookLists";
import { useContext, useMemo, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { fetchBooks } from "../../services/book.service";
import { BookT } from "../../types/book.type";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [bookModal, setBookModal] = useState<{
    open: boolean;
    book: BookT | null;
  }>({
    open: false,
    book: null,
  });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { data: books, mutate: refreshBooks } = useSWR("/books", fetchBooks, {
    fallbackData: [],
  });

  const handleEditBook = (book: BookT) => {
    setBookModal({
      open: true,
      book: book,
    });
  };

  const filteredBooks = useMemo(() => {
    return books.filter(
      (b) =>
        b.userId === user?.id ||
        "" ||
        b.collaborators.includes(user?.email || "")
    );
  }, [books, user]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      padding={"3rem 1rem"}
      gap={2}
      width={"100%"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        width={["100%", "80%", "60%"]}
      >
        <Box
          borderRadius={8}
          display={"flex"}
          padding={".5rem"}
          alignItems={"center"}
          gap={1}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Box
            borderRadius={10}
            border={"1px solid lightgray"}
            background={"teal"}
            color={"white"}
            fontWeight={600}
            width={"100%"}
            p={".6rem 1rem"}
          >
            My Books
          </Box>
          <Button
            colorScheme="teal"
            onClick={() => setBookModal({ open: true, book: null })}
          >
            Add book
          </Button>
        </Box>
        <Box width={"100%"} padding={"1rem 1rem"}>
          <BookLists
            onEditBook={handleEditBook}
            onSelectBook={(book) => navigate(`/books/${book.id}`)}
            books={filteredBooks}
          />
        </Box>
      </Box>
      <AddEditBookModal
        book={bookModal.book}
        onBookAdded={refreshBooks}
        isOpen={bookModal.open}
        onClose={() =>
          setBookModal({
            open: false,
            book: null,
          })
        }
      />
    </Box>
  );
}
