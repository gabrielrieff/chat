/*
  Warnings:

  - Added the required column `userOwnId` to the `connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connections" ADD COLUMN     "userOwnId" TEXT NOT NULL;
