import SearchBar from "../../ui/SearchBar";
import { useNavigate } from "react-router-dom";
import type { CoursePlain } from "../../schemas/coursesSchema";

interface CoursesSearchParams {
  searchStr: string;
  setSearchStr: (value: string) => void;
  courses: CoursePlain[];
  isLoading: boolean;
}

function CoursesSearch({
  searchStr,
  setSearchStr,
  courses,
  isLoading,
}: CoursesSearchParams) {
  const navigate = useNavigate();

  return (
    <SearchBar
      value={searchStr}
      isLoading={isLoading}
      onValueChange={setSearchStr}
    >
      <SearchBar.Input placeholder="Пошук курсів" />
      <SearchBar.Content>
        <SearchBar.List
          emptyMessage={`За запитом ${searchStr} Не знайдено жодного курсу`}
        >
          {courses.map((course) => (
            <SearchBar.Result
              key={course.id}
              className="cursor-pointer"
              handleSelect={() => navigate(`/courses/${course.id}`)}
            >
              {course.name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default CoursesSearch;
