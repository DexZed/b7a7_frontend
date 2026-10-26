import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function CardContainer({ children, className }: Props) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
      <div
        className={cn(
          "card bg-base-100 w-96 shadow-sm glass-morphism",
          className,
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default CardContainer;

export function CardBody({ children, className }: Props) {
  return <div className={cn("card-body", className)}>{children}</div>;
}

export function CardActions({ children, className }: Props) {
  return <div className={cn("card-actions", className)}>{children}</div>;
}

export function CardAura({ children, className }: Props) {
  return <div className={cn("aura", className)}>{children}</div>;
}
