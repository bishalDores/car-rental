import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import client from "./apollo/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Toaster richColors />
      <App />
    </ApolloProvider>
  </StrictMode>
);
