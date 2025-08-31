import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import type { GeneratedLesson } from "../../../types/schedule";

interface SchedulePreviewCardProps {
  generatedLessons: GeneratedLesson[];
}

function SchedulePreviewCard({ generatedLessons }: SchedulePreviewCardProps) {
  if (generatedLessons.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Попередній перегляд розкладу</CardTitle>
        <p className="text-muted-foreground text-sm">
          Буде створено {generatedLessons.length} занять
        </p>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {generatedLessons.map((lesson, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <div className="font-medium">
                  {lesson.extendedValues.programTopic}
                </div>
                <div className="text-muted-foreground text-sm">
                  {lesson.date} {lesson.extendedValues.pair.label} (
                  {lesson.extendedValues.pair.start} -{" "}
                  {lesson.extendedValues.pair.end})
                </div>
              </div>
              <div className="text-sm">{lesson.extendedValues.hours}г / 2г</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SchedulePreviewCard;
