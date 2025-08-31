import { compareAsc } from "date-fns";

export const isExpired = (date: Date | string) =>
  compareAsc(new Date(), new Date(date)) < 0 ? false : true;
