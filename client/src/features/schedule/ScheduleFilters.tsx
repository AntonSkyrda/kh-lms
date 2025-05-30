import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { CoursePlain } from "../../schemas/coursesSchema";
import type { GroupPlain } from "../../schemas/groupsSchema";
import { useCourses } from "../courses/useCourses";
import { useGroups } from "../groups/useGroups";
import CoursesSearch from "../courses/CoursesSearch";
import GroupsSearch from "../groups/GroupsSearch";

interface ScheduleFiltersProps {
  onCourseChange: (courseId?: number) => void;
  onGroupChange: (groupId?: number) => void;
}

function ScheduleFilters({
  onCourseChange,
  onGroupChange,
}: ScheduleFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [coursesSearchStr, setCoursesSearchStr] = useState("");
  const [groupsSearchStr, setGroupsSearchStr] = useState("");

  const [selectedCourse, setSelectedCourse] = useState<
    CoursePlain | undefined
  >();
  const [selectedGroup, setSelectedGroup] = useState<GroupPlain | undefined>();

  const { courses, isLoading: isLoadingCourses } = useCourses(coursesSearchStr);
  const { groups, isLoading: isLoadingGroups } = useGroups(groupsSearchStr);

  const isLoading = isLoadingCourses || isLoadingGroups;

  useEffect(() => {
    const courseId = searchParams.get("course");
    const groupId = searchParams.get("group");

    if (courseId) {
      const course = courses.find((c) => c.id === Number(courseId));
      if (course) setSelectedCourse(course);
    }

    if (groupId) {
      const group = groups.find((g) => g.id === Number(groupId));
      if (group) setSelectedGroup(group);
    }
  }, [courses, groups, searchParams]);

  const handleCourseSelect = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      searchParams.set("course", String(courseId));
      setSearchParams(searchParams);
      onCourseChange(courseId);
      setCoursesSearchStr("");
    }
  };

  const handleCourseClear = () => {
    setSelectedCourse(undefined);
    searchParams.delete("course");
    setSearchParams(searchParams);
    onCourseChange(undefined);
  };

  const handleGroupSelect = (groupId: number) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) {
      setSelectedGroup(group);
      searchParams.set("group", String(groupId));
      setSearchParams(searchParams);
      onGroupChange(groupId);
      setGroupsSearchStr("");
    }
  };

  const handleGroupClear = () => {
    setSelectedGroup(undefined);
    searchParams.delete("group");
    setSearchParams(searchParams);
    onGroupChange(undefined);
  };

  return (
    <div className="flex flex-row gap-5">
      <div>
        <CoursesSearch
          searchStr={coursesSearchStr}
          setSearchStr={setCoursesSearchStr}
          courses={courses}
          isLoading={isLoading}
          handleSelect={handleCourseSelect}
          selectedItem={selectedCourse}
          handleClear={handleCourseClear}
        />
      </div>
      <div>
        <GroupsSearch
          searchStr={groupsSearchStr}
          setSearchStr={setGroupsSearchStr}
          groups={groups}
          isLoading={isLoading}
          isModal={false}
          handleSelect={handleGroupSelect}
          selectedItem={selectedGroup}
          handleClear={handleGroupClear}
        />
      </div>
    </div>
  );
}

export default ScheduleFilters;
