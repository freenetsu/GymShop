/*
  Warnings:

  - You are about to drop the column `userId` on the `carts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_carts" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "carts";
DROP TABLE "carts";
ALTER TABLE "new_carts" RENAME TO "carts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
