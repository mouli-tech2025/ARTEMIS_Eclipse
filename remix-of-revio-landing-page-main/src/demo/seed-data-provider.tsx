import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { BlogPost, CreateBlogPostData, UpdateBlogPostData } from "@/lib/services/blog-service";
import { demoBlogPosts, demoProfile, type DemoProfile } from "@/demo/seed-data";

/**
 * Injects static seed data into the /demo/* routes.
 * All mutations stay in React state — nothing touches auth or the database.
 */
interface SeedDataContextValue {
  posts: BlogPost[];
  categories: string[];
  profile: DemoProfile;
  getPost: (id: string) => BlogPost | undefined;
  createPost: (data: CreateBlogPostData) => BlogPost;
  updatePost: (id: string, data: UpdateBlogPostData) => void;
  deletePost: (id: string) => void;
  updateProfile: (data: Partial<DemoProfile>) => void;
}

const SeedDataContext = createContext<SeedDataContextValue | undefined>(undefined);

export const SeedDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>(demoBlogPosts);
  const [profile, setProfile] = useState<DemoProfile>(demoProfile);

  const getPost = useCallback((id: string) => posts.find((p) => p.id === id), [posts]);

  const createPost = useCallback((data: CreateBlogPostData) => {
    const now = new Date().toISOString();
    const post: BlogPost = {
      id: `demo-post-${Math.random().toString(36).slice(2, 10)}`,
      title: data.title,
      slug: data.slug,
      category: data.category,
      author: data.author,
      author_image: data.author_image ?? null,
      status: data.status ?? "draft",
      date: data.date,
      read_time: data.read_time,
      image: data.image,
      content: data.content,
      created_at: now,
      updated_at: now,
    };
    setPosts((current) => [post, ...current]);
    return post;
  }, []);

  const updatePost = useCallback((id: string, data: UpdateBlogPostData) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, ...data, updated_at: new Date().toISOString() } : post
      )
    );
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts((current) => current.filter((post) => post.id !== id));
  }, []);

  const updateProfile = useCallback((data: Partial<DemoProfile>) => {
    setProfile((current) => ({ ...current, ...data }));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts]
  );

  const value = useMemo(
    () => ({
      posts,
      categories,
      profile,
      getPost,
      createPost,
      updatePost,
      deletePost,
      updateProfile,
    }),
    [posts, categories, profile, getPost, createPost, updatePost, deletePost, updateProfile]
  );

  return <SeedDataContext.Provider value={value}>{children}</SeedDataContext.Provider>;
};

export const useSeedData = () => {
  const context = useContext(SeedDataContext);
  if (!context) {
    throw new Error("useSeedData must be used within a SeedDataProvider");
  }
  return context;
};
