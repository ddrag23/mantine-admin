import { format } from "date-fns";
import { useMemo } from "react";

function useDateFormat(date: Date, dateFormat: string = "dd/MM/yyyy H:i:s") {
  const formattedDate = useMemo(() => {
    if (!date) return "";
    try {
      return format(new Date(date), dateFormat);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  }, [date, dateFormat]);

  return formattedDate;
}
export default useDateFormat;
