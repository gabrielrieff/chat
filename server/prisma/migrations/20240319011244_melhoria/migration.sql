-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_conversationId_fkey";

-- AlterTable
ALTER TABLE "connections" ALTER COLUMN "conversationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
