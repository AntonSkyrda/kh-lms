import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import Empty from "../../ui/Empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import SpinnerMini from "../../ui/SpinnerMini";
import type { GroupPlain } from "../../schemas/groupsSchema";

interface GroupsListProps {
  activeGroup: number | null;
  groups: GroupPlain[];
  isLoading: boolean;
  handleActiveGroup: (groupId: number) => void;
}

function GroupsList({
  groups,
  activeGroup,
  isLoading,
  handleActiveGroup,
}: GroupsListProps) {
  if (groups.length < 1) return <Empty resourceName="Груп" />;

  if (isLoading) return <SpinnerMini size="lg" />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Назва</TableHead>
          <TableHead className="w-24">Рік навчання</TableHead>
          <TableHead className="w-24 text-end">Деталі</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.length ? (
          groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.year_of_study}</TableCell>
              <TableCell
                className="justify-items-end"
                onClick={() => handleActiveGroup(group.id)}
              >
                {activeGroup === group.id ? (
                  <ChevronLeftCircle />
                ) : (
                  <ChevronRightCircle />
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <p>Жодної групи</p>
        )}
      </TableBody>
    </Table>
  );
}

export default GroupsList;
