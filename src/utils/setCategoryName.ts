import { CategoryEnum } from "./constants/categoryItem";

export const setCategoryName = (categoryValue: string) => {
  if (categoryValue === CategoryEnum.it_news) {
    return "Новости ИТ";
  }
  if (categoryValue === CategoryEnum.ai) {
    return "AI";
  }
  if (categoryValue === CategoryEnum.useful_services) {
    return "Полезные ресуры";
  } else {
    return "Прочие";
  }
};
