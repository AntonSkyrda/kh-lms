import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { EllipsisVertical } from "lucide-react";

function UsersDataActions() {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={8}
        className="flex w-48 flex-col gap-2"
      >
        <span>Детальніше</span>
        <span>Редагувати</span>
        <span>Видалити</span>
      </PopoverContent>
    </Popover>
  );
}

export default UsersDataActions;
