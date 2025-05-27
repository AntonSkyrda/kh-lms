export const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api_${import.meta.env.VITE_API_VERSION}`;

export const ITEMS_PER_PAGE = 10;

export const PAIRS = [
  { start: "08:30", end: "10:05", label: "1 пара" },
  { start: "10:10", end: "11:35", label: "2 пара" },
  { start: "11:55", end: "13:20", label: "3 пара" },
  { start: "13:40", end: "15:05", label: "4 пара" },
  { start: "15:10", end: "16:35", label: "5 пара" },
  { start: "16:40", end: "18:05", label: "6 пара" },
];

export const DAYS_OF_WEEK = [
  { value: 1, label: "Понеділок" },
  { value: 2, label: "Вівторок" },
  { value: 3, label: "Середа" },
  { value: 4, label: "Четвер" },
  { value: 5, label: "П'ятниця" },
  { value: 6, label: "Субота" },
];

export const HOURS_PER_LESSON = 2;
