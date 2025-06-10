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

interface HomeworkSubmissionStatusProps {
  submission?: HomeworkSubmitStatus;
  honework: HomeworkDetailed;
  student: HomeworkStudent;
}

function HomeworkSubmissionStatus({
  submission,
  honework,
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
            {submission?.homework ? submission?.homework : honework.title}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default HomeworkSubmissionStatus;
