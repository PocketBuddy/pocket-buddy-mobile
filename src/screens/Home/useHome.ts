import { userLoadingSelector, userSelector } from '@/store/user/selectors';
import { isLoggedSelector } from '@/store/auth/selectors';
import { useEffect } from 'react';
import { useLazyGetUserQuery } from '@/services/modules/user';
import { useNetworkError } from '@/hooks';
import { useSelector } from 'react-redux';

export default function useHome() {
  const [getUser] = useLazyGetUserQuery();
  const { isNetworkError } = useNetworkError();
  const isLogged = useSelector(isLoggedSelector);
  const user = useSelector(userSelector);
  const isUserLoading = useSelector(userLoadingSelector);

  useEffect(() => {
    if (!isUserLoading && user.id === -1 && isLogged) {
      !isNetworkError && getUser({}).refetch();
    }
  }, [user.id, isUserLoading, isLogged, isNetworkError]);

  return {
    hello: {
      userName: user.name,
      isLoading: isUserLoading,
    },
  };
}
