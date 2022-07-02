/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Warn from '@material-ui/icons/WarningOutlined';
import Help from '@material-ui/icons/HelpOutline';
import useTheme from '@material-ui/core/styles/useTheme';

export default function Example({
  text,
  type,
}: {
  text: React.ReactNode;
  type: "alert" | "help";
}) {
  const theme = useTheme()
  return <Tooltip placement='top' title={text}>
    <span style={{
      textDecoration: 'underline',
    }}>
      {type === 'alert' ? <Warn style={{ color: theme.palette.warning.main, fontSize: '1rem'}} /> : <Help color='primary' style={{ fontSize: '1rem' }} />}
    </span>
  </Tooltip>
}