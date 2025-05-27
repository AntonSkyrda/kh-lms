import type { GroupPlain } from "../../../schemas/groupsSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

interface SelectGroupProps {
  onValueChange: (id: number | undefined) => void;
  groups: GroupPlain[];
  value?: number;
}

function SelectGroup({ onValueChange, groups }: SelectGroupProps) {
  return (
    <Select
      onValueChange={(value) => onValueChange(+value)}
      // value={String(value && "")}
    >
      <SelectTrigger>
        <SelectValue placeholder="Оберіть групу" />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group) => (
          <SelectItem key={group.id} value={String(group.id)}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectGroup;
