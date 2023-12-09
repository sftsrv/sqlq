/*
  Warnings:

  - You are about to drop the column `editable` on the `Connection` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Connection" (
    "alias" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "connectionString" TEXT NOT NULL,
    "driver" TEXT NOT NULL
);
INSERT INTO "new_Connection" ("alias", "connectionString", "created", "description", "driver", "updated") SELECT "alias", "connectionString", "created", "description", "driver", "updated" FROM "Connection";
DROP TABLE "Connection";
ALTER TABLE "new_Connection" RENAME TO "Connection";
CREATE UNIQUE INDEX "Connection_alias_key" ON "Connection"("alias");
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL DEFAULT 1,
    "query" TEXT NOT NULL,
    "connectionAlias" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    CONSTRAINT "History_connectionAlias_fkey" FOREIGN KEY ("connectionAlias") REFERENCES "Connection" ("alias") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_History" ("connectionAlias", "count", "created", "id", "lastUsed", "query", "success") SELECT "connectionAlias", "count", "created", "id", "lastUsed", "query", "success" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
CREATE UNIQUE INDEX "History_query_connectionAlias_key" ON "History"("query", "connectionAlias");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
