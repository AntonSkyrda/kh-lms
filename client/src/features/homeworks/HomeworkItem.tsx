import type { HomeworkPlain } from "../../schemas/homeworksSchema";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import HomeworkContent from "./HomeworkContent";
import { isExpired } from "../../lib/utils/utils";

interface HomeworkItemProps {
  homework: HomeworkPlain;
}

function HomeworkItem({ homework }: HomeworkItemProps) {
  return (
    <AccordionItem value={String(homework.id)}>
      <AccordionTrigger>
        <p>{homework.title}</p> |
        <span
          className={
            isExpired(homework.due_date) ? "text-destructive" : "text-primary"
          }
        >
          {homework.due_date}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <HomeworkContent homeworkId={homework.id} />
      </AccordionContent>
    </AccordionItem>
  );
}

export default HomeworkItem;
