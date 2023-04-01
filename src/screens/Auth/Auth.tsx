import React from 'react';
import { ScreenWithTabs } from '@/components';
import { SubScreens } from '@/navigators/routes';

export default function Auth() {
  const { login, register } = SubScreens.auth;

  return <ScreenWithTabs screens={[{ ...login }, { ...register }]} />;
}
