"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Accordion_1 = __importDefault(require("@material-ui/core/Accordion"));
var AccordionDetails_1 = __importDefault(require("@material-ui/core/AccordionDetails"));
var AccordionSummary_1 = __importDefault(require("@material-ui/core/AccordionSummary"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var utils_1 = require("../utils");
function Collapse(props) {
    var id = react_1.default.useMemo(utils_1.getRandomId, []);
    return (react_1.default.createElement(Accordion_1.default, { disabled: props.disableToggle, expanded: props.isOpen, onChange: props.disableToggle ? undefined : props.toggleCollapse },
        react_1.default.createElement(AccordionSummary_1.default, { style: { paddingLeft: '.5em' }, expandIcon: react_1.default.createElement(ExpandMore_1.default, null), "aria-controls": id + "-content", id: id + "-header" }, props.title),
        react_1.default.createElement(AccordionDetails_1.default, null,
            react_1.default.createElement("div", { style: { width: '100%' } }, props.children))));
}
exports.default = Collapse;
//# sourceMappingURL=Collapse.js.map