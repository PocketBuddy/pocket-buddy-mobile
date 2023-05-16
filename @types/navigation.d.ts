import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type StartParamsList = {
  Auth: undefined;
  Login: { name?: string };
  Register: undefined;
};

export type MainParamsList = {
  Home: undefined;
  Transactions: undefined;
  History: undefined;
  Stats: undefined;
  Achievements: undefined;
  Challenges: undefined;
  Goals: undefined;
  Notifications: undefined;
};

export type MainSettingsParamsList = {
  Settings: undefined;
  ManageCategories: undefined;
  ManagePriorities: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Start: NavigatorScreenParams<StartParamsList>;
  Main: NavigatorScreenParams<MainParamsList>;
  MainSettings: NavigatorScreenParams<MainSettingsParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
