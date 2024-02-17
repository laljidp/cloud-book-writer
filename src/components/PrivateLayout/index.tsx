import { Box, Button, Text } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { Suspense, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../constants";

export default function PrivateLayout() {
  const { logout, user } = useContext(UserContext);

  const checkAuth = () => {
    if (
      localStorage.getItem(TOKEN_STORAGE_KEY) &&
      localStorage.getItem(USER_STORAGE_KEY)
    ) {
      return true;
    }
    return false;
  };

  if (!checkAuth()) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Box width={"100%"} padding={3} backgroundColor={"teal"} color={"white"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text fontWeight={600} fontSize={18}>
            Cloud Book
          </Text>
          <Text>Hello, {user?.name || "Anonymous"}</Text>
          <Button onClick={logout} size={"sm"} colorScheme="teal">
            Logout
          </Button>
        </Box>
      </Box>
      <Suspense fallback={"Loading..."}>
        <Outlet />
      </Suspense>
    </>
  );
}
