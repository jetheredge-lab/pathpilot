-- CreateTable
CREATE TABLE "course_entries" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Other',
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'regular',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_entries_studentId_idx" ON "course_entries"("studentId");

-- AddForeignKey
ALTER TABLE "course_entries" ADD CONSTRAINT "course_entries_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

