import SearchBar from "../../ui/SearchBar";
import type { UserPlain } from "../../schemas/userSchemas";

interface StudentsSearchProps {
  searchStr: string;
  students: UserPlain[];
  handleSearch: (value: string) => void;
  handleSubmit: (teacherId: number) => void;
  isLoading: boolean;
}

export function StudentsSearch({
  handleSearch,
  students,
  searchStr,
  isLoading,
  handleSubmit,
}: StudentsSearchProps) {
  return (
    <SearchBar
      value={searchStr}
      onValueChange={handleSearch}
      isModal={true}
      isLoading={isLoading}
    >
      <SearchBar.Input placeholder="Пошук студентів" />
      <SearchBar.Content>
        <SearchBar.List>
          {students.map((student) => (
            <SearchBar.Result
              key={student.id}
              handleSelect={() => handleSubmit(student.id)}
            >
              {student.full_name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default StudentsSearch;
