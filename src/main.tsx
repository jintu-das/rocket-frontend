import React from "react";
import { router } from "./router";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
