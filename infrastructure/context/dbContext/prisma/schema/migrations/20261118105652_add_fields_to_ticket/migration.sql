/*
  Warnings:

  - Added the required column `title` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "answer" JSONB,
ADD COLUMN     "title" TEXT NOT NULL;
