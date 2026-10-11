import { AnimatePresence, motion } from "motion/react";

type Props = {
  children: React.ReactNode;
};

function AnimeWrapper({ children }: Props) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

export default AnimeWrapper;
