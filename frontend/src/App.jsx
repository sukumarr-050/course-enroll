import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CoursesPage from "./pages/CoursesPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PaymentStatusPage from "./pages/PaymentStatusPage";

const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -14 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <LandingPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedPage>
                <LoginPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/register"
            element={
              <AnimatedPage>
                <RegisterPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <AnimatedPage>
                  <CoursesPage />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AnimatedPage>
                  <AdminDashboardPage />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <AnimatedPage>
                <PaymentStatusPage success />
              </AnimatedPage>
            }
          />
          <Route
            path="/payment-cancel"
            element={
              <AnimatedPage>
                <PaymentStatusPage success={false} />
              </AnimatedPage>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <ChatWidget />
    </>
  );
};

export default App;
