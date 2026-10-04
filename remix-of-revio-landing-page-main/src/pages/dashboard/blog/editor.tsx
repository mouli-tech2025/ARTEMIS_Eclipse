import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Upload, X } from "lucide-react";
import { z } from "zod";
import BlogLayout from "@/components/dashboard/blog-layout";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useBlogPostById,
  useCreateBlogPost,
  useUpdateBlogPost,
  useCategories,
} from "@/hooks/use-blog";
import {
  generateSlug,
  calculateReadTime,
  uploadBlogImage,
  BlogPostStatus,
} from "@/lib/services/blog-service";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug must be less than 200 characters"),
  category: z.string().min(1, "Category is required").max(50, "Category must be less than 50 characters"),
  author: z.string().min(1, "Author is required").max(100, "Author must be less than 100 characters"),
  author_image: z.string().max(2048).nullable(),
  date: z.string().min(1, "Date is required"),
  read_time: z.string().min(1, "Read time is required"),
  image: z.string().min(1, "Featured image is required"),
  content: z.string().min(1, "Content is required"),
});

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { profile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authorImageInputRef = useRef<HTMLInputElement>(null);

  const { data: post, isLoading: postLoading } = useBlogPostById(id || "");
  const { data: categories = [] } = useCategories(true);
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [status, setStatus] = useState<BlogPostStatus>("draft");
  const [date, setDate] = useState("");
  const [readTime, setReadTime] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingAuthor, setIsUploadingAuthor] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditMode]);

  // Auto-calculate read time from content
  useEffect(() => {
    if (content) {
      setReadTime(calculateReadTime(content));
    }
  }, [content]);

  // Set default author + author image from profile
  useEffect(() => {
    if (!isEditMode && profile) {
      const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
      if (fullName) {
        setAuthor(fullName);
      }
      if (profile.avatar_url) {
        setAuthorImage((current) => current || profile.avatar_url || "");
      }
    }
  }, [profile, isEditMode]);

  // Set default date
  useEffect(() => {
    if (!isEditMode) {
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setDate(today);
    }
  }, [isEditMode]);

  // Load post data in edit mode
  useEffect(() => {
    if (isEditMode && post) {
      setTitle(post.title);
      setSlug(post.slug);
      setCategory(post.category);
      setAuthor(post.author);
      setAuthorImage(post.author_image || "");
      setStatus(post.status);
      setDate(post.date);
      setReadTime(post.read_time);
      setImage(post.image);
      setContent(post.content || "");
    }
  }, [post, isEditMode]);

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return false;
    }
    return true;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setIsUploading(true);
    try {
      const publicUrl = await uploadBlogImage(file, "posts");
      setImage(publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAuthorImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setIsUploadingAuthor(true);
    try {
      const publicUrl = await uploadBlogImage(file, "authors");
      setAuthorImage(publicUrl);
      toast.success("Author image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload author image");
    } finally {
      setIsUploadingAuthor(false);
      if (authorImageInputRef.current) authorImageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (nextStatus: BlogPostStatus) => {
    // Resolve category: if user chose "+ Add new category", require a custom value
    const resolvedCategory =
      category === "__custom__" ? customCategory.trim() : category;

    const formData = {
      title,
      slug,
      category: resolvedCategory,
      author,
      author_image: authorImage.trim() || null,
      date,
      read_time: readTime,
      image,
      content,
    };

    const result = blogPostSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the form errors");
      return;
    }

    setErrors({});

    try {
      const postData = {
        title: result.data.title,
        slug: result.data.slug,
        category: result.data.category,
        author: result.data.author,
        author_image: result.data.author_image,
        status: nextStatus,
        date: result.data.date,
        read_time: result.data.read_time,
        image: result.data.image,
        content: result.data.content,
      };

      if (isEditMode && id) {
        await updatePost.mutateAsync({ id, data: postData });
        toast.success(
          nextStatus === "published" ? "Post published" : "Draft saved"
        );
      } else {
        await createPost.mutateAsync(postData);
        toast.success(
          nextStatus === "published" ? "Post published" : "Draft saved"
        );
      }
      setStatus(nextStatus);
      navigate("/dashboard/blog");
    } catch (error: any) {
      toast.error(error.message || "Failed to save post");
    }
  };

  const isSaving = createPost.isPending || updatePost.isPending;

  const breadcrumbs = [
    { label: "Dashboard", to: "/dashboard/blog" },
    { label: "Blog", to: "/dashboard/blog" },
    { label: isEditMode ? "Edit post" : "New post" },
  ];

  if (isEditMode && postLoading) {
    return (
      <BlogLayout breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </BlogLayout>
    );
  }

  if (isEditMode && !post && !postLoading) {
    return (
      <BlogLayout breadcrumbs={breadcrumbs}>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">The post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/dashboard/blog")}>Back to Posts</Button>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout breadcrumbs={breadcrumbs}>
      <Helmet>
        <title>{isEditMode ? "Edit Post" : "Create Post"} | Revio</title>
      </Helmet>

      <div className="max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {isEditMode ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isEditMode ? `Editing: ${post?.title}` : "Write a new blog post"}
          </p>
        </div>

        {/* Basic Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="bg-foreground border-white/10 h-12 text-white"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-white">
              Slug
            </Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug"
              className="bg-foreground border-white/10 h-12 text-white"
            />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
            <p className="text-xs text-muted-foreground">
              URL: /blog/{slug || "your-slug"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value !== "__custom__") {
                    setCustomCategory("");
                  }
                }}
                className="w-full h-12 px-3 rounded-[10px] bg-foreground border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__custom__">+ Add new category</option>
              </select>
              {category === "__custom__" && (
                <Input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter new category"
                  className="bg-foreground border-white/10 h-12 text-white mt-2"
                />
              )}
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-white">
                Status
              </Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                className="w-full h-12 px-3 rounded-[10px] bg-foreground border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="draft">Draft — hidden from the site</option>
                <option value="published">Published — live on the site</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="author" className="text-white">
                Author
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className="bg-foreground border-white/10 h-12 text-white"
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-white">Author Image</Label>
              <div className="flex items-center gap-3">
                {authorImage ? (
                  <div className="relative">
                    <img
                      src={authorImage}
                      alt="Author"
                      className="h-12 w-12 rounded-full object-cover border border-white/10"
                    />
                    <button
                      type="button"
                      aria-label="Remove author image"
                      onClick={() => setAuthorImage("")}
                      className="absolute -top-1 -right-1 p-0.5 rounded-full bg-black/70 text-white hover:bg-black"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full border border-dashed border-white/15 bg-foreground/30" />
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => authorImageInputRef.current?.click()}
                  disabled={isUploadingAuthor}
                  className="h-11 border-white/10 text-white hover:bg-white/5"
                >
                  {isUploadingAuthor ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {authorImage ? "Replace" : "Upload"}
                    </>
                  )}
                </Button>
                <input
                  ref={authorImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAuthorImageUpload}
                  className="hidden"
                />
              </div>
              <Input
                value={authorImage}
                onChange={(e) => setAuthorImage(e.target.value)}
                placeholder="or paste an image URL"
                className="bg-foreground border-white/10 h-10 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">
                Date
              </Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Jan 1, 2024"
                className="bg-foreground border-white/10 h-12 text-white"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime" className="text-white">
                Read Time
              </Label>
              <Input
                id="readTime"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="bg-foreground border-white/10 h-12 text-white"
              />
              {errors.read_time && <p className="text-red-500 text-sm">{errors.read_time}</p>}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="space-y-4">
          <Label className="text-white">Featured Image</Label>
          <div className="flex flex-col gap-4">
            {image ? (
              <div className="relative inline-block w-fit">
                <img
                  src={image}
                  alt="Featured"
                  className="max-w-md rounded-xl border border-white/10"
                />
                <button
                  type="button"
                  aria-label="Remove featured image"
                  onClick={() => setImage("")}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-full max-w-md h-48 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 cursor-pointer transition-colors bg-foreground/30"
              >
                {isUploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm">Click to upload image</p>
                    <p className="text-muted-foreground text-xs mt-1">Max 5MB</p>
                  </>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-wrap items-center gap-2">
              {image && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="h-10 border-white/10 text-white hover:bg-white/5"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : "Replace image"}
                </Button>
              )}
              <span className="text-muted-foreground text-sm">or</span>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
                className="bg-foreground border-white/10 h-10 text-white flex-1 max-w-md"
              />
            </div>
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-4">
          <Label className="text-white">Content</Label>
          <RichTextEditor content={content} onChange={setContent} />
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-4 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/blog")}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit("draft")}
            disabled={isSaving}
            className="border-white/10 text-white hover:bg-white/5 min-w-[120px]"
          >
            {isSaving ? "Saving..." : "Save draft"}
          </Button>
          <Button
            onClick={() => handleSubmit("published")}
            disabled={isSaving}
            className="min-w-[120px]"
          >
            {isSaving
              ? "Saving..."
              : isEditMode && post?.status === "published"
              ? "Update & publish"
              : "Publish"}
          </Button>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogEditor;
