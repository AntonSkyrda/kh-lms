import { useUser } from "../../contexts/user/useUser";
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
      if (role === "student")
        return <HomeworkSubmitStatus homeworkId={homeworkId} />;
      if (role === "teacher") return <HomeworkSubmissionsList />;
      return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{homework.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          Опис: <span>{homework.description}</span>
        </div>
        <div>
          Здати до: <span>{homework.due_date}</span>
        </div>
        <div>{submitToShow()}</div>
      </CardContent>
    </Card>
  );
}

export default HomeworkContent;
