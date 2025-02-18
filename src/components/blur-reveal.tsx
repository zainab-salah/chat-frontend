import { motion } from "framer-motion";
import React from "react";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
  hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
  visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
};

export default function BlurReveal({
  text,
  dec,
  btn1,
  btn2,
}: {
  text: string;
  dec?: string;
  btn1?: string;
  btn2?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
    >
      <h1 className="mb-4 text-3xl font-bold leading-relaxed text-primary">
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <motion.span
              className="inline-block"
              transition={transition}
              variants={variants}
            >
              {word}
            </motion.span>
            {index < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </h1>
      <motion.p
        className=" text-zinc-400 text-start text-sm  mb-6"
        transition={transition}
        variants={variants}
      >
        {dec}
        Simple is a modern website builder powered by AI that is changing how
        companies create user interfaces together.
      </motion.p>
      <div className="flex gap-4">
        {btn1 && (
          <motion.div transition={transition} variants={variants}>
            <a
              className="inline-flex justify-center whitespace-nowrap rounded-lg bg-white px-3.5 py-2.5 font-medium text-zinc-800 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-700"
              href="#0"
            >
              {btn1}
            </a>
          </motion.div>
        )}
        {btn2 && (
          <motion.div transition={transition} variants={variants}>
            <a
              className="inline-flex justify-center whitespace-nowrap rounded-lg bg-transparent px-3.5 py-2.5 font-medium text-zinc-400 transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-700"
              href="#0"
            >
              {btn2}
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
