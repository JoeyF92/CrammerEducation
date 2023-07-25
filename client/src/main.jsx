import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faLayerGroup, faPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faLayerGroup, faPlus, faHeart)



import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>
);


