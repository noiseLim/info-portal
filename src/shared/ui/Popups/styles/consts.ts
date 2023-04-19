import { DropdownDirection } from '../../../types/ui';

import style from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'top left': style.optionsTopLeft,
  'top right': style.optionsTopRight,
  'bottom left': style.optionsBottonLeft,
  'bottom right': style.optionsBottomRight,
};
