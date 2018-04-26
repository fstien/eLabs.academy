import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom";
import NavApp from "../shared/Nav/NavApp.js";

ReactDOM.hydrate(
	<BrowserRouter>
	  <NavApp />	
	</BrowserRouter>
  , document.getElementById("App")
);
