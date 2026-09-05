/*
  Warnings:

  - Added the required column `sortOrder` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Backfill sortOrder from the numeric product id so existing rows keep
-- catalog order (id is a String, so it can't be ORDERed BY numerically).
UPDATE "Product" SET "sortOrder" = "id"::integer;
