import { motion } from "framer-motion";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };

const AnimatedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const variants = {
    hidden: { y: 50, opacity: 0 }, 
    visible: { y: 0, opacity: 1 }, 
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      transition={transition}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
