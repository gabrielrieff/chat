/*
  Warnings:

  - You are about to drop the column `userID` on the `conversations` table. All the data in the column will be lost.
  - Added the required column `userOne` to the `conversations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTwo` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "userID",
ADD COLUMN     "userOne" TEXT NOT NULL,
ADD COLUMN     "userTwo" TEXT NOT NULL;
