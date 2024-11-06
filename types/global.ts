export type PaginatedData<T> = {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
