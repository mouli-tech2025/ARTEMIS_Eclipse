import { HTMLMotionProps, motion } from "framer-motion";

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