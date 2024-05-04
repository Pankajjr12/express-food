import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router/Router";
import AuthProvider from "./contexts/AuthProvider";
import { RouterProvider } from "react-router-dom";

//tanstack
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);