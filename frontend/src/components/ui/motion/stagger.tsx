import { type HTMLMotionProps, motion } from "framer-motion";

/**
 * StaggerContainer
 *
 * A framer-motion container that staggers the entrance animation of its
 * direct children. Each child should use the "initial" / "animate" variant
 * keys, or be wrapped in AnimateOnView.
 *
 * Props:
 *   staggerDelay — seconds between each child animation (default: 0.1)
 *   All standard HTMLMotionProps<"div"> are also accepted.
 *
 * Adapted from remix-of-revio-landing-page-main for framer-motion v12.
 */

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  children: React.ReactNode;
}

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  ...props
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
