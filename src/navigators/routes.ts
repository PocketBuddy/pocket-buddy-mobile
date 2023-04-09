import {
  Achievements,
  Auth,
  Challenges,
  Goals,
  History,
  Home,
  Login,
  Notifications,
  Register,
  Settings,
  Startup,
  Stats,
  Transactions,
} from '@/screens';

export enum StackNames {
  start = 'Start',
  main = 'Main',
  independent = 'Independent',
}

export enum ScreenNames {
  startup = 'Startup',
  auth = 'Auth',
  login = 'Login',
  register = 'Register',
  home = 'Home',
  transactions = 'Transactions',
  history = 'History',
  stats = 'Stats',
  achievements = 'Achievements',
  challenges = 'Challenges',
  goals = 'Goals',
  notifications = 'Notifications',
  settings = 'Settings',
}

export const MainScreens = Object.freeze({
  startup: {
    name: ScreenNames.startup,
    component: Startup,
  },
  auth: {
    name: ScreenNames.auth,
    component: Auth,
  },
  home: {
    name: ScreenNames.home,
    component: Home,
  },
  transactions: {
    name: ScreenNames.transactions,
    component: Transactions,
  },
  achievements: {
    name: ScreenNames.achievements,
    component: Achievements,
  },
  notifications: {
    name: ScreenNames.notifications,
    component: Notifications,
  },
  settings: {
    name: ScreenNames.settings,
    component: Settings,
  },
});

export const SubScreens = Object.freeze({
  auth: {
    login: {
      parentScreenName: MainScreens.auth.name,
      name: ScreenNames.login,
      component: Login,
    },
    register: {
      parentScreenName: MainScreens.auth.name,
      name: ScreenNames.register,
      component: Register,
    },
  },
  transactions: {
    history: {
      parentScreenName: MainScreens.transactions.name,
      name: ScreenNames.history,
      component: History,
    },
    stats: {
      parentScreenName: MainScreens.transactions.name,
      name: ScreenNames.stats,
      component: Stats,
    },
  },
  achievements: {
    challenges: {
      parentScreenName: MainScreens.achievements.name,
      name: ScreenNames.challenges,
      component: Challenges,
    },
    goals: {
      parentScreenName: MainScreens.achievements.name,
      name: ScreenNames.goals,
      component: Goals,
    },
  },
});
