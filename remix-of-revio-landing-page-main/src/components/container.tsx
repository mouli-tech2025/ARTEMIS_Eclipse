import { cn } from "@/lib/utils"

interface ContainerProps {
    children: React.ReactNode
    className?: string
    props?: React.HTMLAttributes<HTMLDivElement>
}

const Container = ({ children, className, ...props }: ContainerProps) => {
    return (
        <div className={cn("max-w-[1320px] mx-auto px-4 md:px-5 lg:px-10", className)} {...props}>
            {children}
        </div>
    )
}

export default Container