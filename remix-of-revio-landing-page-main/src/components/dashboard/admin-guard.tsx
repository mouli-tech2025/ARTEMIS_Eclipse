import { useAdmin } from "@/hooks/use-admin";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { user, isAdmin, isLoading } = useAdmin();
  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isLoading && user && !isAdmin && !hasShownToast.current) {
      toast.error("You don't have permission to access this page");
      hasShownToast.current = true;
    }
  }, [isLoading, user, isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
