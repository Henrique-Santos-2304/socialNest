/*
  Warnings:

  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropIndex
DROP INDEX "Image_userId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_user_id_key" ON "Image"("user_id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
