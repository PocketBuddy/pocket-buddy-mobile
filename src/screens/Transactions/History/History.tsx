import {
  allTransactionsSelector,
  transactionsLoadingSelector,
} from '@/store/transactions/selectors';
import React, { useEffect, useState } from 'react';
import TransactionsList from './TransactionsList/TransactionsList';
import { useIsFocused } from '@react-navigation/native';
import { useLazyGetTransactionsQuery } from '@/services/modules/transactions';
import { useNetworkError } from '@/hooks';
import { useSelector } from 'react-redux';

const INIT_LIMIT = 20;
const INIT_PAGE = 1;
const INIT_DATE_SUBTRACTION = 'year';

export default function History() {
  const [page, setPage] = useState(INIT_PAGE);
  const { isNetworkError } = useNetworkError();
  const [getTransactions, { data, isError }] = useLazyGetTransactionsQuery();
  const transactions = useSelector(allTransactionsSelector);
  const transactionsLoading = useSelector(transactionsLoadingSelector);
  const isFocused = useIsFocused();

  useEffect(() => {
    !isNetworkError &&
      isFocused &&
      getTransactions({
        date_type: 'relative',
        limit: INIT_LIMIT,
        page,
        date_subtraction: INIT_DATE_SUBTRACTION,
      }).refetch();
  }, [page, isNetworkError, isFocused]);

  useEffect(() => {
    return () => {
      setPage(INIT_PAGE);
    };
  }, [isFocused]);

  return (
    <TransactionsList
      // this is really stupid but it works for now
      // TODO: it should be number of transactions items equal to the limit * page instead of 5 * page
      data={transactions.slice(0, 7 * page)}
      isLoading={transactionsLoading}
      isError={isError}
      fetchMore={() => {
        if (data?.meta && data.meta.last_page > page) {
          setPage(page + 1);
        }
      }}
    />
  );
}
