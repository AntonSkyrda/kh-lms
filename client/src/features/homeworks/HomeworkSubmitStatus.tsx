import SpinnerMini from "../../ui/SpinnerMini";
import SubmitHomework from "./SubmitHomework";
import { useHomeworkStatus } from "./useHomeworkStatus";

interface HomeworkSubmitStatusProps {
  homeworkId: number;
}

function HomeworkSubmitStatus({ homeworkId }: HomeworkSubmitStatusProps) {
  const { isLoading, homeworkStatus } = useHomeworkStatus(homeworkId);

  if (isLoading) return <SpinnerMini size="lg" />;

  if (!homeworkStatus) return <SubmitHomework homeworkId={homeworkId} />;

  return <div>Status</div>;
}

export default HomeworkSubmitStatus;
