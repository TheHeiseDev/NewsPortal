import { Visit } from "../store/slice/visit/visitTypes";

export function checkVisitByDate(date: string, ip: string, visit: Visit[]) {
    for (let i = 0; i < visit.length; i++) {
      if (visit[i].date === date && visit[i].ip === ip) {
        return false;
      }
    }

    return true;
  }