import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

type Props = {
  title: string;
  className?: string;
};

function PageHeading({ title, className }: Props) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn("text-3xl sm:4xl md:5xl lg:6xl font-semibold", className)}
    >
      {title}
    </motion.h1>
  );
}

export default PageHeading;
