import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { uk as ua } from "react-day-picker/locale";

import { cn } from "../lib/utils/cn";
import { Button } from "./button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useState } from "react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  disabled?: boolean;
  id?: string;
}

export function DatePicker({ date, setDate, disabled, id }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  function handleSelect(date: Date) {
    if (!date) {
      setDate(undefined);
    } else {
      setDate(date);
      setIsOpen(false);
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: uk })
          ) : (
            <span>Оберіть дату</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          required
          locale={ua}
          weekStartsOn={1}
        />
      </PopoverContent>
    </Popover>
  );
}
