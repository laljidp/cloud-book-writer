import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import useSWR from "swr";
import { Select } from "chakra-react-select";
import { useContext, useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../../services/user.service";
import { UserT } from "../../types/user.type";
import { UserContext } from "../../context/UserContext";
import { addNewBook, editBook } from "../../services/book.service";
import { BookT } from "../../types/book.type";

interface IAddEditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: BookT | null;
  onBookAdded: () => void;
}

export default function AddEditBookModal(props: IAddEditBookModalProps) {
  const { isOpen, onClose, onBookAdded, book } = props;
  const toast = useToast();
  const [payload, setPayload] = useState<{
    name: string;
    collaborators: string[];
  }>({
    name: "",
    collaborators: [],
  });
  const { user: currentUser } = useContext(UserContext);

  const { data: users } = useSWR<UserT[]>("/users", fetchUsers, {
    fallbackData: [],
  });

  const handleClose = () => {
    setPayload({
      name: "",
      collaborators: [],
    });
    onClose();
  };

  const handleChangePayload = (name: string, value: any) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSaveBook = async () => {
    // TODO: save a book
    if (payload.name?.trim().length < 2) {
      toast({
        status: "error",
        title: "Please provide a book name with minimum 2 char.",
        position: "top",
      });
      return;
    }

    if (isEditMode) {
      const { success } = await editBook(book?.id || "", {
        collaborators: payload.collaborators,
      });
      if (success) {
        toast({
          status: "success",
          title: "Book updated.",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          status: "error",
          title: "Failed to update book.",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      onBookAdded();
      handleClose();
      return;
    }

    const { success } = await addNewBook({
      name: payload.name,
      collaborators: payload.collaborators,
      userId: currentUser?.id || "",
    });

    if (!success) {
      toast({
        status: "error",
        title: "Failed to save a book, Please try again.",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    toast({
      status: "success",
      title: "Book saved.",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
    handleClose();
    onBookAdded();
  };

  const userOptions = useMemo(() => {
    if (!users) {
      return [];
    }
    // Removing current user ID from collaborators options
    const usersData = users?.filter(
      (user) => user.email !== currentUser?.email
    );
    return usersData.map((u) => ({ label: u.email, value: u.email }));
  }, [users, currentUser]);

  useEffect(() => {
    if (book) {
      setPayload({
        name: book.name,
        collaborators: book.collaborators,
      });
    }
  }, [book]);

  const isEditMode = useMemo(() => {
    return !!book?.id;
  }, [book]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditMode ? "Edit Book" : "Add New Book"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDir={"column"} gap={4}>
              <Input
                name="name"
                value={payload.name}
                disabled={isEditMode}
                onChange={({ target }) =>
                  handleChangePayload("name", target.value)
                }
                placeholder="Enter book name*"
              />
              <Select
                isMulti
                value={payload.collaborators.map((c) => ({
                  value: c,
                  label: c,
                }))}
                placeholder="Collaborators"
                colorScheme="purple"
                options={userOptions}
                onChange={(values) =>
                  handleChangePayload(
                    "collaborators",
                    values.map(({ value }) => value)
                  )
                }
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              size={"sm"}
              colorScheme="blue"
              mr={3}
              onClick={handleSaveBook}
            >
              {isEditMode ? "Save Book" : "Add Book"}
            </Button>
            <Button onClick={handleClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
