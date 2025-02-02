/*
  Warnings:

  - You are about to drop the column `accountNumber` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `PaymentMethod` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "razorpaySignature" TEXT,
ALTER COLUMN "status" SET DEFAULT 'INITIATED';

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "accountNumber",
DROP COLUMN "expiryDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "razorpayCustomerId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
