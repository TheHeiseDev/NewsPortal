export type Visit = {
  id: number;
  date: string;
  ip: string;
  country: string;
  device: string;
  os: string;
};

export type VisitType = {
  visitItem: Visit | null;
  visitByDate: Visit[] | null;
};
