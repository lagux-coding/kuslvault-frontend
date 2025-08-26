"use client";

import { useEffect, useState } from "react";
import { useLayoutStore } from "@/store/showLogo";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import System from "@/components/lottie/System";

const slides = [
  {
    animationSrc: "https://lottie.host/9dbf53dc-2cb3-41f3-b3c0-9ab8e06fcfe6/Ls9yDx8oSb.lottie",
    title: "All your dev assets, in one place",
    subtitle: "Snippets, API keys, configs – all organized like a second brain",
  },
  {
    animationSrc: "https://lottie.host/ba494b30-0f32-41c5-b869-fa3ef21841c2/YYTlG2veGZ.lottie",
    title: "Save It    Find It    Done",
    subtitle: 'Save it once. Find it fast.\nNo more "Where did I put that key?"',
  },
  {
    animationSrc: "https://lottie.host/e03679a1-6baf-4321-a4a6-6082aa1fc3a2/MeFAahqLqW.lottie",
    title: "Your Peace of Mind, Vaulted",
    subtitle: "No more clutter. No more chaos.\nJust one vault — for everything that matters.",
  },
];

const AuthPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const showLogo = useLayoutStore((state) => state.showLogo);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <main className="flex min-h-screen max-w-screen items-center justify-center p-2">
        {/* Left Section: Animation + Text */}
        <section className="flex h-full w-full flex-col items-center justify-center">
          {/* Animation */}
          <div className="h-[500px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <DotLottieReact
                  src={slides[currentSlide].animationSrc}
                  loop
                  autoplay
                  style={{
                    width: "100%",

                    height: "500px",
                  }}
                  renderConfig={{
                    devicePixelRatio: window.devicePixelRatio || 2,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text */}
          <motion.div
            key={currentSlide + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 text-center"
          >
            <h2 className="text-gradient-1 text-3xl font-bold whitespace-pre">
              {slides[currentSlide].title}
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-gray-600">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>

          {/* Slide Dots */}
          <div className="mt-4 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "scale-125 bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Right Section: Form (Outlet) */}
        <section className="flex min-h-screen w-full flex-col items-center space-y-10 overflow-auto rounded-2xl border-1 border-black/8 p-8 shadow-md">
          <div className="flex w-[360px] flex-1 flex-col items-center justify-center">
            {/* Logo */}
            {showLogo && <img src="/kuslvault.svg" alt="Logo" width="100px" height="100px" />}

            {/* Auth */}
            <Outlet />
          </div>
          {/* Footer */}
          <div className="mt-auto flex w-full items-center justify-between text-sm text-black/50">
            <p className="">© 2025 - Kusl Vault All Rights Reserved</p>
            <p className="">Privacy Policy • Term & Condition</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthPage;
