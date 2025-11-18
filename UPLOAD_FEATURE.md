# Product File Upload Feature

## Overview
This feature allows administrators to upload images and PDF documents for products, including:
- **Main Product Image**: Primary product image displayed in listings
- **Additional Images**: Gallery images for product detail pages
- **Product Manual (PDF)**: Installation/usage guides
- **MSDS/Safety Data Sheet (PDF)**: Safety information

## Features

### File Upload Component (`FileUpload.tsx`)
- ✅ Drag-and-drop support
- ✅ Click to browse functionality
- ✅ File type validation (images: JPG, PNG, WebP, GIF | PDFs)
- ✅ File size limits (10MB for images, 20MB for PDFs)
- ✅ Image preview before upload
- ✅ PDF document preview with icon
- ✅ Upload progress indication
- ✅ Remove uploaded files
- ✅ Error handling and user feedback

### Upload API (`/api/upload`)
- **Endpoint**: `/api/upload`
- **Methods**: POST (upload), DELETE (remove)
- **Authentication**: Admin only
- **Features**:
  - File sanitization (removes special characters)
  - Unique filename generation (timestamp + random)
  - Type validation
  - Size validation
  - Automatic directory creation
  - Returns public URL for database storage

### File Storage
- **Location**: `public/uploads/products/`
  - Images: `public/uploads/products/images/`
  - Documents: `public/uploads/products/documents/`
- **Naming**: `{sanitized-name}-{timestamp}-{random}.{ext}`
- **Access**: Public URLs starting with `/uploads/products/`

## Database Schema Updates

```prisma
model Product {
  // ... existing fields
  
  // Legacy images array (backward compatible)
  images          String[]
  
  // New structured image fields
  mainImage       String?
  additionalImages String[]
  
  // Product documentation
  manualPdfUrl    String?
  msdsPdfUrl      String?
  
  // ... other fields
}
```

## Usage

### Admin Product Form
1. Navigate to `/admin/products`
2. Click "Add Product" or edit existing product
3. Scroll to file upload sections:

#### Main Product Image
- Upload primary product image
- Recommended: Square aspect ratio, min 800x800px
- Max size: 10MB
- Formats: JPG, PNG, WebP, GIF

#### Additional Images
- Upload multiple gallery images
- Can remove individual images
- Displayed on product detail pages
- Same requirements as main image

#### Product Manual (PDF)
- Upload installation/usage guides
- Max size: 20MB
- Format: PDF only
- Downloadable from product page

#### MSDS/Safety Data Sheet (PDF)
- Upload safety information
- Max size: 20MB
- Format: PDF only
- Required for chemicals and regulated products

### API Integration

#### Upload File
```typescript
const formData = new FormData();
formData.append("file", file);
formData.append("type", "image"); // or "pdf"

const response = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});

const data = await response.json();
// data.url = "/uploads/products/images/product-name-1234567890-123.jpg"
```

#### Delete File
```typescript
await fetch(`/api/upload?url=${encodeURIComponent(fileUrl)}`, {
  method: "DELETE",
});
```

## File Size Limits

| File Type | Max Size | Formats |
|-----------|----------|---------|
| Images | 10MB | JPG, PNG, WebP, GIF |
| PDFs | 20MB | PDF |

## Security

- ✅ Admin authentication required
- ✅ File type validation (MIME type check)
- ✅ File size validation
- ✅ Filename sanitization (removes malicious characters)
- ✅ Path traversal protection
- ✅ Upload directory isolation

## Error Handling

### Common Errors
1. **"Unauthorized"**: User not logged in as admin
2. **"Invalid file type"**: Wrong file format uploaded
3. **"File too large"**: Exceeds size limit
4. **"Upload failed"**: Network or server error

### Client-side Validation
- File type checked before upload
- File size checked before upload
- User-friendly error messages

## Future Enhancements

### Planned Features
- [ ] Cloud storage integration (Cloudinary, AWS S3)
- [ ] Image optimization and compression
- [ ] Automatic thumbnail generation
- [ ] Bulk upload capability
- [ ] Image cropping and editing
- [ ] CDN integration
- [ ] Video upload support

### Recommended Improvements
1. **Image Optimization**: Use `sharp` or `next/image` optimization
2. **Cloud Storage**: Move to Cloudinary or AWS S3 for better scalability
3. **Progressive Upload**: Show upload progress bar
4. **Image Validation**: Check dimensions and aspect ratio
5. **Virus Scanning**: Integrate ClamAV or similar for uploaded files

## Maintenance

### Clean Up Old Files
Create a scheduled task to remove orphaned files (files in `/uploads` but not in database):

```typescript
// Example cleanup script
const files = await fs.readdir('public/uploads/products/images');
const dbImages = await prisma.product.findMany({ 
  select: { mainImage: true, additionalImages: true } 
});

// Compare and delete orphaned files
```

### Storage Monitoring
- Monitor `public/uploads/` directory size
- Set up alerts for disk space
- Implement file retention policy

## Troubleshooting

### Upload Fails
1. Check file permissions on `public/uploads/` directory
2. Verify disk space available
3. Check network connection
4. Verify admin authentication

### Files Not Displaying
1. Check public URL is correct
2. Verify file exists in upload directory
3. Check file permissions
4. Clear browser cache

### Migration Issues
If Prisma migration fails:
```bash
npx prisma migrate reset
npx prisma migrate dev
npx prisma generate
```

## Migration Applied
- **Migration**: `20251116185247_add_product_file_uploads`
- **Date**: November 16, 2025
- **Changes**:
  - Added `mainImage` (String?)
  - Added `additionalImages` (String[])
  - Added `manualPdfUrl` (String?)
  - Added `msdsPdfUrl` (String?)

## Files Created/Modified

### New Files
- `src/app/api/upload/route.ts` - Upload API endpoint
- `src/components/admin/FileUpload.tsx` - Reusable upload component
- `public/uploads/products/images/.gitkeep` - Keep directory in git
- `public/uploads/products/documents/.gitkeep` - Keep directory in git
- `public/uploads/.gitignore` - Ignore uploaded files in git

### Modified Files
- `prisma/schema.prisma` - Added new Product fields
- `src/app/admin/products/page.tsx` - Added upload UI
- `src/app/api/admin/products/route.ts` - Updated schema validation
- `src/app/api/admin/products/[id]/route.ts` - Updated schema validation

## Environment Variables
No additional environment variables required for local file storage.

For cloud storage (future):
```env
# Cloudinary (example)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AWS S3 (example)
AWS_S3_BUCKET=your_bucket_name
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
```
