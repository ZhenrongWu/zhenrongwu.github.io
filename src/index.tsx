import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { removeStaticSeo } from "./utils/removeStaticSeo";
import { preventFraming } from "./utils/preventFraming";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

if (!preventFraming()) {
  removeStaticSeo();

  const container = document.getElementById("root");
  if (!container) {
    throw new Error("找不到 #root 元素");
  }

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
