import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import UsersActions from "../features/users/UsersActions";
import UsersData from "../features/users/UsersData";
import { useStudents } from "../features/users/useStudents";
import { useTeachers } from "../features/users/useTeachers";
import PaginationComponent from "../ui/PaginationComponent";
import TeachersSearch from "../features/users/TeachersSearch";
import StudentsSearch from "../features/users/StudentsSearch";
import PageHeader from "../ui/PageHeader";

function Users() {
  const [teachersSearchStr, setTeachersSearchStr] = useState("");
  const [studentsSearchStr, setStudentsSearchStr] = useState("");
  const {
    totalTeachers,
    teachers,
    isLoading: isLoadingTeachers,
  } = useTeachers(teachersSearchStr);
  const {
    totalStudents,
    students,
    isLoading: isLoadingStudents,
  } = useStudents(studentsSearchStr);

  const isWorking = isLoadingStudents || isLoadingTeachers;

  const [searchParams, setSearchParams] = useSearchParams();

  const [usersType, setUsersType] = useState<"teachers" | "students">(
    "teachers",
  );

  const handleUsersTypeChange = useCallback(
    function (usersType: "teachers" | "students") {
      searchParams.set("type", usersType);
      searchParams.delete("page");
      setSearchParams(searchParams);
      setUsersType(usersType);
    },
    [searchParams, setSearchParams, setUsersType],
  );

  useEffect(
    function () {
      const type = searchParams.get("type");
      if (!type) return handleUsersTypeChange("teachers");
      // if (type === "teachers" || type === "students") {
      //   handleUsersTypeChange(type);
      // }
      if (type !== usersType) {
        setUsersType(type as "teachers" | "students");
      }
    },
    [setUsersType, handleUsersTypeChange, searchParams, usersType],
  );

  const total = usersType === "teachers" ? totalTeachers : totalStudents;

  return (
    <article className="flex flex-col gap-10">
      <PageHeader title="Користувачі">
        <div className="flex flex-row items-center gap-10">
          {usersType === "teachers" ? (
            <TeachersSearch
              teachers={teachers}
              isModal={false}
              searchStr={teachersSearchStr}
              handleSearch={setTeachersSearchStr}
              handleSubmit={(id: number) => {
                searchParams.set("userId", String(id));
              }}
              isLoading={isWorking}
            />
          ) : (
            <StudentsSearch
              students={students}
              isModal={false}
              searchStr={studentsSearchStr}
              handleSearch={setStudentsSearchStr}
              handleSubmit={(id: number) => {
                searchParams.set("userId", String(id));
              }}
              isLoading={isWorking}
            />
          )}
          <UsersActions />
        </div>
      </PageHeader>
      <UsersData
        usersType={usersType}
        handleUsersTypeChange={handleUsersTypeChange}
      />
      <PaginationComponent total={total!} />
    </article>
  );
}

export default Users;
