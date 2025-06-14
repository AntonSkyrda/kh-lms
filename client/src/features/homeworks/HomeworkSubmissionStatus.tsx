import { EllipsisVerticalIcon } from "lucide-react";

import type {
  HomeworkDetailed,
  HomeworkStudent,
  HomeworkSubmitStatus,
} from "../../schemas/homeworksSchema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SubmissionForm from "./SubmissionForm";

interface HomeworkSubmissionStatusProps {
  submission?: HomeworkSubmitStatus;
  homework: HomeworkDetailed;
  student: HomeworkStudent;
  submissions?: HomeworkSubmitStatus[];
}

function HomeworkSubmissionStatus({
  submission,
  homework,
  student,
}: HomeworkSubmissionStatusProps) {
  if (!submission) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <EllipsisVerticalIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {submission?.student ? submission.student : student.full_name}
          </DialogTitle>
          <DialogDescription>
            {submission?.homework ? submission?.homework : homework.title}
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Відповідь</CardTitle>
          </CardHeader>
          <CardContent>
            {submission.answer ? (
              <div className="space-y-6">
                <p>{submission.answer}</p>
                <div className="flex flex-row gap-3">
                  <p>Здано:</p>
                  <span>{submission.submission_at}</span>
                </div>
                <SubmissionForm submission={submission} />
              </div>
            ) : (
              <p>
                Студент <em>{student.full_name}</em> ще не надав відповідь
              </p>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default HomeworkSubmissionStatus;
