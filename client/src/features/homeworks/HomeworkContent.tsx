import Empty from "../../ui/Empty";
import SpinnerMini from "../../ui/SpinnerMini";
import { useHomework } from "./useHomework";

interface HomeworkContentProps {
  homeworkId: number;
}

function HomeworkContent({ homeworkId }: HomeworkContentProps) {
  const { homework, isLoading } = useHomework(homeworkId);

  if (isLoading) return <SpinnerMini size="lg" />;

  if (!homework) return <Empty resourceName="Завдання" />;

  return <div></div>;
}

export default HomeworkContent;
