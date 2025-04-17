import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import LoginRoute from "./routes/login";
import RegisterRoute from "./routes/register";
import RootRoute from "./routes/root";
import UnverifiedRoute from "./routes/unverified";
import VerifiedRoute from "./routes/verified";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer autoClose={1500} />
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/unverified" element={<UnverifiedRoute />} />
        <Route path="/verifiy/:token" element={<VerifiedRoute />} />
      </Routes>
    </React.Fragment>
  );
};
export default App;
