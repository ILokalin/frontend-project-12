import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./Components/NotFoundPage";
import LoginPage from "./Components/LoginPage";
import MainPage from "./Components/MainPage";
import { PrivateRout, PublicRoute } from "./Components/misc";
import ROUTES from "./apiConfig";

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRout />}>
          <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
