/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import Warn from '@mui/icons-material/WarningOutlined';
import Help from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';

export default function Example({
  text,
  type,
}: {
  text: React.ReactNode;
  type: "alert" | "help";
}) {
  const theme = useTheme()
  return <Tooltip disableInteractive placement='top' title={text}>
    <span style={{
      textDecoration: 'underline',
    }}>
      {type === 'alert' ? <Warn style={{ color: theme.palette.warning.main, fontSize: '1rem'}} /> : <Help color='primary' style={{ fontSize: '1rem' }} />}
    </span>
  </Tooltip>
}