import SearchBar from "../../ui/SearchBar";
import type { GroupPlain } from "../../schemas/groupsSchema";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

interface GroupsSearchProps {
  searchStr: string;
  groups: GroupPlain[];
  isLoading: boolean;
  setSearchStr: (value: string) => void;
  handleSelect?: (groupId: number) => void;
  isModal: boolean;
  selectedItem?: GroupPlain;
  handleClear?: () => void;
}

function GroupsSearch({
  searchStr,
  groups,
  setSearchStr,
  isLoading,
  handleSelect,
  isModal = false,
  selectedItem,
  handleClear,
}: GroupsSearchProps) {
  return (
    <SearchBar
      value={searchStr}
      isLoading={isLoading}
      onValueChange={setSearchStr}
      isModal={isModal}
    >
      <div className="relative">
        <SearchBar.Input
          placeholder={selectedItem ? selectedItem.name : "Пошук Груп"}
        />
        {selectedItem && handleClear && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2"
            onClick={(e) => {
              e.stopPropagation();
              handleClear?.();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <SearchBar.Content>
        <SearchBar.List
          emptyMessage={`За запитом ${searchStr ? `"${searchStr}"` : ""} Не знайдено жодної групи`}
        >
          {groups.map((group) => (
            <SearchBar.Result
              key={group.id}
              handleSelect={() => handleSelect?.(group.id)}
            >
              {group.name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default GroupsSearch;
