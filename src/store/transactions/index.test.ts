import {
  listWithOneTransactionA,
  listWithOneTransactionB,
  listWithTransactionsTwoGroup,
  listWithTransactionsWithSeparatedDates,
  listWithTransactionWithOtherDate,
} from './mocks';
import reducer, { transactionsSlice } from '.';
import { expect } from '@jest/globals';

describe('transactions store', () => {
  it('should be defined with default state', () => {
    const initialState = transactionsSlice.getInitialState();

    expect(initialState).toEqual({
      isLoading: false,
      list: [],
    });
  });

  it('should set loading state', () => {
    const initialState = transactionsSlice.getInitialState();

    expect(
      reducer(
        initialState,
        transactionsSlice.actions.setTransactionsLoading(true),
      ),
    ).toEqual({
      isLoading: true,
      list: [],
    });
  });

  describe('setTransactions', () => {
    it('should add when list is empty', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          initialState,
          transactionsSlice.actions.setTransactions(listWithOneTransactionA),
        ),
      ).toEqual({
        isLoading: false,
        list: listWithOneTransactionA,
      });
    });

    it('should not add when list contains the same item', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithOneTransactionA },
          transactionsSlice.actions.setTransactions(listWithOneTransactionA),
        ),
      ).toEqual({
        isLoading: false,
        list: listWithOneTransactionA,
      });
    });

    it('should add and increase amount_sum when list is not contains the same item and date is the same', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithOneTransactionA },
          transactionsSlice.actions.setTransactions(listWithOneTransactionB),
        ),
      ).toMatchSnapshot();
    });

    it('should add and sort by date when contains items with different date', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithOneTransactionA },
          transactionsSlice.actions.setTransactions(
            listWithTransactionWithOtherDate,
          ),
        ),
      ).toMatchSnapshot();
    });
  });

  describe('addTransaction', () => {
    it('should add and create new group when list is empty', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          initialState,
          transactionsSlice.actions.addTransaction(
            listWithOneTransactionA[0].expenses[0],
          ),
        ),
      ).toEqual({
        isLoading: false,
        list: listWithOneTransactionA,
      });
    });

    it('should add to existed group when list contains transactions with the same date', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithOneTransactionA },
          transactionsSlice.actions.addTransaction(
            listWithOneTransactionB[0].expenses[0],
          ),
        ),
      ).toMatchSnapshot();
    });
  });

  describe('editTransaction', () => {
    it('should simply edit if date and amount is not changed', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithOneTransactionA },
          transactionsSlice.actions.editTransaction({
            ...listWithOneTransactionA[0].expenses[0],
            name: 'new name',
          }),
        ),
      ).toMatchSnapshot();
    });

    it('should move to new group which is not existed when date is changed', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithTransactionsWithSeparatedDates },
          transactionsSlice.actions.editTransaction({
            ...listWithTransactionsWithSeparatedDates[0].expenses[0],
            spent_date: '2021-01-03',
          }),
        ),
      ).toMatchSnapshot();
    });

    it('should move to existed group when date is changed', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithTransactionsWithSeparatedDates },
          transactionsSlice.actions.editTransaction({
            ...listWithOneTransactionA[0].expenses[0],
            spent_date: '2021-01-02',
          }),
        ),
      ).toMatchSnapshot();
    });

    it('should move to existed group and increase amount_sum when date is changed and amount is increased', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithTransactionsWithSeparatedDates },
          transactionsSlice.actions.editTransaction({
            ...listWithOneTransactionA[0].expenses[0],
            spent_date: '2021-01-02',
            amount: 1,
          }),
        ),
      ).toMatchSnapshot();
    });
  });

  describe('deleteTransaction', () => {
    it('should delete group when it is empty', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithOneTransactionA },
          transactionsSlice.actions.removeTransaction({
            id: listWithOneTransactionA[0].expenses[0].id,
            spent_date: listWithOneTransactionA[0].expenses[0].spent_date,
          }),
        ),
      ).toEqual({
        isLoading: false,
        list: [],
      });
    });

    it('should delete transaction and decrease amount_sum when group is not empty', () => {
      const initialState = transactionsSlice.getInitialState();

      expect(
        reducer(
          { ...initialState, list: listWithTransactionsTwoGroup },
          transactionsSlice.actions.removeTransaction({
            id: listWithOneTransactionA[0].expenses[0].id,
            spent_date: listWithOneTransactionA[0].expenses[0].spent_date,
          }),
        ),
      ).toMatchSnapshot();
    });
  });

  it('should delete all transactions', () => {
    const initialState = transactionsSlice.getInitialState();

    expect(
      reducer(
        { ...initialState, list: listWithTransactionsTwoGroup },
        transactionsSlice.actions.removeTransactions(),
      ),
    ).toEqual({
      isLoading: false,
      list: [],
    });
  });
});
