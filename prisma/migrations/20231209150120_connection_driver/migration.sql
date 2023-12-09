/*
  Warnings:

  - Added the required column `driver` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Connection" (
    "alias" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editable" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "connectionString" TEXT NOT NULL,
    "driver" TEXT NOT NULL
);
INSERT INTO "new_Connection" ("alias", "connectionString", "created", "description", "editable", "updated") SELECT "alias", "connectionString", "created", "description", "editable", "updated" FROM "Connection";
DROP TABLE "Connection";
ALTER TABLE "new_Connection" RENAME TO "Connection";
CREATE UNIQUE INDEX "Connection_alias_key" ON "Connection"("alias");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
