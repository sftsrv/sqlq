-- CreateTable
CREATE TABLE "Connection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editable" BOOLEAN NOT NULL DEFAULT true,
    "alias" TEXT NOT NULL,
    "description" TEXT,
    "connectionString" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "query" TEXT NOT NULL,
    "connectionId" INTEGER NOT NULL,
    CONSTRAINT "History_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Connection_alias_key" ON "Connection"("alias");

INSERT INTO "Connection" ("editable", "alias", "description", "connectionString")
VALUES (false, "sqlq", "SQLQ Application DB", "file:./app.db")
