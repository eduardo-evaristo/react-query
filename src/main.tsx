import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Create the client
const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 2. Provide the application with the client, in this case, all of the app will have access to it cuz this is the entry point */}
    {/* This looks like passing the redux provider with the store :)*/}
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
