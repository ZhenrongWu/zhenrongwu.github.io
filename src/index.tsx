import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { pageFor, withoutTrailingSlash } from "./pageModules";
import { removeStaticSeo } from "./utils/removeStaticSeo";
import { preventFraming } from "./utils/preventFraming";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("找不到 #root 元素");
}

const applyCanonicalPath = (): string => {
  const { pathname, search, hash } = window.location;
  const canonical = withoutTrailingSlash(pathname);
  if (canonical !== pathname) {
    window.history.replaceState(window.history.state, "", `${canonical}${search}${hash}`);
  }
  return canonical;
};

if (preventFraming()) {
  container.replaceChildren();
} else {
  const pathname = applyCanonicalPath();
  pageFor(pathname)
    .preload()
    .catch(() => undefined)
    .finally(() => {
      removeStaticSeo();
      createRoot(container).render(
        <StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>
      );
    });
}
