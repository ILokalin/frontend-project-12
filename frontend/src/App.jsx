import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "components/NotFound";
import LoginPage from "components/Auth/Login";
import SignupPage from "components/Auth/Signup";
import MainPage from "components/Main";
import { PrivateRout, PublicRoute } from "components/misc";
import PAGES from "./configs/routs";
import Header from "components/Header";

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={PAGES.LOGIN} element={<LoginPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={PAGES.SIGNUP} element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRout />}>
          <Route path={PAGES.MAIN} element={<MainPage />} />
        </Route>
        <Route path={PAGES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
