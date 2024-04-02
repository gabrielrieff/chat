-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_id_user_contact_fkey";

-- AlterTable
ALTER TABLE "connections" ALTER COLUMN "id_user_contact" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_id_user_contact_fkey" FOREIGN KEY ("id_user_contact") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
