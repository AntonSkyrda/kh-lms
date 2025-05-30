import { compareAsc } from "date-fns";
import type { HomeworkPlain } from "../../schemas/homeworksSchema";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

interface HomeworkItemProps {
  homework: HomeworkPlain;
}

function HomeworkItem({ homework }: HomeworkItemProps) {
  const isExpired =
    compareAsc(new Date(), new Date(homework.due_date)) < 0 ? false : true;

  return (
    <AccordionItem value={String(homework.id)}>
      <AccordionTrigger className="flex flex-row justify-between">
        <p>{homework.lesson}</p> | <p>{homework.title}</p> |{" "}
        <span className={isExpired ? "text-destructive" : "text-primary"}>
          {homework.due_date}
        </span>
      </AccordionTrigger>
      <AccordionContent>Content</AccordionContent>
    </AccordionItem>
  );
}

export default HomeworkItem;
