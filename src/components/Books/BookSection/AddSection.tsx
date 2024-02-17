import { Box, Button, Text } from "@chakra-ui/react";

interface AddSectionProps {
  sectionId?: string;
  bookId: string;
}

export default function AddSection(props: AddSectionProps) {
  const { sectionId, bookId } = props;
  return (
    <Box display={"flex"} alignItems={"center"} gap={2}>
      <Button size={"xs"}>+</Button>
      <Text as="small">Add section</Text>
    </Box>
  );
}
