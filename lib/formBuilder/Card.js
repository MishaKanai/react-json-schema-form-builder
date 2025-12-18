"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var FBCheckbox_1 = __importDefault(require("./checkbox/FBCheckbox"));
var Collapse_1 = __importDefault(require("./Collapse/Collapse"));
var CardModal_1 = __importDefault(require("./CardModal"));
var CardGeneralParameterInputs_1 = __importDefault(require("./CardGeneralParameterInputs"));
var Add_1 = __importDefault(require("./Add"));
var Tooltip_2 = __importDefault(require("./Tooltip"));
var utils_1 = require("./utils");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var ArrowUpward_1 = __importDefault(require("@material-ui/icons/ArrowUpward"));
var ArrowDownward_1 = __importDefault(require("@material-ui/icons/ArrowDownward"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var styles_1 = require("@material-ui/core/styles");
var includeValidationsContext_1 = __importDefault(require("../includeValidationsContext/includeValidationsContext"));
var useStyles = (0, styles_1.makeStyles)({
    cardInteractions: {
        margin: '.5em 1.5em',
        display: 'flex',
    }
});
function Card(_a) {
    var componentProps = _a.componentProps, onChange = _a.onChange, onDelete = _a.onDelete, onMoveUp = _a.onMoveUp, onMoveDown = _a.onMoveDown, TypeSpecificParameters = _a.TypeSpecificParameters, addElem = _a.addElem, cardOpen = _a.cardOpen, setCardOpen = _a.setCardOpen, allFormInputs = _a.allFormInputs, mods = _a.mods, _b = _a.showObjectNameInput, showObjectNameInput = _b === void 0 ? true : _b;
    var classes = useStyles();
    var _c = React.useState(false), modalOpen = _c[0], setModalOpen = _c[1];
    var elementId = React.useMemo(utils_1.getRandomId, []);
    var includeValidations = React.useContext(includeValidationsContext_1.default);
    return React.createElement(React.Fragment, null,
        React.createElement(Collapse_1.default, { isOpen: cardOpen, toggleCollapse: function () { return setCardOpen(!cardOpen); }, title: React.createElement(React.Fragment, null,
                React.createElement("span", null,
                    React.createElement(Tooltip_1.default, { placement: 'top', title: "Move form element up" },
                        React.createElement("span", null,
                            React.createElement(IconButton_1.default, { size: "small", onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onMoveUp === null || onMoveUp === void 0 ? void 0 : onMoveUp();
                                } },
                                React.createElement(ArrowUpward_1.default, null)))),
                    React.createElement(Tooltip_1.default, { placement: 'top', title: "Move form element down" },
                        React.createElement("span", null,
                            React.createElement(IconButton_1.default, { size: "small", onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onMoveDown === null || onMoveDown === void 0 ? void 0 : onMoveDown();
                                } },
                                React.createElement(ArrowDownward_1.default, null))))),
                React.createElement(Divider_1.default, { orientation: "vertical", flexItem: true }),
                React.createElement("span", { style: { marginLeft: '.5em' }, onClick: function () { return setCardOpen(!cardOpen); } },
                    React.createElement(Typography_1.default, { variant: "subtitle1", component: "h4" },
                        componentProps.title || componentProps.name,
                        ' '),
                    componentProps.parent ? React.createElement(Tooltip_2.default, { text: "Depends on ".concat(componentProps.parent), type: 'alert' }) : '',
                    componentProps.$ref !== undefined ? React.createElement(Tooltip_2.default, { text: "Is an instance of pre-configured component ".concat(componentProps.$ref), type: 'alert' }) : '')), className: "card-container ".concat(componentProps.dependent ? 'card-dependent' : '', " ").concat(componentProps.$ref === undefined ? '' : 'card-reference') },
            React.createElement("div", { style: {
                    borderBottom: '1px solid gray',
                    margin: '.5em 1.5em 0 1.5em',
                } },
                React.createElement(CardGeneralParameterInputs_1.default, { parameters: componentProps, onChange: onChange, allFormInputs: allFormInputs, mods: mods, showObjectNameInput: showObjectNameInput })),
            React.createElement("div", { className: classes.cardInteractions },
                React.createElement(Tooltip_1.default, { placement: "top", title: "Additional configurations for this form element" },
                    React.createElement(IconButton_1.default, { color: "primary", onClick: function () { return setModalOpen(true); } },
                        React.createElement(Edit_1.default, null))),
                React.createElement(Tooltip_1.default, { placement: 'top', title: "Delete form element" },
                    React.createElement(IconButton_1.default, { onClick: onDelete },
                        React.createElement(Delete_1.default, { color: "error" }))),
                React.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, includeValidations && React.createElement(FBCheckbox_1.default, { onChangeValue: function () { return onChange(__assign(__assign({}, componentProps), { required: !componentProps.required })); }, isChecked: !!componentProps.required, label: 'Required', id: "".concat(elementId, "_required") }))),
            React.createElement(CardModal_1.default, { componentProps: componentProps, isOpen: modalOpen, onClose: function () { return setModalOpen(false); }, onChange: function (newComponentProps) {
                    onChange(newComponentProps);
                }, TypeSpecificParameters: TypeSpecificParameters })),
        addElem ? React.createElement(Add_1.default, { addElem: function (choice) { return addElem(choice); } }) : '');
}
exports.default = Card;
//# sourceMappingURL=Card.js.map