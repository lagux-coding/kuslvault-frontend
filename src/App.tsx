import { ForgotPassword, Login, Register, ResetPassword } from "@/features/auth";
import { AuthPage, Home, NotFoundPage, TestPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Test2Page from "./pages/Test2Page";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
      <Route path="/test2" element={<Test2Page />}></Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default App;
