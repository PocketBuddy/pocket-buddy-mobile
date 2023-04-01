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
      name: 'Login',
      component: Login,
    },
    register: {
      name: 'Register',
      component: Register,
    },
  },
});
