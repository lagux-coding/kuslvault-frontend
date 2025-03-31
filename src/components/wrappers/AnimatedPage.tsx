import { ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const animation = {
  // initial: { opacity: 0, scale: 0.95, y: 20 },
  // animate: { opacity: 1, scale: 1, y: 0 },
  // exit: { opacity: 0, scale: 0.95, y: -20 },
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

type AnimatedWrapperProps = {
  children: ReactNode;
};

const AnimatedPage = ({ children }: AnimatedWrapperProps) => {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
