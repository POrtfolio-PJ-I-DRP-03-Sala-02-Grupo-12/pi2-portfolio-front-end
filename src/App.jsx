import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";
import PageLoader from "./components/PageLoader";
import Seo from "./components/Seo";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const Login = lazy(() => import("./pages/Login"));
const Editor = lazy(() => import("./pages/Editor"));

function App() {
  return (
    <div className="min-h-screen bg-gabisou-primary pb-16">
      <Seo />
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <BottomNav />
    </div>
  );
}

export default App;
