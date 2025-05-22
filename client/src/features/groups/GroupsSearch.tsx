import SearchBar from "../../ui/SearchBar";
import type { GroupPlain } from "../../schemas/groupsSchema";

interface GroupsSearchProps {
  searchStr: string;
  groups: GroupPlain[];
  isLoading: boolean;
  setSearchStr: (value: string) => void;
  handleSelect?: (groupId: number) => void;
  isModal: boolean;
}

function GroupsSearch({
  searchStr,
  groups,
  setSearchStr,
  isLoading,
  handleSelect,
  isModal = false,
}: GroupsSearchProps) {
  return (
    <SearchBar
      value={searchStr}
      isLoading={isLoading}
      onValueChange={setSearchStr}
      isModal={isModal}
    >
      <SearchBar.Input placeholder="Пошук курсів" />
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
