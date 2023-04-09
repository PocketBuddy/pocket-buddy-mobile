import React from 'react';
import { ScreenWithTabs } from '@/components';
import { SubScreens } from '@/navigators/routes';

export default function Transactions() {
  const { history, stats } = SubScreens.transactions;

  return <ScreenWithTabs screens={[{ ...history }, { ...stats }]} />;
}
