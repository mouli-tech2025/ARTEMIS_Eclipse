import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./card";

interface BlogTypes {
    image: string;
    category: string;
    readTime: string;
    title: string;
    date: string;
    author: string;
    slug: string;
}

const BlogCard = ({
    image,
    category,
    readTime,
    title,
    date,
    author,
    slug
}: BlogTypes) => {
    return (
        <Link to={`/blog/${slug}`}>
            <Card className="h-full bg-transparent overflow-hidden cursor-pointer p-0 space-y-3 rounded-none md:rounded-none group">
                <CardHeader className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                    <img
                        src={image}
                        alt="Blog Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        width="400"
                        height="300"
                        loading="lazy"
                    />
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex items-center gap-2 lg:mb-[30px] md:mb-5 mb-3 text-sm md:text-base text-muted-foreground uppercase">
                        <span>{category}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground"></span>
                        <span>{readTime}</span>
                    </div>

                    <h3 className="h5 lg:mb-[22px] md:mb-4 mb-1.5">
                        {title}
                    </h3>

                    <div className="flex items-center md:gap-4 gap-2 text-sm md:text-base text-muted-foreground">
                        <span>{date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <span>Write <span className="text-black">{author}</span></span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default BlogCard;