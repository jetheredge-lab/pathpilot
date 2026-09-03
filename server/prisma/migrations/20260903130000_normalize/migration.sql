-- DropForeignKey
ALTER TABLE "app_states" DROP CONSTRAINT "app_states_userId_fkey";

-- DropTable
DROP TABLE "app_states";

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL DEFAULT '',
    "gradYear" INTEGER NOT NULL DEFAULT 2028,
    "currentGrade" TEXT NOT NULL DEFAULT '11th (Junior)',
    "highSchool" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "unweightedGpa" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weightedGpa" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "satScore" INTEGER,
    "actScore" INTEGER,
    "targetSatScore" INTEGER,
    "psatScore" INTEGER,
    "apIbCoursesCount" INTEGER NOT NULL DEFAULT 0,
    "apCourses" JSONB NOT NULL DEFAULT '[]',
    "careerGoal" TEXT NOT NULL DEFAULT 'undecided',
    "intendedMajors" JSONB NOT NULL DEFAULT '[]',
    "clinicalHours" INTEGER NOT NULL DEFAULT 0,
    "communityServiceHours" INTEGER NOT NULL DEFAULT 0,
    "extracurriculars" JSONB NOT NULL DEFAULT '[]',
    "awards" JSONB NOT NULL DEFAULT '[]',
    "targetCollegeCount" INTEGER NOT NULL DEFAULT 5,
    "budgetPerYear" INTEGER,
    "preferredRegions" JSONB NOT NULL DEFAULT '[]',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_colleges" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_five_items" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL DEFAULT 'EA',
    "status" TEXT NOT NULL DEFAULT 'researching',
    "category" TEXT NOT NULL DEFAULT 'Target',
    "checklist" JSONB NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "targetMajor" TEXT NOT NULL DEFAULT '',
    "portalUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "final_five_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_tasks" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "targetMonth" TEXT NOT NULL,
    "gradeLevel" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "actionItems" JSONB NOT NULL DEFAULT '[]',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TEXT,
    "associatedCollegeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "essay_drafts" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "promptText" TEXT NOT NULL DEFAULT '',
    "associatedCollegeId" TEXT,
    "targetWordCount" INTEGER NOT NULL DEFAULT 650,
    "currentDraft" TEXT NOT NULL DEFAULT '',
    "outline" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'brainstorming',
    "lastEdited" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "essay_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus_visits" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL DEFAULT '',
    "visitDate" TEXT NOT NULL DEFAULT '',
    "overallRating" INTEGER NOT NULL DEFAULT 0,
    "ratings" JSONB NOT NULL,
    "pros" JSONB NOT NULL DEFAULT '[]',
    "cons" JSONB NOT NULL DEFAULT '[]',
    "notes" TEXT NOT NULL DEFAULT '',
    "talkedToCurrentStudents" BOOLEAN NOT NULL DEFAULT false,
    "visitedSimulationLabOrHospital" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campus_visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "students_userId_idx" ON "students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "saved_colleges_studentId_collegeId_key" ON "saved_colleges"("studentId", "collegeId");

-- CreateIndex
CREATE UNIQUE INDEX "final_five_items_studentId_collegeId_key" ON "final_five_items"("studentId", "collegeId");

-- CreateIndex
CREATE INDEX "timeline_tasks_studentId_idx" ON "timeline_tasks"("studentId");

-- CreateIndex
CREATE INDEX "essay_drafts_studentId_idx" ON "essay_drafts"("studentId");

-- CreateIndex
CREATE INDEX "campus_visits_studentId_idx" ON "campus_visits"("studentId");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_colleges" ADD CONSTRAINT "saved_colleges_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_five_items" ADD CONSTRAINT "final_five_items_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_tasks" ADD CONSTRAINT "timeline_tasks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_drafts" ADD CONSTRAINT "essay_drafts_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_visits" ADD CONSTRAINT "campus_visits_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

