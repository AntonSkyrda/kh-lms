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
        <div className="flex flex-col items-start gap-3">
          <p>{homework.title}</p>
          <span
            className={
              isExpired(homework.due_date) ? "text-destructive" : "text-primary"
            }
          >
            {homework.due_date}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <HomeworkContent homeworkId={homework.id} />
      </AccordionContent>
    </AccordionItem>
  );
}

export default HomeworkItem;
