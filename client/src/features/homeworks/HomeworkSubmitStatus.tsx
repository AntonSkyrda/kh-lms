import { cn } from "../../lib/utils/cn";
import type { HomeworkDetailed } from "../../schemas/homeworksSchema";
import { buttonVariants } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import SpinnerMini from "../../ui/SpinnerMini";
import SubmitHomework from "./SubmitHomework";
import { useHomeworkStatus } from "./hooks/useHomeworkStatus";

interface HomeworkSubmitStatusProps {
  homework: HomeworkDetailed;
}

function HomeworkSubmitStatus({ homework }: HomeworkSubmitStatusProps) {
  const { homeworkStatus, isLoading } = useHomeworkStatus(homework.id);

  if (isLoading) return <SpinnerMini size="lg" />;

  if (!homework.submitted) return <SubmitHomework homeworkId={homework.id} />;

  if (!homeworkStatus) return null;

  return (
    <div className="space-y-3">
      <p>Ви успішно надіслали відповідь на завдання.</p>
      <Dialog>
        <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
          Переглянути деталі
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Деталі вашого завдання "{homework.title}"</DialogTitle>
            <DialogDescription>{homework.description}</DialogDescription>
          </DialogHeader>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Відповідь</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>{homeworkStatus.answer}</div>
                <div className="flex flex-row items-baseline gap-3">
                  <p>Оцінка:</p>
                  <em>
                    {homeworkStatus.grade ? homeworkStatus.grade : "Ще немає"}
                  </em>
                </div>
                <div className="flex flex-row items-baseline gap-3">
                  <p>Відповідь викладача:</p>
                  <span>
                    {homeworkStatus.feedback
                      ? homeworkStatus.feedback
                      : "Ще немає"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HomeworkSubmitStatus;
