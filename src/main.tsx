import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { MyListProvider } from "./context/List.context.tsx";
import { RecProvider } from "./context/Recommendation.context.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MyListProvider>
      <RecProvider>
        <App />
      </RecProvider>
    </MyListProvider>
  </BrowserRouter>
);
