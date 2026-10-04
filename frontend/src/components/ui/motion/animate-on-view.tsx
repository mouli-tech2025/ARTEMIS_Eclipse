import { Slot } from "@radix-ui/react-slot";
import { type HTMLMotionProps, motion } from "framer-motion";

/**
 * AnimateOnView
 *
 * A viewport-triggered animation wrapper built on framer-motion.
 * Animates children into view when they enter the viewport.
 *
 * Props:
 *   asChild   — merge animation onto the single child element (Radix Slot pattern)
 *   delay     — animation start delay in seconds (default: 0)
 *   once      — only animate once per page load (default: true)
 *   blur      — animate from blur(8px) → blur(0) (default: false)
 *   scale     — animate from scale(0.95) → scale(1) (default: false)
 *   y         — starting vertical offset in px (default: 20)
 *   opacity   — starting opacity (default: 0)
 *
 * Adapted from remix-of-revio-landing-page-main for framer-motion v12.
 * motion.create() is the v12 API for creating motion-enhanced custom components.
 */

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
  // motion.create() is the correct API in framer-motion v12 for creating
  // a motion-enhanced wrapper around any component (including Radix Slot).
  const Component = asChild ? motion.create(Slot) : motion.div;

  return (
    <Component
      initial={{
        opacity,
        y,
        filter: blur ? "blur(8px)" : "blur(0px)",
        scale: scale ? 0.95 : 1,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
