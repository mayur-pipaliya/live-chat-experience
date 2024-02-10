import React from "react";

import { useAuth } from "./context/AuthProvider";

import AppUnauthenticated from "./AppUnauthenticated";
import AppAuthenticated from "./AppAuthenticated";

export default function App() {
  const { token } = useAuth();

  return token ? <AppAuthenticated /> : <AppUnauthenticated />;
}
