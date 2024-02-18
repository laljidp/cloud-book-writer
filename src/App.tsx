import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import UserContextProvider from "./context/UserContext";

import Login from "./components/Login";
import Books from "./components/Books";
import SignUp from "./components/Signup";
import PrivateLayout from "./components/PrivateLayout";
import EditBookSection from "./components/BookSection/EditBookSection";

const publicRoutes = () => {
  return [
    { path: "/", element: <Login /> },
    { path: "signup", element: <SignUp /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
};

const privateRoutes = () => {
  return {
    element: <PrivateLayout />,
    children: [
      { path: "/books", element: <Books /> },
      { path: "/books/:id", element: <EditBookSection /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
};

function App() {
  const router = createBrowserRouter([privateRoutes(), ...publicRoutes()]);
  // Provide the router configuration using RouterProvider

  return (
    <React.StrictMode>
      <ChakraProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
