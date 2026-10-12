import { AnimatePresence, motion, useAnimate, usePresence } from "motion/react";
import { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

function CardAnimation({ children }: Props) {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          {
            scale: 1.075,
          },
          {
            ease: "easeIn",
            duration: 0.25,
          },
        );
        await animate(
          scope.current,
          {
            opacity: 0,
          },
          {
            delay: 0.75,
          },
        );

        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent]);
  return (
    <AnimatePresence>
      <motion.div ref={scope} layout>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default CardAnimation;
