import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center max-w-[377px] mx-auto">
        <h1 className="text-[90px] font-semibold tracking-tighter text-white leading-[1.2] mb-2">404</h1>
        <p className="mb-[60px] text-xl text-muted">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Button asChild>
          <Link to="/">
            Return to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
