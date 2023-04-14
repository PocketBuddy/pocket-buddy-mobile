import { IconDefinition as BrandsIconType } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition as SolidIconType } from '@fortawesome/free-solid-svg-icons';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum ButtonRounded {
  Right = 'right',
  Left = 'left',
}

export enum BrandMode {
  Contain = 'contain',
  Cover = 'cover',
  Stretch = 'stretch',
  Repeat = 'repeat',
  Center = 'center',
}

export enum IconType {
  Primary = 'primary',
  Secondary = 'secondary',
  Inactive = 'inactive',
}

export enum SpinnerSize {
  Small = 'small',
  Large = 'large',
}

export type IconTypes = BrandsIconType | SolidIconType;

export enum ParagraphAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type TabScreens = {
  parentScreenName: string;
  name: string;
  component: React.FC;
}[];

export enum KeyboardPersisted {
  Never = 'never',
  Always = 'always',
  Handled = 'handled',
}

export enum KeyboardDismissMode {
  None = 'none',
  OnDrag = 'on-drag',
}

export enum ToastType {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}
