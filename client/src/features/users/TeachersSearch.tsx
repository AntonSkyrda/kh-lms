import SearchBar from "../../ui/SearchBar";
import type { UserPlain } from "../../schemas/userSchemas";

interface TeacherSearchProps {
  searchStr: string;
  teachers: UserPlain[];
  handleSearch: (value: string) => void;
  handleSubmit: (teacherId: number) => void;
  isLoading: boolean;
}

export function TeachersSearch({
  handleSearch,
  teachers,
  searchStr,
  isLoading,
  handleSubmit,
}: TeacherSearchProps) {
  return (
    <SearchBar
      value={searchStr}
      onValueChange={handleSearch}
      isModal={true}
      isLoading={isLoading}
    >
      <SearchBar.Input placeholder="Пошук викладача" />
      <SearchBar.Content>
        <SearchBar.List>
          {teachers.map((teacher) => (
            <SearchBar.Result
              key={teacher.id}
              handleSelect={() => handleSubmit(teacher.id)}
            >
              {teacher.full_name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default TeachersSearch;
