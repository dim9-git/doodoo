-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL DEFAULT 0,
    "secretHash" BYTEA NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
