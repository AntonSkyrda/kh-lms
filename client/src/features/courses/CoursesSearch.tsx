import SearchBar from "../../ui/SearchBar";
import type { CourseDetailed, CoursePlain } from "../../schemas/coursesSchema";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

interface CoursesSearchParams {
  searchStr: string;
  setSearchStr: (value: string) => void;
  handleSelect?: (value: number) => void;
  courses: CoursePlain[];
  isLoading: boolean;
  selectedItem?: CoursePlain | CourseDetailed;
  handleClear?: () => void;
  isModal?: boolean;
}

function CoursesSearch({
  searchStr,
  setSearchStr,
  courses,
  handleSelect,
  isLoading,
  selectedItem,
  handleClear,
  isModal = false,
}: CoursesSearchParams) {
  return (
    <SearchBar
      value={searchStr}
      isLoading={isLoading}
      onValueChange={setSearchStr}
      isModal={isModal}
    >
      <div className="relative">
        <SearchBar.Input
          placeholder={selectedItem ? selectedItem.name : "Пошук курсів"}
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
          emptyMessage={`За запитом ${searchStr} Не знайдено жодного курсу`}
        >
          {courses.map((course) => (
            <SearchBar.Result
              key={course.id}
              className="cursor-pointer"
              handleSelect={() => handleSelect?.(course.id)}
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
