export const listWithOneTransactionA = [
  {
    amount_sum: 100,
    spent_date: '2021-01-01',
    expenses: [
      {
        id: 1,
        name: 'test',
        amount: 100,
        spent_date: '2021-01-01',
        expense_category: {
          id: 1,
          name: 'test',
        },
        expense_priority: {
          id: 1,
          name: 'test',
          priority: 1,
        },
      },
    ],
  },
];

export const listWithOneTransactionB = [
  {
    amount_sum: 25,
    spent_date: '2021-01-01',
    expenses: [
      {
        id: 2,
        name: 'test',
        amount: 25,
        spent_date: '2021-01-01',
        expense_category: {
          id: 1,
          name: 'test',
        },
        expense_priority: {
          id: 1,
          name: 'test',
          priority: 1,
        },
      },
    ],
  },
];

export const listWithTransactionWithOtherDate = [
  {
    amount_sum: 25,
    spent_date: '2021-01-02',
    expenses: [
      {
        id: 3,
        name: 'test',
        amount: 25,
        spent_date: '2021-01-02',
        expense_category: {
          id: 1,
          name: 'test',
        },
        expense_priority: {
          id: 1,
          name: 'test',
          priority: 1,
        },
      },
    ],
  },
];

export const listWithTransactionsWithSeparatedDates = [
  listWithTransactionWithOtherDate[0],
  listWithOneTransactionA[0],
];

export const listWithTransactionsTwoGroup = [
  ...listWithTransactionsWithSeparatedDates,
  listWithOneTransactionB[0],
];
