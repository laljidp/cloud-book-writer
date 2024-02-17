import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { registerNewUser } from "../../services/user.service";

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: submit to json server endpoint
    const { password, confirmPassword } = payload;
    if (password.length < 5) {
      toast({
        size: "xs",
        status: "error",
        title: "Password must be 5 character long",
        duration: 3000,
        id: "invalid-pass",
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        size: "xs",
        status: "error",
        title: "Password & confirm password does not match",
        duration: 3000,
        id: "invalid-pass",
        isClosable: true,
        position: "top",
      });
      return;
    }
    //Submit a payload to json server
    try {
      const { success } = await registerNewUser({
        email: payload.email,
        password: payload.password,
        name: payload.name,
      });
      if (!success) {
        toast({
          status: "error",
          position: "top",
          title: "Failed to register, Please try again later",
        });
        return;
      }
      toast({
        position: "top",
        title: "User registered",
        duration: 3000,
        status: "success",
      });
      navigate("/");
    } catch (err) {
      console.log("ERROR saving a new user", err);
    }
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
      >
        <Text display={"flex"} gap={2} alignItems={"center"}>
          Register to{" "}
          <Text fontWeight={600} fontSize={20}>
            Cloud Book
          </Text>
        </Text>
        <Box
          display={"flex"}
          flexDir={"column"}
          gap={4}
          as="form"
          method="post"
          onSubmit={handleSubmit}
        >
          <Input
            required
            name="name"
            value={payload.name}
            placeholder="Enter name"
            onChange={handleChange}
          />
          <Input
            required
            name="email"
            type="email"
            value={payload.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Input
            required
            value={payload.password}
            name="password"
            placeholder="Enter password"
            type="password"
            onChange={handleChange}
          />
          <Input
            required
            value={payload.confirmPassword}
            name="confirmPassword"
            placeholder="Enter confirm password"
            type="password"
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
          <Button type="button" onClick={() => navigate("/")}>
            Back to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
