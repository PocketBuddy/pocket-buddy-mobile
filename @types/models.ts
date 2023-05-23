export type UserModel = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  budgets: [];
  main_budget: null;
};

export type CategoryModel = {
  id: number;
  name: string;
  subcategories: CategoryModel[] | [];
};

export type PriorityModel = {
  id: number;
  name: string;
  priority: number;
};
