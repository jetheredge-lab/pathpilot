-- CreateTable
CREATE TABLE "award_letters" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "collegeId" TEXT,
    "collegeName" TEXT NOT NULL DEFAULT '',
    "academicYear" TEXT NOT NULL DEFAULT '',
    "tuitionAndFees" INTEGER NOT NULL DEFAULT 0,
    "housingAndMeals" INTEGER NOT NULL DEFAULT 0,
    "booksAndSupplies" INTEGER NOT NULL DEFAULT 0,
    "transportation" INTEGER NOT NULL DEFAULT 0,
    "personalExpenses" INTEGER NOT NULL DEFAULT 0,
    "grants" JSONB NOT NULL DEFAULT '[]',
    "workStudy" INTEGER NOT NULL DEFAULT 0,
    "loanSubsidized" INTEGER NOT NULL DEFAULT 0,
    "loanUnsubsidized" INTEGER NOT NULL DEFAULT 0,
    "loanParentPlus" INTEGER NOT NULL DEFAULT 0,
    "loanOther" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "award_letters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "award_letters_studentId_idx" ON "award_letters"("studentId");

-- AddForeignKey
ALTER TABLE "award_letters" ADD CONSTRAINT "award_letters_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

