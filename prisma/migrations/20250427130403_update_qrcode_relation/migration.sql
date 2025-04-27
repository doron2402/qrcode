-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "zipCode" TEXT,
    "state" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qrcodes" (
    "type" VARCHAR(64) NOT NULL,
    "id" TEXT NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "backgroundColor" VARCHAR(255) NOT NULL,

    CONSTRAINT "qrcodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qrpage" (
    "slug" TEXT NOT NULL,
    "qrcodeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "qrpage_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "checkout" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "billingAddress" JSONB NOT NULL,
    "amountInCents" INTEGER NOT NULL,
    "stripeID" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qrpage_slug_key" ON "qrpage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "qrpage_qrcodeId_key" ON "qrpage"("qrcodeId");

-- AddForeignKey
ALTER TABLE "qrpage" ADD CONSTRAINT "qrpage_qrcodeId_fkey" FOREIGN KEY ("qrcodeId") REFERENCES "qrcodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
