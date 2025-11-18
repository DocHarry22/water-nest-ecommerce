-- AlterTable
ALTER TABLE "products" ADD COLUMN     "additionalImages" TEXT[],
ADD COLUMN     "mainImage" TEXT,
ADD COLUMN     "manualPdfUrl" TEXT,
ADD COLUMN     "msdsPdfUrl" TEXT;
