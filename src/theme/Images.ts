import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faChevronDown,
  faCircleExclamation,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faGear,
  faHouse,
  faMagnifyingGlass,
  faMoneyBillTransfer,
  faPlus,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeVariables } from 'types/theme';

export default function ({}: ThemeVariables) {
  return {
    logo: require('./assets/images/pocket-buddy-logo.png'),
    icons: {
      apple: faApple,
      google: faGoogle,
      arrowDown: faChevronDown,
      settings: faGear,
      eyeOpen: faEye,
      eyeClosed: faEyeSlash,
      home: faHouse,
      moneyTransfer: faMoneyBillTransfer,
      plus: faPlus,
      trophy: faTrophy,
      notification: faBell,
      search: faMagnifyingGlass,
      reset: faCircleXmark,
      warning: faCircleExclamation,
    },
  };
}
