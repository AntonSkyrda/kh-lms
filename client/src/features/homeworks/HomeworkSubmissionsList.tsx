import { EllipsisIcon, EllipsisVerticalIcon, Minus } from "lucide-react";
import type { HomeworkDetailed } from "../../schemas/homeworksSchema";
import SpinnerMini from "../../ui/SpinnerMini";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useSubmissions } from "./hooks/useSubmissions";
import HomeworkSubmissionStatus from "./HomeworkSubmissionStatus";

interface HomeworkSubmissionsList {
  homework: HomeworkDetailed;
}

function HomeworkSubmissionsList({ homework }: HomeworkSubmissionsList) {
  const { groups } = homework;
  const { isLoading, homeworkSubmissions } = useSubmissions(homework.id);

  if (isLoading) return <SpinnerMini size="lg" />;

  if (!groups) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Група</TableHead>
          <TableHead>Прізвище</TableHead>
          <TableHead>Імʼя</TableHead>
          <TableHead>По-батькові</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-center">Оцінка</TableHead>
          <TableHead className="text-end">Деталі</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) =>
          group.students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{group.name}</TableCell>
              {student.full_name.split(" ").map((el, i) => (
                <TableCell key={i}>{el}</TableCell>
              ))}
              <TableCell>
                {student.submitted ? "Надіслано" : "Ще не надіслав"}
              </TableCell>
              <TableCell className="text-center">
                {homeworkSubmissions?.find((el) => el.student_id === student.id)
                  ?.grade ?? "-"}
              </TableCell>
              <TableCell className="text-end">
                <HomeworkSubmissionStatus
                  submission={homeworkSubmissions?.find(
                    (el) => el.student_id === student.id,
                  )}
                  honework={homework}
                  student={student}
                />
                <>
                  {console.log(
                    homeworkSubmissions?.find(
                      (el) => el.student_id === student.id,
                    ),
                  )}
                </>
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
}

export default HomeworkSubmissionsList;
