import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import type { GroupPlain } from "../../../schemas/groupsSchema";

interface SelectGroupProps {
  value?: number;
  onValueChange: (value: number) => void;
  groups: GroupPlain[];
  disabled?: boolean;
}

function SelectGroup({
  value,
  onValueChange,
  groups,
  disabled,
}: SelectGroupProps) {
  return (
    <Select
      value={value?.toString()}
      onValueChange={(val) => onValueChange(Number(val))}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Виберіть групу" />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group) => (
          <SelectItem key={group.id} value={group.id.toString()}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectGroup;
