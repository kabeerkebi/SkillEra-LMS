import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/user/cards/Footer";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import Skeleton from "./components/Skeleton";
import ErrorBoundary from "./components/ErrorBoundary ";
import "./App.css";

const UserRoutes = lazy(() => import("./routes/UserRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const SignUp = lazy(() => import("./routes/SignUp"));

function App() {
  return (
    <AuthProvider>
      <div style={{ background: "rgb(244, 244, 244)" }}>
        <ErrorBoundary>
          <Suspense fallback={<Skeleton />}>
            <Routes>
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/signup/*" element={<SignUp />} />
              <Route path="/*" element={<UserRoutes />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <div className="mt-5">
          <Footer />
          <ToastContainer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
