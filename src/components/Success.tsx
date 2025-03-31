import { motion } from "framer-motion";

const Success = () => {
  return (
    <div className="content mb-4 flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 400 400">
        <motion.circle
          fill="none"
          stroke="#68E534"
          strokeWidth="20"
          cx="200"
          cy="200"
          r="190"
          strokeLinecap="round"
          transform="rotate(-90 200 200)"
          className="circle"
          initial={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.polyline
          fill="none"
          stroke="#68E534"
          points="88,214 173,284 304,138"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tick"
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
    </div>
  );
};

export default Success;
