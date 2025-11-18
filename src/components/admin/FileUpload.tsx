"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { X, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  type: "image" | "pdf";
  accept?: string;
  maxSize?: number; // in bytes
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  currentFile?: string;
  label: string;
  multiple?: boolean;
}

export default function FileUpload({
  type,
  accept,
  maxSize = type === "image" ? 10 * 1024 * 1024 : 20 * 1024 * 1024,
  onUploadComplete,
  onRemove,
  currentFile,
  label,
  multiple = false,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultAccept = type === "image" 
    ? "image/jpeg,image/jpg,image/png,image/webp,image/gif"
    : "application/pdf";

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    await uploadFile(files[0]);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      // Validate file size
      if (file.size > maxSize) {
        throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      }

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      // Upload to API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (!currentFile || !onRemove) return;

    try {
      // Call API to delete file
      await fetch(`/api/upload?url=${encodeURIComponent(currentFile)}`, {
        method: "DELETE",
      });
      
      onRemove();
    } catch (err) {
      console.error("Error removing file:", err);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {currentFile ? (
        <div className="relative border-2 border-gray-300 rounded-lg p-4">
          {type === "image" ? (
            <div className="relative w-full h-48">
              <Image
                src={currentFile}
                alt="Uploaded"
                fill
                className="object-contain rounded"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded">
              <FileText className="w-8 h-8 text-red-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {currentFile.split("/").pop()}
                </p>
                <p className="text-xs text-gray-500">PDF Document</p>
              </div>
            </div>
          )}
          
          {onRemove && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
            ${uploading ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept || defaultAccept}
            onChange={handleFileChange}
            className="hidden"
            multiple={multiple}
            disabled={uploading}
          />

          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            ) : type === "image" ? (
              <ImageIcon className="w-12 h-12 text-gray-400" />
            ) : (
              <FileText className="w-12 h-12 text-gray-400" />
            )}

            <div>
              <p className="text-sm font-medium text-gray-700">
                {uploading ? "Uploading..." : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {type === "image" 
                  ? "PNG, JPG, WebP or GIF (max. 10MB)"
                  : "PDF (max. 20MB)"}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
