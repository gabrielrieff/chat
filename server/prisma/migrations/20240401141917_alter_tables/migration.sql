/*
  Warnings:

  - You are about to drop the column `isUser` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `userOwnId` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `userOne` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `userTwo` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `connectionId` on the `messeges` table. All the data in the column will be lost.
  - Added the required column `id_user_contact` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_user` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_one` to the `conversations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_two` to the `conversations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `messeges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messeges" DROP CONSTRAINT "messeges_connectionId_fkey";

-- AlterTable
ALTER TABLE "connections" DROP COLUMN "isUser",
DROP COLUMN "userOwnId",
ADD COLUMN     "id_user_contact" TEXT NOT NULL,
ADD COLUMN     "is_user" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "userOne",
DROP COLUMN "userTwo",
ADD COLUMN     "id_user_one" TEXT NOT NULL,
ADD COLUMN     "id_user_two" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "messeges" DROP COLUMN "connectionId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_id_user_contact_fkey" FOREIGN KEY ("id_user_contact") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_id_user_one_fkey" FOREIGN KEY ("id_user_one") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_id_user_two_fkey" FOREIGN KEY ("id_user_two") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messeges" ADD CONSTRAINT "messeges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
