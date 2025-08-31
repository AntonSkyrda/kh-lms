import HomeworkItem from "../features/homeworks/HomeworkItem";
import { useHomeworks } from "../features/homeworks/hooks/useHomeworks";
import { Accordion } from "../ui/accordion";
import Empty from "../ui/Empty";
import PageHeader from "../ui/PageHeader";
import PaginationComponent from "../ui/PaginationComponent";
import SpinnerMini from "../ui/SpinnerMini";

function Homeworks() {
  const { homeworks, isLoading, totalHomeworks } = useHomeworks();

  return (
    <article className="flex flex-col gap-10">
      <PageHeader title="Домашні завдання"></PageHeader>
      <section className="w-full">
        <PaginationComponent total={totalHomeworks} />
        {isLoading ? (
          <SpinnerMini size="lg" />
        ) : (
          <div>
            {homeworks.length > 0 ? (
              <Accordion type="single" collapsible>
                {homeworks.map((homework) => (
                  <HomeworkItem key={homework.id} homework={homework} />
                ))}
              </Accordion>
            ) : (
              <Empty resourceName="Завдань" />
            )}
          </div>
        )}
      </section>
    </article>
  );
}

export default Homeworks;
