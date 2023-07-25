require('dotenv').config()
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons'
const port = process.env.PORT;
const url = process.env.db_URL;


library.add(faMagnifyingGlass, faLayerGroup, faPlus)


import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>
);

App.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
