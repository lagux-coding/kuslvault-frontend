import { AuthPage, Home, NotFoundPage, TestPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import SignIn from "./features/auth/components/Login";
import SignUp from "./features/auth/components/Register";
import ResetPassword from "./features/auth/components/ResetPassword";

const App = () => {
  return (
    <Routes>
      {/* Public Route */}

      <Route
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Private Route */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/test" element={<TestPage />}></Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default App;
