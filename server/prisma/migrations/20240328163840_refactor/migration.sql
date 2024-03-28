/*
  Warnings:

  - Added the required column `connectionId` to the `messeges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messeges" ADD COLUMN     "connectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messeges" ADD CONSTRAINT "messeges_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
