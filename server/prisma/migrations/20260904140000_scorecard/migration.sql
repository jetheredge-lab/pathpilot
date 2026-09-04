-- CreateTable
CREATE TABLE "college_financials" (
    "unitId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "college_financials_pkey" PRIMARY KEY ("unitId")
);

