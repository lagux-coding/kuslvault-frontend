import { AuthPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import SignIn from "./features/auth/components/SignIn";
import SignUp from "./features/auth/components/SignUp";

const App = () => {
  return (
    <main className="bg-primary-foreground container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[480px] lg:p-8">
        <Routes>
          {/* Public Route */}
          <Route element={<AuthPage />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Private Route */}
        </Routes>
      </div>
    </main>
  );
};

export default App;
