import { PAIRS } from "../../../lib/consts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

type PairObject = {
  start: string;
  end: string;
  label: string;
};

interface SelectPairProps {
  onValueChange: (pair: PairObject | undefined) => void;
  value?: PairObject;
}

function SelectPair({ onValueChange, value }: SelectPairProps) {
  const handleValueChange = (selectedLabel: string) => {
    const selectedPair = PAIRS.find((pair) => pair.label === selectedLabel);
    onValueChange(selectedPair);
  };

  return (
    <Select onValueChange={handleValueChange} value={value?.label}>
      <SelectTrigger>
        <SelectValue placeholder="Оберіть пару" />
      </SelectTrigger>
      <SelectContent>
        {PAIRS.map((pair) => (
          <SelectItem key={pair.label} value={pair.label}>
            {pair.label} ({pair.start} - {pair.end})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectPair;
