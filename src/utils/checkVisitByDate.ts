import { Visit } from "../store/slice/visit/visitTypes";
import { getCurrentDate } from "./getCurrentDateTime";

export function checkVisitByDate(ip: string, visit: Visit[]) {
  const date = getCurrentDate();
  for (let i = 0; i < visit.length; i++) {
    if (visit[i].date === date && visit[i].ip === ip) {
      return false;
    }
  }

  return true;
}
