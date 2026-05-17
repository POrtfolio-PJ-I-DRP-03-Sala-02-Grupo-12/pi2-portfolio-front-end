import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import BottomNav from "./components/BottomNav"; // ✅ added
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <div className="min-h-screen bg-gabisou-primary pb-16">
      {" "}
      {/* ✅ pb-16 makes room for navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/editor"
          element={
            <>
              <SignedIn>
                <Editor />
              </SignedIn>

              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <BottomNav /> {/* ✅ render the bottom nav */}
    </div>
  );
}

export default App;
