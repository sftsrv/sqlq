-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL DEFAULT 0,
    "query" TEXT NOT NULL,
    "connectionAlias" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    CONSTRAINT "History_connectionAlias_fkey" FOREIGN KEY ("connectionAlias") REFERENCES "Connection" ("alias") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("connectionAlias", "created", "id", "lastUsed", "query", "success") SELECT "connectionAlias", "created", "id", "lastUsed", "query", "success" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
