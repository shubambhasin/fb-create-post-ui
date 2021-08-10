import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { PostProvider } from "./context/PostContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PostProvider>
      <App />
    </PostProvider>
  </StrictMode>,
  rootElement
);
