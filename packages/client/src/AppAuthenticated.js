import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { CurrentUserProvider } from "./context/CurrentUser";

import Chat from "./pages/Chat";
import SetAvatar from "./components/SetAvatar";
import Register from "./pages/Register";

export default function AppAuthenticated() {
  return (
    <CurrentUserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </CurrentUserProvider>
  );
}
