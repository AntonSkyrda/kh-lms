import { useResource } from "../../hooks/useResource";
import ApiHomeworks from "../../lib/services/apiHomeworks";

export function useHomework(homeworkId: number) {
  const {
    isLoading,
    resource: homework,
    error: homeworkError,
  } = useResource({
    resourceName: "homework",
    fetchFn: ApiHomeworks.getHomework,
    paramName: "homeworkId",
    id: homeworkId,
  });

  return { isLoading, homework, homeworkError };
}
