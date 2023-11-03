import { ApplicationScreenProps } from 'types/navigation';
import { isLoggedSelector } from '@/store/auth/selectors';
import { StackNames } from '@/navigators/routes';
import { useEffect } from 'react';
import { useLanguage } from '@/hooks';
import { useSelector } from 'react-redux';

type Props = {
  navigation: ApplicationScreenProps['navigation'];
};

export default function useStartup({ navigation }: Props) {
  const isLogged = useSelector(isLoggedSelector);
  useLanguage();

  const init = () => {
    if (isLogged) {
      navigation.reset({
        index: 0,
        routes: [{ name: StackNames.main }],
      });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: StackNames.start }],
    });
  };

  useEffect(() => {
    init();
  }, []);
}
