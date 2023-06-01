type CurrencyModel = {
  id: number;
  name: string;
  code: string;
};

type BudgetModel = {
  id: number;
  name: string;
  currency: CurrencyModel;
};

export type UserModel = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  budgets: BudgetModel[];
  main_budget: BudgetModel;
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

export type TransactionModel = {
  id: number;
  name: string;
  amount: number;
  spent_date: string;
  expense_category: Omit<CategoryModel, 'subcategories'>;
  expense_priority: PriorityModel;
  // is_perpetual: boolean;
  // repeated_at: string;
};

export type TransactionListItemModel = {
  amount_sum: number;
  spent_date: TransactionModel['spent_date'];
  expenses: TransactionModel[];
};

export type TransactionListModel = TransactionListItemModel[];

type TransactionMetaLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type TransactionMetaModel = {
  current_page: number;
  from: number;
  last_page: number;
  links: TransactionMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};
