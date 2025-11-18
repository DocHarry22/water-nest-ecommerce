"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FileUpload from "@/components/admin/FileUpload";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  ArrowLeft,
  Save,
  X
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  images: string[];
  mainImage?: string;
  additionalImages?: string[];
  manualPdfUrl?: string;
  msdsPdfUrl?: string;
  published: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    images: [""],
    mainImage: "",
    additionalImages: [] as string[],
    manualPdfUrl: "",
    msdsPdfUrl: "",
    published: true,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/admin/products");
      return;
    }

    if (session?.user?.role !== "ADMIN") {
      router.push("/");
      return;
    }

    fetchProducts();
    fetchCategories();
  }, [session, status, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?limit=100");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoryId: formData.categoryId,
      images: formData.images.filter(img => img !== ""),
      mainImage: formData.mainImage || undefined,
      additionalImages: formData.additionalImages,
      manualPdfUrl: formData.manualPdfUrl || undefined,
      msdsPdfUrl: formData.msdsPdfUrl || undefined,
      published: formData.published,
    };

    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}` 
        : "/api/admin/products";
      
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await fetchProducts();
        resetForm();
        setShowAddModal(false);
        setEditingProduct(null);
      } else {
        const error = await response.json();
        console.error("API Error:", error);
        alert(`Failed to save product: ${error.error || 'Unknown error'}\n${error.details ? JSON.stringify(error.details) : ''}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProducts();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      images: [""],
      mainImage: "",
      additionalImages: [],
      manualPdfUrl: "",
      msdsPdfUrl: "",
      published: true,
    });
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      categoryId: product.categoryId,
      images: product.images.length > 0 ? product.images : [""],
      mainImage: product.mainImage || "",
      additionalImages: product.additionalImages || [],
      manualPdfUrl: product.manualPdfUrl || "",
      msdsPdfUrl: product.msdsPdfUrl || "",
      published: product.published,
    });
    setShowAddModal(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
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
                <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600 mt-1">{products.length} total products</p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setEditingProduct(null);
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Product
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category.name}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">R{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`${product.stock < 10 ? 'text-red-600' : 'text-gray-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
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
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (R) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload Sections */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
                
                <FileUpload
                  type="image"
                  label="Main Product Image"
                  currentFile={formData.mainImage}
                  onUploadComplete={(url) => setFormData({ ...formData, mainImage: url })}
                  onRemove={() => setFormData({ ...formData, mainImage: "" })}
                />
              </div>

              <div>
                <FileUpload
                  type="image"
                  label="Additional Images"
                  multiple
                  currentFile={formData.additionalImages.length > 0 ? formData.additionalImages[0] : undefined}
                  onUploadComplete={(url) => {
                    setFormData({ 
                      ...formData, 
                      additionalImages: [...formData.additionalImages, url] 
                    });
                  }}
                  onRemove={() => {
                    const newImages = [...formData.additionalImages];
                    newImages.shift();
                    setFormData({ ...formData, additionalImages: newImages });
                  }}
                />
                
                {/* Display additional uploaded images */}
                {formData.additionalImages.length > 1 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {formData.additionalImages.slice(1).map((img, idx) => (
                      <div key={idx} className="relative group">
                        <Image 
                          src={img} 
                          alt={`Additional ${idx + 2}`}
                          width={100}
                          height={100}
                          className="rounded border border-gray-200 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.additionalImages.filter((_, i) => i !== idx + 1);
                            setFormData({ ...formData, additionalImages: newImages });
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PDF Upload Sections */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Documentation</h3>
                
                <FileUpload
                  type="pdf"
                  label="Product Manual (PDF)"
                  currentFile={formData.manualPdfUrl}
                  onUploadComplete={(url) => setFormData({ ...formData, manualPdfUrl: url })}
                  onRemove={() => setFormData({ ...formData, manualPdfUrl: "" })}
                />
              </div>

              <div>
                <FileUpload
                  type="pdf"
                  label="MSDS / Safety Data Sheet (PDF)"
                  currentFile={formData.msdsPdfUrl}
                  onUploadComplete={(url) => setFormData({ ...formData, msdsPdfUrl: url })}
                  onRemove={() => setFormData({ ...formData, msdsPdfUrl: "" })}
                />
              </div>

              {/* Legacy Image URL Field (for backward compatibility) */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Legacy Image URL (Optional)
                  <span className="text-xs text-gray-500 ml-2">Use file upload above instead</span>
                </label>
                <input
                  type="url"
                  value={formData.images[0]}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
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
                  Publish this product
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
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
