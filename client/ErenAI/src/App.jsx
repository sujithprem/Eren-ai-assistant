import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

import ChatProvider from "./context/ChatContext";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
  {/* Public routes */}
  <Route
    path="/login"
    element={user ? <Navigate to="/chat" /> : <Login />}
  />

  <Route
    path="/register"
    element={user ? <Navigate to="/chat" /> : <Register />}
  />

  {/* Default route */}
  <Route
    path="/"
    element={<Navigate to="/login" />}
  />

  {/* Protected route */}
  <Route
    path="/chat"
    element={user ? <Chat /> : <Navigate to="/login" />}
  />
</Routes>
      </ChatProvider>
    </BrowserRouter>
  );
};

export default App;
