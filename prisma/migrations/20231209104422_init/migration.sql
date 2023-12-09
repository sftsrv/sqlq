-- CreateTable
CREATE TABLE "Connection" (
    "alias" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editable" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "connectionString" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "query" TEXT NOT NULL,
    "connectionAlias" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    CONSTRAINT "History_connectionAlias_fkey" FOREIGN KEY ("connectionAlias") REFERENCES "Connection" ("alias") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Connection_alias_key" ON "Connection"("alias");
