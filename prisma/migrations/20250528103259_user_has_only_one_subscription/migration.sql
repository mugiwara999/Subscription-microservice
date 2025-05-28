/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "features" SET NOT NULL,
ALTER COLUMN "features" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_id_key" ON "Subscription"("user_id");
