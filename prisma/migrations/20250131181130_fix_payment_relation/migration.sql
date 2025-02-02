/*
  Warnings:

  - You are about to drop the column `isDefault` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayCustomerId` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `PaymentMethod` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentMethodId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentMethodId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "isDefault",
DROP COLUMN "provider",
DROP COLUMN "razorpayCustomerId",
DROP COLUMN "type",
ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "razorpaySignature" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentMethodId_key" ON "Order"("paymentMethodId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
