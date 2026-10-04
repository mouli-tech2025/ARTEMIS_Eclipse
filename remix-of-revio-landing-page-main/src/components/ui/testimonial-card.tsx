import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Card, CardContent, CardHeader } from "./card";

const TestimonialCard = ({
    companyLogo,
    text,
    avatar,
    author,
    designation,
    className = ""
}) => {
    return (
        <Card className={cn("h-full col-span-5 flex flex-col justify-between items-start gap-16 hover:shadow-lg transition-shadow", className)}>
            <CardHeader>
                <img src={companyLogo} alt="company logo" className="h-6" width="120" height="24" loading="lazy" />
            </CardHeader>
            <CardContent className="flex flex-col gap-10 max-w-[313px]">
                <p className="">
                    {text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                    <Avatar className="w-[46px] h-[46px]">
                        <AvatarImage src={avatar} alt={author} loading="lazy" />
                        <AvatarFallback className="bg-muted text-foreground">
                            {author.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-black">
                            {author}
                        </p>
                        <p className="text-muted-foreground">
                            {designation}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TestimonialCard;