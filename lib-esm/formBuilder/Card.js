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
import Tooltip from '@mui/material/Tooltip';
import FBCheckbox from "./checkbox/FBCheckbox.js";
import Collapse from "./Collapse/Collapse.js";
import CardModal from "./CardModal.js";
import CardGeneralParameterInputs from "./CardGeneralParameterInputs.js";
import Add from "./Add.js";
import FBTooltip from "./Tooltip.js";
import { getRandomId } from "./utils.js";
import IconButton from '@mui/material/IconButton';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import includeValidationsContext from "../includeValidationsContext/includeValidationsContext.js";
var cardInteractionsStyle = {
    margin: '.5em 1.5em',
    display: 'flex',
};
export default function Card(_a) {
    var componentProps = _a.componentProps, onChange = _a.onChange, onDelete = _a.onDelete, onMoveUp = _a.onMoveUp, onMoveDown = _a.onMoveDown, TypeSpecificParameters = _a.TypeSpecificParameters, addElem = _a.addElem, cardOpen = _a.cardOpen, setCardOpen = _a.setCardOpen, allFormInputs = _a.allFormInputs, mods = _a.mods, _b = _a.showObjectNameInput, showObjectNameInput = _b === void 0 ? true : _b;
    var _c = React.useState(false), modalOpen = _c[0], setModalOpen = _c[1];
    var elementId = React.useMemo(getRandomId, []);
    var includeValidations = React.useContext(includeValidationsContext);
    return React.createElement(React.Fragment, null,
        React.createElement(Collapse, { isOpen: cardOpen, toggleCollapse: function () { return setCardOpen(!cardOpen); }, title: React.createElement(React.Fragment, null,
                React.createElement("span", null,
                    React.createElement(Tooltip, { disableInteractive: true, placement: 'top', title: "Move form element up" },
                        React.createElement("span", null,
                            React.createElement(IconButton, { size: "small", onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onMoveUp === null || onMoveUp === void 0 ? void 0 : onMoveUp();
                                } },
                                React.createElement(ArrowUpward, null)))),
                    React.createElement(Tooltip, { disableInteractive: true, placement: 'top', title: "Move form element down" },
                        React.createElement("span", null,
                            React.createElement(IconButton, { size: "small", onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onMoveDown === null || onMoveDown === void 0 ? void 0 : onMoveDown();
                                } },
                                React.createElement(ArrowDownward, null))))),
                React.createElement(Divider, { orientation: "vertical", flexItem: true }),
                React.createElement("span", { style: { marginLeft: '.5em' }, onClick: function () { return setCardOpen(!cardOpen); } },
                    React.createElement(Typography, { variant: "subtitle1", component: "h4" },
                        componentProps.title || componentProps.name,
                        ' '),
                    componentProps.parent ? React.createElement(FBTooltip, { text: "Depends on ".concat(componentProps.parent), type: 'alert' }) : '',
                    componentProps.$ref !== undefined ? React.createElement(FBTooltip, { text: "Is an instance of pre-configured component ".concat(componentProps.$ref), type: 'alert' }) : '')), className: "card-container ".concat(componentProps.dependent ? 'card-dependent' : '', " ").concat(componentProps.$ref === undefined ? '' : 'card-reference') },
            React.createElement("div", { style: {
                    borderBottom: '1px solid gray',
                    margin: '.5em 1.5em 0 1.5em',
                } },
                React.createElement(CardGeneralParameterInputs, { parameters: componentProps, onChange: onChange, allFormInputs: allFormInputs, mods: mods, showObjectNameInput: showObjectNameInput })),
            React.createElement("div", { style: cardInteractionsStyle },
                React.createElement(Tooltip, { disableInteractive: true, placement: "top", title: "Additional configurations for this form element" },
                    React.createElement(IconButton, { color: "primary", onClick: function () { return setModalOpen(true); } },
                        React.createElement(EditIcon, null))),
                React.createElement(Tooltip, { disableInteractive: true, placement: 'top', title: "Delete form element" },
                    React.createElement(IconButton, { onClick: onDelete },
                        React.createElement(DeleteIcon, { color: "error" }))),
                React.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, includeValidations && React.createElement(FBCheckbox, { onChangeValue: function () { return onChange(__assign(__assign({}, componentProps), { required: !componentProps.required })); }, isChecked: !!componentProps.required, label: 'Required', id: "".concat(elementId, "_required") }))),
            React.createElement(CardModal, { componentProps: componentProps, isOpen: modalOpen, onClose: function () { return setModalOpen(false); }, onChange: function (newComponentProps) {
                    onChange(newComponentProps);
                }, TypeSpecificParameters: TypeSpecificParameters })),
        addElem ? React.createElement(Add, { addElem: function (choice) { return addElem(choice); } }) : '');
}
//# sourceMappingURL=Card.js.map