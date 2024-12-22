/*
  Warnings:

  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cart_items";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CartToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CartToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CartToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_carts" ("createdAt", "id", "userId") SELECT "createdAt", "id", "userId" FROM "carts";
DROP TABLE "carts";
ALTER TABLE "new_carts" RENAME TO "carts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CartToProduct_AB_unique" ON "_CartToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToProduct_B_index" ON "_CartToProduct"("B");
