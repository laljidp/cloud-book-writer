import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/user.service";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../constants";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log({ payload });
    const { success, data } = await loginUser(payload);
    if (!success) {
      toast({
        status: "error",
        title: "Invalid credentials",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      setLoading(false);
      return;
    }
    localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
    setUser(data.user);
    toast({
      status: "success",
      title: "Logged in.",
      position: "top",
      isClosable: true,
      duration: 3000,
    });
    setLoading(false);
    setTimeout(() => {
      navigate("/books");
    }, 250);
  };

  return (
    <Box
      height={"100%"}
      padding={"5rem"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        width={"30%"}
        height={"100%"}
        gap={5}
        as="form"
        method="post"
        onSubmit={handleLogin}
      >
        <Text display={"flex"} gap={2} alignItems={"center"}>
          Login to{" "}
          <Text fontWeight={600} fontSize={20}>
            Cloud Book
          </Text>
        </Text>
        <Input
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={payload.email}
          placeholder="Enter email"
        />
        <Input
          required
          placeholder="Enter password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Button isLoading={isLoading} type="submit" colorScheme="teal">
          Login
        </Button>
        <Button type="button" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
