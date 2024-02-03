/*
  Warnings:

  - Added the required column `image_url` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" ADD COLUMN     "image_url" TEXT NOT NULL;
