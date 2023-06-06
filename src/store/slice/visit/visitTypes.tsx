export type Visit = {
  id: string;
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
