import { useState } from "react";
import GroupDetails from "../features/groups/GroupDetails";
import GroupsList from "../features/groups/GroupsList";
import { useGroups } from "../features/groups/useGroups";
import PageHeader from "../ui/PageHeader";
import PaginationComponent from "../ui/PaginationComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import GroupsSearch from "../features/groups/GroupsSearch";
import GroupsActions from "../features/groups/GroupsActions";

function Groups() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchStr, setSearchStr] = useState("");
  const { totalGroups, groups, isLoading } = useGroups(searchStr);
  const activeGroup = Number(searchParams.get("groupId")) || null;
  const navigate = useNavigate();

  function handleSearch(value: string) {
    searchParams.delete("groupId");
    setSearchParams(searchParams);
    return setSearchStr(value);
  }

  function handleActiveGroup(groupId: number) {
    if (!groupId) return;
    if (groupId === activeGroup) {
      searchParams.delete("groupId");
      return setSearchParams(searchParams);
    }
    searchParams.set("groupId", String(groupId));
    setSearchParams(searchParams);
  }

  return (
    <article className="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-10 px-10 py-4">
      <PageHeader title="Групи">
        <div className="flex flex-row gap-10">
          <GroupsSearch
            searchStr={searchStr}
            setSearchStr={handleSearch}
            groups={groups}
            isLoading={isLoading}
            handleSelect={(id: number) => navigate(`/groups?groupId=${id}`)}
          />
          <GroupsActions />
        </div>
      </PageHeader>
      <div className="grid grid-cols-[1fr_3fr] gap-18">
        <section>
          <GroupsList
            groups={groups}
            isLoading={isLoading}
            activeGroup={activeGroup}
            handleActiveGroup={handleActiveGroup}
          />
          <PaginationComponent total={totalGroups} />
        </section>
        <section>
          <GroupDetails />
        </section>
      </div>
    </article>
  );
}

export default Groups;
