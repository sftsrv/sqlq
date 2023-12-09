/*
  Warnings:

  - You are about to drop the column `success` on the `Tool` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tool" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "query" TEXT NOT NULL,
    "description" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Tool" ("count", "created", "description", "lastUsed", "name", "query") SELECT "count", "created", "description", "lastUsed", "name", "query" FROM "Tool";
DROP TABLE "Tool";
ALTER TABLE "new_Tool" RENAME TO "Tool";
CREATE UNIQUE INDEX "Tool_name_key" ON "Tool"("name");
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL DEFAULT 1,
    "query" TEXT NOT NULL,
    "connectionAlias" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    CONSTRAINT "History_connectionAlias_fkey" FOREIGN KEY ("connectionAlias") REFERENCES "Connection" ("alias") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("connectionAlias", "count", "created", "id", "lastUsed", "query", "success") SELECT "connectionAlias", "count", "created", "id", "lastUsed", "query", "success" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
CREATE UNIQUE INDEX "History_query_connectionAlias_key" ON "History"("query", "connectionAlias");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
