import React from 'react';
import { ScreenWithTabs } from '@/components';
import { SubScreens } from '@/navigators/routes';

export default function Achievements() {
  const { challenges, goals } = SubScreens.achievements;

  return <ScreenWithTabs screens={[{ ...challenges }, { ...goals }]} />;
}
