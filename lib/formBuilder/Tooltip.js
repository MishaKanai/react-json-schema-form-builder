"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
var react_1 = __importDefault(require("react"));
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var WarningOutlined_1 = __importDefault(require("@material-ui/icons/WarningOutlined"));
var HelpOutline_1 = __importDefault(require("@material-ui/icons/HelpOutline"));
var useTheme_1 = __importDefault(require("@material-ui/core/styles/useTheme"));
function Example(_a) {
    var text = _a.text, type = _a.type;
    var theme = (0, useTheme_1.default)();
    return react_1.default.createElement(Tooltip_1.default, { placement: 'top', title: text },
        react_1.default.createElement("span", { style: {
                textDecoration: 'underline',
            } }, type === 'alert' ? react_1.default.createElement(WarningOutlined_1.default, { style: { color: theme.palette.warning.main, fontSize: '1rem' } }) : react_1.default.createElement(HelpOutline_1.default, { color: 'primary', style: { fontSize: '1rem' } })));
}
exports.default = Example;
//# sourceMappingURL=Tooltip.js.map