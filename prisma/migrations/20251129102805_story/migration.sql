-- CreateTable
CREATE TABLE "Story" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "previewImageUrl" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryItem" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "storyId" INTEGER NOT NULL,
    "sourceUrl" TEXT NOT NULL,

    CONSTRAINT "StoryItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoryItem" ADD CONSTRAINT "StoryItem_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
