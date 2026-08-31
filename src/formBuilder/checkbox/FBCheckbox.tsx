import React from "react";
import classnames from "classnames";
import Box from '@mui/material/Box';

// Box + sx rather than a plain div: these are descendant selectors, not flat properties.
const checkboxSx = {
  '& *': {
    display: 'inline-block'
  },
  '& input': {
    marginRight: '5px'
  }
};
type Props = {
  onChangeValue: (...args: Array<any>) => any;
  isChecked: boolean;
  id?: string;
  label?: string;
  use?: string;
  value?: string;
  disabled?: boolean;
  dataTest?: string;
  labelClassName?: string;
};
export default function FBCheckbox({
  onChangeValue,
  value = '',
  isChecked = false,
  label = '',
  use = 'action',
  disabled = false,
  id = '',
  dataTest = '',
  labelClassName = ''
}: Props) {
  const classes = classnames('fb-checkbox', {
    'edit-checkbox': !disabled && use === 'edit',
    'action-checkbox': !disabled && use === 'action',
    'disabled-checked-checkbox': disabled && isChecked,
    'disabled-unchecked-checkbox': disabled && !isChecked
  });
  const potentialCheckboxId = id !== '' ? id : label;
  const checkboxId = potentialCheckboxId !== '' ? potentialCheckboxId : null;
  return <Box data-test='checkbox' className={classes} sx={checkboxSx}>
      <input type='checkbox' id={checkboxId} data-test={dataTest || undefined} onChange={disabled ? () => {} : onChangeValue} value={value} disabled={disabled} checked={isChecked} />
      <div className='checkbox-overlay'>
        {label && <label htmlFor={checkboxId} className={labelClassName || undefined}>
            {label}
          </label>}
      </div>
    </Box>;
}