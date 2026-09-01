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
import * as React from "react";
import DependencyField from "./dependencies/DependencyField.js";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '../textFieldContext/TextField.js';
import includeValidationsContext from "../includeValidationsContext/includeValidationsContext.js";
export default function CardModal(_a) {
    var componentProps = _a.componentProps, onChange = _a.onChange, isOpen = _a.isOpen, onClose = _a.onClose, TypeSpecificParameters = _a.TypeSpecificParameters;
    // assign state values for parameters that should only change on hitting "Save"
    var _b = React.useState(componentProps), componentPropsState = _b[0], setComponentProps = _b[1];
    React.useEffect(function () {
        setComponentProps(componentProps);
    }, [componentProps]);
    var includeValidations = React.useContext(includeValidationsContext);
    return React.createElement(Dialog, { open: isOpen, "data-test": 'card-modal' },
        React.createElement(DialogTitle, null,
            React.createElement("div", { style: {
                    display: componentProps.hideKey ? 'none' : 'initial'
                } },
                React.createElement("h3", null, "Additional Settings"))),
        React.createElement(DialogContent, null,
            includeValidations && React.createElement(TypeSpecificParameters, { parameters: componentPropsState, onChange: function (newState) {
                    setComponentProps(__assign(__assign({}, componentPropsState), newState));
                } }),
            React.createElement("div", null,
                React.createElement(TextField, { label: "Column Size", helperText: React.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout', target: '_blank', rel: 'noopener noreferrer' }, "Set the column size of the input"), value: componentPropsState['ui:column'] ? componentPropsState['ui:column'] : '', placeholder: 'Column size', key: 'ui:column', type: 'number', inputProps: { min: 0 }, onChange: function (ev) {
                        setComponentProps(__assign(__assign({}, componentPropsState), { 'ui:column': ev.target.value }));
                    } })),
            React.createElement(DependencyField, { parameters: componentPropsState, onChange: function (newState) {
                    setComponentProps(__assign(__assign({}, componentPropsState), newState));
                } })),
        React.createElement(DialogActions, { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement(Button, { variant: "contained", color: "inherit", onClick: function () {
                    onClose();
                    setComponentProps(componentProps);
                } }, "Cancel"),
            React.createElement(Button, { variant: "contained", onClick: function () {
                    onClose();
                    onChange(componentPropsState);
                }, color: 'primary' }, "Save")));
}
//# sourceMappingURL=CardModal.js.map