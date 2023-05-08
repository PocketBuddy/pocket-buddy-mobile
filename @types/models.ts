export type UserModel = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type CategoryModel = {
  id: number;
  name: string;
  all_subcategories: CategoryModel[] | [];
};

export type PriorityModel = {
  id: number;
  name: string;
  priority: number;
};
