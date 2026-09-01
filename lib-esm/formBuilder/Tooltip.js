/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import Warn from '@mui/icons-material/WarningOutlined';
import Help from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';
export default function Example(_a) {
    var text = _a.text, type = _a.type;
    var theme = useTheme();
    return React.createElement(Tooltip, { disableInteractive: true, placement: 'top', title: text },
        React.createElement("span", { style: {
                textDecoration: 'underline',
            } }, type === 'alert' ? React.createElement(Warn, { style: { color: theme.palette.warning.main, fontSize: '1rem' } }) : React.createElement(Help, { color: 'primary', style: { fontSize: '1rem' } })));
}
//# sourceMappingURL=Tooltip.js.map