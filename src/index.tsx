import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./UI/App/App";
import { store } from "Core/store";
import reportWebVitals from "./pwa/reportWebVitals";
import * as serviceWorkerRegistration from "./pwa/serviceWorkerRegistration";
import "./styles/index.css";
import "./i18n";
import "animate.css";

const root = ReactDOM.createRoot(document.getElementById("payo") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

serviceWorkerRegistration.register();

reportWebVitals();
