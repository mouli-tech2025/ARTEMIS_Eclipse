import { Link, useLocation } from "react-router-dom";
import { FileText, Home, PenSquare, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Crumb {
  label: string;
  to?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Crumb[];
}

const menuItems = [
  {
    title: "All Posts",
    url: "/dashboard/blog",
    icon: FileText,
  },
  {
    title: "Create Post",
    url: "/dashboard/blog/new",
    icon: PenSquare,
  },
];

const BlogLayout = ({ children, breadcrumbs }: BlogLayoutProps) => {
  const location = useLocation();
  const { user, profile } = useAuth();
  const crumbs: Crumb[] = breadcrumbs?.length ? breadcrumbs : [{ label: "Dashboard", to: "/dashboard/blog" }];

  const getInitials = () => {
    const first = profile?.first_name || "";
    const last = profile?.last_name || "";
    if (first || last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
    }
    return user?.email?.split("@")[0] || "User";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <Link to="/" className="flex items-center gap-2 px-2">
              <img src="/images/common/logo.svg" alt="Revio" className="h-5" />
            </Link>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Blog Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                      >
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === "/dashboard/profile"}
                    >
                      <Link to="/dashboard/profile">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <Home className="h-4 w-4" />
                        <span>Back to Site</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarSeparator className="mb-2" />
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-8 w-8 border border-white/10">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium text-white truncate">
                  {getDisplayName()}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-6 border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="shrink-0">
              <SidebarTrigger />
            </div>
            <div className="hidden sm:block self-stretch border-l border-white/10" />
            <Breadcrumb>
              <BreadcrumbList className="text-xs tracking-wide">
                {crumbs.map((crumb, index) => {
                  const isLast = index === crumbs.length - 1;
                  return (
                    <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2.5">
                      <BreadcrumbItem>
                        {crumb.to && !isLast ? (
                          <BreadcrumbLink asChild className="hover:text-white">
                            <Link to={crumb.to}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-white">{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </span>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 sm:py-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BlogLayout;
