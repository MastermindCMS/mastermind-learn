import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { queryClient } from "@/lib/query-client";
import { routeTree } from "./router";
import "./styles/globals.css";
import { LanguageProvider } from "@/lib/language";
import "@/lib/i18n";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider><RouterProvider router={router} /></LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
