import { useUser } from "../../contexts/user/useUser";
import { isExpired } from "../../lib/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import Empty from "../../ui/Empty";
import SpinnerMini from "../../ui/SpinnerMini";
import HomeworkSubmissionsList from "./HomeworkSubmissionsList";
import HomeworkSubmitStatus from "./HomeworkSubmitStatus";
import { useHomework } from "./useHomework";

interface HomeworkContentProps {
  homeworkId: number;
}

function HomeworkContent({ homeworkId }: HomeworkContentProps) {
  const { homework, isLoading } = useHomework(homeworkId);
  const { user } = useUser();

  if (isLoading) return <SpinnerMini size="lg" />;

  if (!homework) return <Empty resourceName="Завдання" />;

  function submitToShow() {
    if (user) {
      const { role } = user;
      if (!homework) return null;
      if (role === "student")
        return <HomeworkSubmitStatus homework={homework} />;
      if (role === "teacher" || role === "admin") {
        const { groups } = homework ?? [];
        if (!groups || groups.length === 0) return null;
        return <HomeworkSubmissionsList groups={groups} />;
      }
      return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{homework.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          Опис: <span>{homework.description}</span>
        </div>
        <div>
          Здати до:{" "}
          <span
            className={
              isExpired(homework.due_date) ? "text-destructive" : "text-primary"
            }
          >
            {homework.due_date}
          </span>
        </div>
        <div>{submitToShow()}</div>
      </CardContent>
    </Card>
  );
}

export default HomeworkContent;
