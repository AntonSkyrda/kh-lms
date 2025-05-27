import { Plus, Clock, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import SelectPair from "./SelectPair";
import type { WeeklyPair } from "../../../types/schedule";
import SelectDay from "./SelectDay";

interface WeeklyScheduleCardProps {
  weeklyPairs: WeeklyPair[];
  onAddPair: () => void;
  onRemovePair: (id: string) => void;
  onUpdatePair: (id: string, updates: Partial<WeeklyPair>) => void;
}

function WeeklyScheduleCard({
  weeklyPairs,
  onAddPair,
  onRemovePair,
  onUpdatePair,
}: WeeklyScheduleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Тижневий розклад
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyPairs.map((weeklyPair) => (
            <div
              key={weeklyPair.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <SelectDay
                value={{
                  value: weeklyPair.dayOfWeek,
                  label: weeklyPair.dayName,
                }}
                onValueChange={(day) => {
                  if (day) {
                    onUpdatePair(weeklyPair.id, {
                      dayOfWeek: day.value,
                      dayName: day.label,
                    });
                  }
                }}
              />

              <SelectPair
                value={weeklyPair.pair}
                onValueChange={(pair) => {
                  if (pair) {
                    onUpdatePair(weeklyPair.id, { pair });
                  }
                }}
              />

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemovePair(weeklyPair.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={onAddPair}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Додати пару в тиждень
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeeklyScheduleCard;
