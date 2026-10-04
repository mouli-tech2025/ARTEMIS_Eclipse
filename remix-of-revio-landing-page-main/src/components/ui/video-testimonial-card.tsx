import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import {
  Dialog,
  DialogContent,
} from "./dialog";

interface VideoTestimonialCardProps {
  thumbnail: string;
  logo: string;
  videoUrl: string;
  className?: string;
}

// Helper function to convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url: string): string => {
  // If already an embed URL, return as is
  if (url.includes("youtube.com/embed")) {
    return url;
  }
  
  // Extract video ID from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  // If no pattern matches, assume it's already a video ID or return the URL as is
  return url.startsWith("http") ? url : `https://www.youtube.com/embed/${url}`;
};

const VideoTestimonialCard = ({
  thumbnail,
  logo,
  videoUrl,
  className,
}: VideoTestimonialCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <>
      <Card
        className={cn(
          "h-[240px] sm:h-full flex items-end bg-cover relative overflow-hidden cursor-pointer transition-opacity group",
          className
        )}
        style={{ backgroundImage: `url('${thumbnail}')` }}
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0 testimonial-video-gradient z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="flex items-center justify-between w-full relative z-20">
          <Button className="bg-[rgba(0,0,0,0.37)] backdrop-blur-[5px] py-1.5 px-2 text-xs h-8 rounded-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play-icon lucide-play"
            >
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
            </svg>{" "}
            Watch
          </Button>
          <img src={logo} alt="Company logo" className="h-4" width="80" height="16" loading="lazy" />
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title="Video testimonial"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoTestimonialCard;

