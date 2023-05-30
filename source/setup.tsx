// Third-party imports.
import {render} from "preact";
// CSS imports.
import "modern-normalize/modern-normalize.css";
import "./global.scss";
// First-party imports.
import {App} from "./app.js";

if ($dev) {
  await import("./date/date.test.js");
}

const preactRoot = document.createElement("div");
preactRoot.classList.add("preact-root");
document.body.append(preactRoot);
render(<App />, preactRoot);
