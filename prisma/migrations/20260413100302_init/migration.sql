-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "priceNumber" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "rating" DOUBLE PRECISION,
    "reviews" INTEGER,
    "sold" TEXT,
    "skinCondition" TEXT[],
    "highlight" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
