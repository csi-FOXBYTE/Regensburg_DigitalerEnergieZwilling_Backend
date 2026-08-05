-- DropForeignKey
ALTER TABLE "SubmissionChangeHistoryEntry" DROP CONSTRAINT "SubmissionChangeHistoryEntry_submissionId_fkey";

-- AddForeignKey
ALTER TABLE "SubmissionChangeHistoryEntry" ADD CONSTRAINT "SubmissionChangeHistoryEntry_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
