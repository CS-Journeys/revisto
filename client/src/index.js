import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";

// Load backend into axios
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "/api";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Right now it's set to never expire unless we explicitly tell it to. Maybe change if weird stuff happens.
      retry: false,
    },
  },
});
// Load React App
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
