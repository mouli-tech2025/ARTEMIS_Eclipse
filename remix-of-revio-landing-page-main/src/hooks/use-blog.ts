import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogPostById,
  getCategories,
  getFeaturedPosts,
  getRelatedPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  BlogPost,
  CreateBlogPostData,
  UpdateBlogPostData,
} from "@/lib/services/blog-service";

export const useBlogPosts = (category?: string) => {
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", category],
    queryFn: () => getBlogPosts(category),
  });
};

/** Admin dashboard: includes drafts */
export const useAllBlogPosts = () => {
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", "all"],
    queryFn: () => getBlogPosts(undefined, true),
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery<BlogPost | null>({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  });
};

export const useBlogPostById = (id: string) => {
  return useQuery<BlogPost | null>({
    queryKey: ["blogPostById", id],
    queryFn: () => getBlogPostById(id),
    enabled: !!id,
  });
};

export const useCategories = (includeDrafts = false) => {
  return useQuery<string[]>({
    queryKey: ["blogCategories", includeDrafts],
    queryFn: () => getCategories(includeDrafts),
  });
};

export const useFeaturedPosts = () => {
  return useQuery<BlogPost[]>({
    queryKey: ["featuredPosts"],
    queryFn: getFeaturedPosts,
  });
};

export const useRelatedPosts = (currentSlug: string, limit: number = 3) => {
  return useQuery<BlogPost[]>({
    queryKey: ["relatedPosts", currentSlug, limit],
    queryFn: () => getRelatedPosts(currentSlug, limit),
    enabled: !!currentSlug,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogPostData) => createBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["featuredPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlogPostData }) =>
      updateBlogPost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPostById", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["featuredPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["featuredPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] });
    },
  });
};
