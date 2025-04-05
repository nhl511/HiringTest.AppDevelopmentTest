import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SortAndFilterProvider from "./contexts/SortContext.tsx";
import { ThemeProvider } from "./contexts/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SortAndFilterProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </SortAndFilterProvider>
  </StrictMode>
);
