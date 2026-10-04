import { Slot } from "@radix-ui/react-slot";
import { HTMLMotionProps, motion } from "framer-motion";

interface MotionAnimateProps extends HTMLMotionProps<"div"> {
  asChild?: boolean;
  delay?: number;
  once?: boolean;
  blur?: boolean;
  scale?: boolean;
  y?: number;
  opacity?: number;
}

export const AnimateOnView = ({
  children,
  asChild,
  delay = 0,
  once = true,
  blur = false,
  scale = false,
  y = 20,
  opacity = 0,
  ...props
}: MotionAnimateProps) => {
  const Component = asChild ? motion.create(Slot) : motion.div;

  return (
    <Component
      initial={{
        opacity,
        y,
        filter: blur ? "blur(8px)" : "blur(0px)",
        scale: scale ? 0.95 : 1
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1
      }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration: 0.8, // Slightly longer duration for blur/scale feel
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      {...props}
    >
      {children}
    </Component>
  );
};