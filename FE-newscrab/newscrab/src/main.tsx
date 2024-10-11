import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
