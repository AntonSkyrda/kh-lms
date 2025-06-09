import type { HomeworkGroups } from "../../schemas/homeworksSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface HomeworkSubmissionsList {
  groups: HomeworkGroups[];
}

function HomeworkSubmissionsList({ groups }: HomeworkSubmissionsList) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Група</TableHead>
          <TableHead>Студент (Прізвище, імʼя, По-батькові)</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Оцінка</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) =>
          group.students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{student.full_name}</TableCell>
              <TableCell>
                {student.submitted ? "Надіслано" : "Ще не надіслав"}
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
}

export default HomeworkSubmissionsList;
