import SearchBar from "../../ui/SearchBar";
import type { GroupPlain } from "../../schemas/groupsSchema";

interface GroupsSearchProps {
  searchStr: string;
  groups: GroupPlain[];
  isLoading: boolean;
  setSearchStr: (value: string) => void;
  handleSelect?: (id: number) => void;
}

function GroupsSearch({
  searchStr,
  groups,
  setSearchStr,
  isLoading,
  handleSelect,
}: GroupsSearchProps) {
  const isWorking = isLoading;

  return (
    <SearchBar
      value={searchStr}
      isLoading={isWorking}
      onValueChange={setSearchStr}
      isModal={false}
    >
      <SearchBar.Input placeholder="Пошук курсів" />
      <SearchBar.Content>
        <SearchBar.List
          emptyMessage={`За запитом ${searchStr} Не знайдено жодного курсу`}
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
