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
var DependencyField_1 = __importDefault(require("./dependencies/DependencyField"));
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var TextField_1 = __importDefault(require("../textFieldContext/TextField"));
var includeValidationsContext_1 = __importDefault(require("../includeValidationsContext/includeValidationsContext"));
function CardModal(_a) {
    var componentProps = _a.componentProps, onChange = _a.onChange, isOpen = _a.isOpen, onClose = _a.onClose, TypeSpecificParameters = _a.TypeSpecificParameters;
    // assign state values for parameters that should only change on hitting "Save"
    var _b = React.useState(componentProps), componentPropsState = _b[0], setComponentProps = _b[1];
    React.useEffect(function () {
        setComponentProps(componentProps);
    }, [componentProps]);
    var includeValidations = React.useContext(includeValidationsContext_1.default);
    return React.createElement(Dialog_1.default, { open: isOpen, "data-test": 'card-modal' },
        React.createElement(DialogTitle_1.default, null,
            React.createElement("div", { style: {
                    display: componentProps.hideKey ? 'none' : 'initial'
                } },
                React.createElement("h3", null, "Additional Settings"))),
        React.createElement(DialogContent_1.default, null,
            includeValidations && React.createElement(TypeSpecificParameters, { parameters: componentPropsState, onChange: function (newState) {
                    setComponentProps(__assign(__assign({}, componentPropsState), newState));
                } }),
            React.createElement("div", null,
                React.createElement(TextField_1.default, { label: "Column Size", helperText: React.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout', target: '_blank', rel: 'noopener noreferrer' }, "Set the column size of the input"), value: componentPropsState['ui:column'] ? componentPropsState['ui:column'] : '', placeholder: 'Column size', key: 'ui:column', type: 'number', inputProps: { min: 0 }, onChange: function (ev) {
                        setComponentProps(__assign(__assign({}, componentPropsState), { 'ui:column': ev.target.value }));
                    } })),
            React.createElement(DependencyField_1.default, { parameters: componentPropsState, onChange: function (newState) {
                    setComponentProps(__assign(__assign({}, componentPropsState), newState));
                } })),
        React.createElement(DialogActions_1.default, { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement(Button_1.default, { variant: "contained", onClick: function () {
                    onClose();
                    setComponentProps(componentProps);
                } }, "Cancel"),
            React.createElement(Button_1.default, { variant: "contained", onClick: function () {
                    onClose();
                    onChange(componentPropsState);
                }, color: 'primary' }, "Save")));
}
exports.default = CardModal;
//# sourceMappingURL=CardModal.js.map