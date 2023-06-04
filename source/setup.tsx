import {render} from "preact";
import "modern-normalize/modern-normalize.css";
import "./global.scss";
import {App} from "./app.js";

if ($dev) {
  await import("./date/date.test.js");
}

const preactRoot = document.createElement("div");
preactRoot.classList.add("preact-root");
document.body.append(preactRoot);
render(<App />, preactRoot);
