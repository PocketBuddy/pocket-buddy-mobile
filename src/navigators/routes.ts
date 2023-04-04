import { Auth, Login, Register, Startup } from '@/screens';

export const MainScreens = Object.freeze({
  startup: {
    name: 'Startup',
    component: Startup,
  },
  auth: {
    name: 'Auth',
    component: Auth,
  },
});

export const SubScreens = Object.freeze({
  auth: {
    login: {
      parentScreenName: MainScreens.auth.name,
      name: 'Login',
      component: Login,
    },
    register: {
      parentScreenName: MainScreens.auth.name,
      name: 'Register',
      component: Register,
    },
  },
});
