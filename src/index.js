import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthState } from "./context/Auth";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Toaster />
    <AuthState>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthState>
  </BrowserRouter>
);
