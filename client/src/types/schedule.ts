export interface WeeklyPair {
  id: string;
  dayOfWeek: number;
  dayName: string;
  pair: {
    start: string;
    end: string;
    label: string;
  };
}

export type GeneratedLesson = {
  program: number;
  group: number;
  date: string;
  time: string;
  extendedValues: {
    pair: WeeklyPair["pair"];
    programTopic: string;
    hours: number;
    // hoursSpent: number;
    // remainingHours: number;
  };
};
