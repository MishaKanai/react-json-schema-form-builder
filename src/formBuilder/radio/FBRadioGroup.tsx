import React from "react";
import classnames from "classnames";
import Box from '@mui/material/Box';
import FBRadioButton from "./FBRadioButton";

// Box + sx rather than a plain div: these are descendant selectors, not flat properties.
const radioSx = {
  '& .fb-radio-button': {
    display: 'block',
    '& input[type="radio"]': {
      marginRight: '5px',
      marginBottom: 0,
      height: '1em',
      verticalAlign: 'middle'
    },
    '& input[type="radio"] + label': {
      marginTop: 0,
      marginBottom: 0,
      verticalAlign: 'middle'
    }
  }
};
type Props = {
  options: Array<{
    label: React.ReactNode;
    value: string | number;
  }>;
  defaultValue?: any;
  horizontal?: boolean;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange: (arg0: any) => void;
};
export default function FBRadioGroup(props: Props) {
  const {
    options,
    defaultValue,
    onChange,
    horizontal,
    id,
    autoFocus,
    disabled
  } = props;
  const name = Math.random().toString();
  const classes = classnames('fb-radio-group', {
    horizontal
  });
  return <Box id={id} className={classes} sx={radioSx}>
      {options.map((option, index) => <FBRadioButton value={option.value} label={option.label} /* id={id} */ name={name} key={option.value} checked={option.value === defaultValue} autoFocus={autoFocus && index === 1} onChange={onChange} disabled={disabled} />)}
    </Box>;
}