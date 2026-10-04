import { supabase } from "@/integrations/supabase/client";

export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  author_image: string | null;
  status: BlogPostStatus;
  date: string;
  read_time: string;
  image: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogPostData {
  title: string;
  slug: string;
  category: string;
  author: string;
  author_image?: string | null;
  status?: BlogPostStatus;
  date: string;
  read_time: string;
  image: string;
  content: string | null;
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {}

const PUBLISHED = "published";

/**
 * Get blog posts with optional category filtering.
 * By default only published posts are returned (public site).
 * Pass includeDrafts for the admin dashboard.
 */
export const getBlogPosts = async (
  category?: string,
  includeDrafts = false
): Promise<BlogPost[]> => {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (!includeDrafts) {
    query = query.eq("status", PUBLISHED);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data || []) as BlogPost[];
};

/**
 * Get a single published blog post by slug
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", PUBLISHED)
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data as BlogPost | null;
};

/**
 * Get a single blog post by ID (admin editor — drafts included)
 */
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data as BlogPost | null;
};

/**
 * Get all unique categories from published posts
 */
export const getCategories = async (includeDrafts = false): Promise<string[]> => {
  let query = supabase.from("blog_posts").select("category").order("category");

  if (!includeDrafts) {
    query = query.eq("status", PUBLISHED);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  const categories = data?.map((post) => post.category) || [];
  return Array.from(new Set(categories)).sort();
};

/**
 * Get featured blog posts (first 2 published)
 */
export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", PUBLISHED)
    .order("created_at", { ascending: false })
    .limit(2);

  if (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }

  return (data || []) as BlogPost[];
};

/**
 * Get related published blog posts (excluding current post)
 */
export const getRelatedPosts = async (currentSlug: string, limit: number = 3): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", PUBLISHED)
    .neq("slug", currentSlug)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  return (data || []) as BlogPost[];
};

/**
 * Create a new blog post (admin only)
 */
export const createBlogPost = async (data: CreateBlogPostData): Promise<BlogPost | null> => {
  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }

  return post as BlogPost;
};

/**
 * Update an existing blog post (admin only)
 */
export const updateBlogPost = async (id: string, data: UpdateBlogPostData): Promise<BlogPost | null> => {
  const { data: post, error } = await supabase
    .from("blog_posts")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }

  return post as BlogPost;
};

/**
 * Delete a blog post (admin only)
 */
export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};

/**
 * Upload an image to the blog-images bucket and return its public URL
 */
export const uploadBlogImage = async (file: File, folder = "posts"): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(filePath);

  return publicUrl;
};

/**
 * Generate slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Calculate read time from content
 */
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};
