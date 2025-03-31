"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import AnimatedPage from "@/components/wrappers/AnimatedPage";

const AuthPage = () => {
  const location = useLocation();
  return (
    <div className="auth-page-wrapper">
      <motion.div
        className="container grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          key={location.pathname}
          className="mx-auto flex w-[300px] flex-col justify-center sm:w-[480px] lg:p-8"
        >
          <motion.div
            className="mb-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-cover" />
            <span className="mt-auto text-2xl">Kusl Vault</span>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.section className="text-card-foreground border-border outline-ring/50 bg-accent-foreground rounded-xl p-6 shadow-lg">
              <Outlet />
            </motion.section>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
