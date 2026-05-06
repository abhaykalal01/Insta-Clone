import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />

      {/* Home */}
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />

      {/* Chat */}
      <Route path="/chat" element={<Chat />} />

    </Routes>
  );
}

export default App;