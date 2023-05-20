import { useMemo } from "react";

export const useFormatDate = (date: string | undefined): string => {
  const formattedDate = useMemo(() => {
    if (!date) return "";

    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${day} ${formatMonthInString(month)} ${year}`;
  }, [date]);

  return formattedDate;
};

function formatMonthInString(month: string) {
  if (month === "01") {
    return "янв.";
  }
  if (month === "02") {
    return "фев.";
  }
  if (month === "03") {
    return "марта";
  }
  if (month === "04") {
    return "апр.";
  }
  if (month === "05") {
    return "мая";
  }
  if (month === "06") {
    return "июня";
  }
  if (month === "07") {
    return "июля";
  }
  if (month === "08") {
    return "авг.";
  }
  if (month === "08") {
    return "сен.";
  }
  if (month === "10") {
    return "окт.";
  }
  if (month === "11") {
    return "ноя.";
  }
  if (month === "12") {
    return "дек.";
  }
}
