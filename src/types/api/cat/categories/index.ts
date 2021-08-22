export interface Query {
  limit?: number;
  page?: number;
}

export interface Category {
  id: number;
  name: string;
}

export type Categories = Category[];

export type Methods = {
  get: {
    query?: Query;

    resBody: Categories;
  };
};
