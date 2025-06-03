import { DAYS_OF_WEEK } from "../../../lib/consts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

type DayObject = {
  value: number;
  label: string;
};

interface SelectDayProps {
  onValueChange: (day: DayObject | undefined) => void;
  value?: DayObject;
}

function SelectDay({ onValueChange, value }: SelectDayProps) {
  const handleValueChange = (selectedValue: string) => {
    if (selectedValue) {
      const dayValue = parseInt(selectedValue);
      const selectedDay = DAYS_OF_WEEK.find((day) => day.value === dayValue);
      onValueChange(selectedDay);
    }
  };

  return (
    <Select
      onValueChange={handleValueChange}
      value={value?.value.toString() || ""}
    >
      <SelectTrigger id="select-pair">
        <SelectValue placeholder="Оберіть день" />
      </SelectTrigger>
      <SelectContent>
        {DAYS_OF_WEEK.map((day) => (
          <SelectItem key={day.value} value={day.value.toString()}>
            {day.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectDay;
