-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tool" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" DATETIME,
    "query" TEXT NOT NULL,
    "description" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Tool" ("count", "created", "description", "lastUsed", "name", "query") SELECT "count", "created", "description", "lastUsed", "name", "query" FROM "Tool";
DROP TABLE "Tool";
ALTER TABLE "new_Tool" RENAME TO "Tool";
CREATE UNIQUE INDEX "Tool_name_key" ON "Tool"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
