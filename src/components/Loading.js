import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-container"
    >
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <h2 className="loading-text">載入中...</h2>
      </div>
    </motion.div>
  );
};

export default Loading;
