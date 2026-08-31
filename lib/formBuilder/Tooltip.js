"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
var react_1 = __importDefault(require("react"));
var Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
var WarningOutlined_1 = __importDefault(require("@mui/icons-material/WarningOutlined"));
var HelpOutline_1 = __importDefault(require("@mui/icons-material/HelpOutline"));
var styles_1 = require("@mui/material/styles");
function Example(_a) {
    var text = _a.text, type = _a.type;
    var theme = (0, styles_1.useTheme)();
    return react_1.default.createElement(Tooltip_1.default, { disableInteractive: true, placement: 'top', title: text },
        react_1.default.createElement("span", { style: {
                textDecoration: 'underline',
            } }, type === 'alert' ? react_1.default.createElement(WarningOutlined_1.default, { style: { color: theme.palette.warning.main, fontSize: '1rem' } }) : react_1.default.createElement(HelpOutline_1.default, { color: 'primary', style: { fontSize: '1rem' } })));
}
exports.default = Example;
//# sourceMappingURL=Tooltip.js.map