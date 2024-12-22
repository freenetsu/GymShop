/*
  Warnings:

  - Added the required column `userId` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
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
INSERT INTO "new_carts" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "carts";
DROP TABLE "carts";
ALTER TABLE "new_carts" RENAME TO "carts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
