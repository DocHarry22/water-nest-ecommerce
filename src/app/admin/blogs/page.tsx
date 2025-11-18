"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  ArrowLeft,
  Save,
  X,
  FileText
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminBlogsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [authors, setAuthors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    authorId: "",
    published: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/admin/blogs");
      return;
    }

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "STAFF") {
      router.push("/");
      return;
    }

    fetchBlogs();
    fetchAuthors();
  }, [session, status, router]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAuthorName = (authorId: string | null) => {
    if (!authorId) return 'Unknown';
    const author = authors.find(a => a.id === authorId);
    return author?.name || 'Unknown';
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        // Only show ADMIN and STAFF users as potential authors
        setAuthors(data.filter((u: User) => u.role === "ADMIN" || u.role === "STAFF"));
      }
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogData = {
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      content: formData.content,
      excerpt: formData.excerpt,
      authorId: formData.authorId,
      published: formData.published,
    };

    try {
      const url = editingBlog 
        ? `/api/admin/blogs/${editingBlog.id}` 
        : "/api/admin/blogs";
      
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        await fetchBlogs();
        resetForm();
        setShowAddModal(false);
        setEditingBlog(null);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchBlogs();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Failed to delete blog post");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      authorId: session?.user?.id || "",
      published: false,
    });
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      authorId: blog.authorId || "",
      published: blog.published,
    });
    setShowAddModal(true);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "STAFF") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                <p className="text-gray-600 mt-1">{blogs.length} total posts</p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setEditingBlog(null);
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              New Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{blog.title}</h3>
                    <p className="text-sm text-gray-600">by {getAuthorName(blog.authorId)}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    blog.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>{blog.slug}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-2 text-sm text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredBlogs.length === 0 && (
            <div className="col-span-full text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No blog posts found</p>
              <p className="text-sm text-gray-500 mt-1">Create your first blog post to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingBlog(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Post Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Enter a compelling title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Brief summary of the post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  required
                  rows={12}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-gray-900"
                  placeholder="Write your blog post content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <select
                  required
                  value={formData.authorId}
                  onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name} ({author.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="published" className="text-sm text-gray-700">
                  Publish this post immediately
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  {editingBlog ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingBlog(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
