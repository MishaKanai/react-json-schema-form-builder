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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FBCheckbox from "./checkbox/FBCheckbox.js";
import Collapse from "./Collapse/Collapse.js";
import CardModal from "./CardModal.js";
import { CardDefaultParameterInputs } from "./defaults/defaultInputs.js";
import FBTooltip from "./Tooltip.js";
import Add from "./Add.js";
import Card from "./Card.js";
import { checkForUnsupportedFeatures, generateElementComponentsFromSchemas, countElementsFromSchema, addCardObj, addSectionObj, onDragEnd } from "./utils.js";
import { getRandomId } from "./utils.js";
import Tooltip from '@mui/material/Tooltip';
// Alert/AlertTitle moved from @material-ui/lab into @mui/material in v5.
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '../textFieldContext/TextField.js';
import IconButton from '@mui/material/IconButton';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import includeValidationsContext from "../includeValidationsContext/includeValidationsContext.js";
var cardInteractionsStyle = {
    margin: '.5em 1.5em',
    display: 'flex'
};
export default function Section(_a) {
    var _b;
    var name = _a.name, required = _a.required, schema = _a.schema, uischema = _a.uischema, onChange = _a.onChange, onNameChange = _a.onNameChange, onRequireToggle = _a.onRequireToggle, onDependentsChange = _a.onDependentsChange, onDelete = _a.onDelete, onMoveUp = _a.onMoveUp, onMoveDown = _a.onMoveDown, path = _a.path, definitionData = _a.definitionData, definitionUi = _a.definitionUi, hideKey = _a.hideKey, reference = _a.reference, dependents = _a.dependents, dependent = _a.dependent, parent = _a.parent, neighborNames = _a.neighborNames, addElem = _a.addElem, cardOpen = _a.cardOpen, setCardOpen = _a.setCardOpen, allFormInputs = _a.allFormInputs, mods = _a.mods, categoryHash = _a.categoryHash;
    var unsupportedFeatures = checkForUnsupportedFeatures(schema || {}, uischema || {}, allFormInputs);
    var schemaData = schema || {};
    var elementNum = countElementsFromSchema(schemaData);
    var defaultCollapseStates = __spreadArray([], Array(elementNum), true).map(function () { return false; });
    var _c = React.useState(defaultCollapseStates), cardOpenArray = _c[0], setCardOpenArray = _c[1];
    // keep name in state to avoid losing focus
    var _d = React.useState(name), keyName = _d[0], setKeyName = _d[1];
    var _e = React.useState(null), keyError = _e[0], setKeyError = _e[1];
    // keep requirements in state to avoid rapid updates
    var _f = React.useState(false), modalOpen = _f[0], setModalOpen = _f[1];
    var elementId = React.useMemo(getRandomId, []);
    var includeValidations = React.useContext(includeValidationsContext);
    var objectNameHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionObjectName === 'string' ? mods.tooltipDescriptions.cardSectionObjectName : 'The key to the object that will represent this form section.';
    var displayNameHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDisplayName === 'string' ? mods.tooltipDescriptions.cardSectionDisplayName : 'The name of the form section that will be shown to users of the form.';
    var sectionDescriptionHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDescription === 'string' ? mods.tooltipDescriptions.cardSectionDescription : 'A description of the section which will be visible on the form.';
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
                        schemaData.title || keyName,
                        ' ',
                        parent ? React.createElement(FBTooltip, { text: "Depends on ".concat(parent), type: 'alert' }) : ''))), className: "section-container ".concat(/* classes.sectionContainer*/ '', " ").concat(dependent ? 'section-dependent' : '', " ").concat(reference ? 'section-reference' : '') },
            React.createElement("div", null,
                React.createElement("div", null,
                    reference ? React.createElement("div", { className: 'section-entry section-reference' },
                        React.createElement(FormControl, { variant: "standard" },
                            React.createElement(InputLabel, { shrink: true, id: elementId + "-select-label" }, "Reference Section"),
                            React.createElement(Select, { labelId: elementId + "-select-label", id: elementId + "-select", value: reference, label: "Reference Section", onChange: function (e) {
                                    onChange(schema, uischema, e.target.value);
                                } }, Object.keys(definitionData).map(function (key) {
                                var value = "#/definitions/".concat(key);
                                return (React.createElement(MenuItem, { key: value, value: value }, value));
                            })))) : '',
                    React.createElement("div", { style: { display: 'flex' } },
                        React.createElement("div", { style: { margin: '.5em' }, "data-test": 'section-object-name' },
                            React.createElement(TextField, { label: "Section Object Name", error: keyError !== null, value: keyName || '', placeholder: 'Key', type: 'text', onChange: function (ev) { return setKeyName(ev.target.value); }, onBlur: function (ev) {
                                    var value = ev.target.value;
                                    if (value === name || !(neighborNames && neighborNames.includes(value))) {
                                        setKeyError(null);
                                        onNameChange(value);
                                    }
                                    else {
                                        setKeyName(name);
                                        setKeyError("\"".concat(value, "\" is already in use."));
                                        onNameChange(name);
                                    }
                                }, disabled: hideKey, helperText: keyError !== null && keyError !== void 0 ? keyError : objectNameHelperText })),
                        React.createElement("div", { style: { margin: '.5em' }, "data-test": 'section-display-name' },
                            React.createElement(TextField, { label: "Section Display Name", helperText: displayNameHelperText, value: schemaData.title || '', placeholder: 'Title', onChange: function (ev) { return onChange(__assign(__assign({}, schema), { title: ev.target.value }), uischema); } })),
                        React.createElement("div", { style: { margin: '.5em' }, "data-test": 'section-description' },
                            React.createElement(TextField, { label: "Section Description", value: schemaData.description || '', placeholder: 'Description', onChange: function (ev) { return onChange(__assign(__assign({}, schema), { description: ev.target.value }), uischema); }, helperText: sectionDescriptionHelperText })),
                        React.createElement(Alert, { style: {
                                display: unsupportedFeatures.length === 0 ? 'none' : 'block'
                            }, severity: "warning" },
                            React.createElement(AlertTitle, null, "Unsupported Features"),
                            unsupportedFeatures.map(function (message) { return React.createElement("li", { key: "".concat(elementId, "_").concat(message) }, message); })))),
                React.createElement("div", { className: 'section-body' },
                    React.createElement(DragDropContext, { onDragEnd: function (result) { return onDragEnd(result, {
                            schema: schema,
                            uischema: uischema,
                            onChange: onChange,
                            definitionData: definitionData,
                            definitionUi: definitionUi,
                            categoryHash: categoryHash
                        }); }, className: 'section-body' },
                        React.createElement(Droppable, { droppableId: 'droppable' }, function (providedDroppable) { return React.createElement("div", __assign({ ref: providedDroppable.innerRef }, providedDroppable.droppableProps),
                            generateElementComponentsFromSchemas({
                                schemaData: schema,
                                uiSchemaData: uischema,
                                onChange: onChange,
                                path: path,
                                definitionData: definitionData,
                                definitionUi: definitionUi,
                                cardOpenArray: cardOpenArray,
                                setCardOpenArray: setCardOpenArray,
                                allFormInputs: allFormInputs,
                                mods: mods,
                                categoryHash: categoryHash,
                                Card: Card,
                                Section: Section
                            }).map(function (element, index) { return React.createElement(Draggable, { key: element.key, draggableId: element.key, index: index }, function (providedDraggable) { return React.createElement("div", __assign({ ref: providedDraggable.innerRef }, providedDraggable.draggableProps, providedDraggable.dragHandleProps), element); }); }),
                            providedDroppable.placeholder); }))),
                React.createElement("div", { className: 'section-footer' },
                    React.createElement(Add, { addElem: function (choice) {
                            if (choice === 'card') {
                                addCardObj({
                                    schema: schema,
                                    uischema: uischema,
                                    mods: mods,
                                    onChange: onChange,
                                    definitionData: definitionData,
                                    definitionUi: definitionUi,
                                    categoryHash: categoryHash
                                });
                            }
                            else if (choice === 'section') {
                                addSectionObj({
                                    schema: schema,
                                    uischema: uischema,
                                    onChange: onChange,
                                    definitionData: definitionData,
                                    definitionUi: definitionUi,
                                    categoryHash: categoryHash
                                });
                            }
                        }, hidden: schemaData.properties && Object.keys(schemaData.properties).length !== 0 })),
                React.createElement("div", { style: cardInteractionsStyle },
                    React.createElement(Tooltip, { disableInteractive: true, placement: "top", title: "Additional configurations for this form element" },
                        React.createElement(IconButton, { color: "primary", onClick: function () { return setModalOpen(true); } },
                            React.createElement(EditIcon, null))),
                    React.createElement(Tooltip, { disableInteractive: true, placement: 'top', title: "Delete form element" },
                        React.createElement(IconButton, { onClick: onDelete },
                            React.createElement(DeleteIcon, { color: "error" }))),
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, includeValidations && React.createElement(FBCheckbox, { onChangeValue: function () { return onRequireToggle(); }, isChecked: required, label: 'Required', id: "".concat(elementId, "_required") })))),
            React.createElement(CardModal, { componentProps: {
                    dependents: dependents,
                    neighborNames: neighborNames,
                    name: keyName,
                    schema: schema,
                    type: 'object',
                    'ui:column': (_b = uischema['ui:column']) !== null && _b !== void 0 ? _b : ''
                }, isOpen: modalOpen, onClose: function () { return setModalOpen(false); }, onChange: function (newComponentProps) {
                    onDependentsChange(newComponentProps.dependents);
                    onChange(schema, __assign(__assign({}, uischema), { 'ui:column': newComponentProps['ui:column'] }));
                }, TypeSpecificParameters: CardDefaultParameterInputs })),
        addElem ? React.createElement(Add, { addElem: function (choice) { return addElem(choice); } }) : '');
}
//# sourceMappingURL=Section.js.map