import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feed from "./pages/Feed"; // ✅ Feed page import
import Profile from "./pages/Profile";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />  {/* ✅ Feed Route Added */}
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}
