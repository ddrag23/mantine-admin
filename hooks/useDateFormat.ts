import { format } from "date-fns";
import { useMemo } from "react";

export default function useDateFormat(
  date: Date,
  dateFormat: string = "dd/MM/yyyy H:i:s"
) {
  return format(new Date(date), dateFormat);
}
