import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faChevronDown,
  faChevronUp,
  faCircleExclamation,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faGear,
  faHouse,
  faMagnifyingGlass,
  faMoneyBillTransfer,
  faPlus,
  faSquarePen,
  faSquarePlus,
  faSquareXmark,
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
      arrowUp: faChevronUp,
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
      add: faSquarePlus,
      edit: faSquarePen,
      delete: faSquareXmark,
    },
  };
}
