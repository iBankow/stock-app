export const UNITS = [
  "UN",
  "CX",
  "KIT",
  "BR",
  "M1",
  "M2",
  "M3",
  "GL",
  "HRS",
  "KG",
  "LT",
  "SERV",
  "TON",
  "ROLO",
  "PC",
];

export interface IPagination<T> {
  data: T[];
  pagination: {
    total: number;
    lastPage: number;
    prevPage: number;
    nextPage: number;
    perPage: number;
    currentPage: number;
    from: number;
    to: number;
  };
}
