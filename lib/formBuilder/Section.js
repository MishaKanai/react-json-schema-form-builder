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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var FBCheckbox_1 = __importDefault(require("./checkbox/FBCheckbox"));
var Collapse_1 = __importDefault(require("./Collapse/Collapse"));
var CardModal_1 = __importDefault(require("./CardModal"));
var defaultInputs_1 = require("./defaults/defaultInputs");
var Tooltip_1 = __importDefault(require("./Tooltip"));
var Add_1 = __importDefault(require("./Add"));
var Card_1 = __importDefault(require("./Card"));
var utils_1 = require("./utils");
var utils_2 = require("./utils");
var Tooltip_2 = __importDefault(require("@material-ui/core/Tooltip"));
var Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
var AlertTitle_1 = __importDefault(require("@material-ui/lab/AlertTitle"));
var TextField_1 = __importDefault(require("../textFieldContext/TextField"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var ArrowUpward_1 = __importDefault(require("@material-ui/icons/ArrowUpward"));
var ArrowDownward_1 = __importDefault(require("@material-ui/icons/ArrowDownward"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
var styles_1 = require("@material-ui/core/styles");
var includeValidationsContext_1 = __importDefault(require("../includeValidationsContext/includeValidationsContext"));
var useStyles = (0, styles_1.makeStyles)({
    cardInteractions: {
        margin: '.5em 1.5em',
        display: 'flex'
    }
});
function Section(_a) {
    var _b;
    var name = _a.name, required = _a.required, schema = _a.schema, uischema = _a.uischema, onChange = _a.onChange, onNameChange = _a.onNameChange, onRequireToggle = _a.onRequireToggle, onDependentsChange = _a.onDependentsChange, onDelete = _a.onDelete, onMoveUp = _a.onMoveUp, onMoveDown = _a.onMoveDown, path = _a.path, definitionData = _a.definitionData, definitionUi = _a.definitionUi, hideKey = _a.hideKey, reference = _a.reference, dependents = _a.dependents, dependent = _a.dependent, parent = _a.parent, neighborNames = _a.neighborNames, addElem = _a.addElem, cardOpen = _a.cardOpen, setCardOpen = _a.setCardOpen, allFormInputs = _a.allFormInputs, mods = _a.mods, categoryHash = _a.categoryHash;
    var classes = useStyles();
    var unsupportedFeatures = (0, utils_1.checkForUnsupportedFeatures)(schema || {}, uischema || {}, allFormInputs);
    var schemaData = schema || {};
    var elementNum = (0, utils_1.countElementsFromSchema)(schemaData);
    var defaultCollapseStates = __spreadArray([], Array(elementNum), true).map(function () { return false; });
    var _c = react_1.default.useState(defaultCollapseStates), cardOpenArray = _c[0], setCardOpenArray = _c[1];
    // keep name in state to avoid losing focus
    var _d = react_1.default.useState(name), keyName = _d[0], setKeyName = _d[1];
    var _e = react_1.default.useState(null), keyError = _e[0], setKeyError = _e[1];
    // keep requirements in state to avoid rapid updates
    var _f = react_1.default.useState(false), modalOpen = _f[0], setModalOpen = _f[1];
    var elementId = react_1.default.useMemo(utils_2.getRandomId, []);
    var includeValidations = react_1.default.useContext(includeValidationsContext_1.default);
    var objectNameHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionObjectName === 'string' ? mods.tooltipDescriptions.cardSectionObjectName : 'The key to the object that will represent this form section.';
    var displayNameHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDisplayName === 'string' ? mods.tooltipDescriptions.cardSectionDisplayName : 'The name of the form section that will be shown to users of the form.';
    var sectionDescriptionHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDescription === 'string' ? mods.tooltipDescriptions.cardSectionDescription : 'A description of the section which will be visible on the form.';
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Collapse_1.default, { isOpen: cardOpen, toggleCollapse: function () { return setCardOpen(!cardOpen); }, title: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null,
                    react_1.default.createElement(Tooltip_2.default, { placement: 'top', title: "Move form element up" },
                        react_1.default.createElement("span", null,
                            react_1.default.createElement(IconButton_1.default, { size: "small", onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onMoveUp === null || onMoveUp === void 0 ? void 0 : onMoveUp();
                                } },
                                react_1.default.createElement(ArrowUpward_1.default, null)))),
                    react_1.default.createElement(Tooltip_2.default, { placement: 'top', title: "Move form element down" },
                        react_1.default.createElement("span", null,
                            react_1.default.createElement(IconButton_1.default, { size: "small", onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onMoveDown === null || onMoveDown === void 0 ? void 0 : onMoveDown();
                                } },
                                react_1.default.createElement(ArrowDownward_1.default, null))))),
                react_1.default.createElement(Divider_1.default, { orientation: "vertical", flexItem: true }),
                react_1.default.createElement("span", { style: { marginLeft: '.5em' }, onClick: function () { return setCardOpen(!cardOpen); } },
                    react_1.default.createElement(Typography_1.default, { variant: "subtitle1", component: "h4" },
                        schemaData.title || keyName,
                        ' ',
                        parent ? react_1.default.createElement(Tooltip_1.default, { text: "Depends on ".concat(parent), type: 'alert' }) : ''))), className: "section-container ".concat(/* classes.sectionContainer*/ '', " ").concat(dependent ? 'section-dependent' : '', " ").concat(reference ? 'section-reference' : '') },
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", null,
                    reference ? react_1.default.createElement("div", { className: 'section-entry section-reference' },
                        react_1.default.createElement(FormControl_1.default, null,
                            react_1.default.createElement(InputLabel_1.default, { shrink: true, id: elementId + "-select-label" }, "Reference Section"),
                            react_1.default.createElement(Select_1.default, { labelId: elementId + "-select-label", id: elementId + "-select", value: reference, label: "Reference Section", onChange: function (e) {
                                    onChange(schema, uischema, e.target.value);
                                } }, Object.keys(definitionData).map(function (key) {
                                var value = "#/definitions/".concat(key);
                                return (react_1.default.createElement(MenuItem_1.default, { key: value, value: value }, value));
                            })))) : '',
                    react_1.default.createElement("div", { style: { display: 'flex' } },
                        react_1.default.createElement("div", { style: { margin: '.5em' }, "data-test": 'section-object-name' },
                            react_1.default.createElement(TextField_1.default, { label: "Section Object Name", error: keyError !== null, value: keyName || '', placeholder: 'Key', type: 'text', onChange: function (ev) { return setKeyName(ev.target.value); }, onBlur: function (ev) {
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
                        react_1.default.createElement("div", { style: { margin: '.5em' }, "data-test": 'section-display-name' },
                            react_1.default.createElement(TextField_1.default, { label: "Section Display Name", helperText: displayNameHelperText, value: schemaData.title || '', placeholder: 'Title', onChange: function (ev) { return onChange(__assign(__assign({}, schema), { title: ev.target.value }), uischema); } })),
                        react_1.default.createElement("div", { style: { margin: '.5em' }, "data-test": 'section-description' },
                            react_1.default.createElement(TextField_1.default, { label: "Section Description", value: schemaData.description || '', placeholder: 'Description', onChange: function (ev) { return onChange(__assign(__assign({}, schema), { description: ev.target.value }), uischema); }, helperText: sectionDescriptionHelperText })),
                        react_1.default.createElement(Alert_1.default, { style: {
                                display: unsupportedFeatures.length === 0 ? 'none' : 'block'
                            }, severity: "warning" },
                            react_1.default.createElement(AlertTitle_1.default, null, "Unsupported Features"),
                            unsupportedFeatures.map(function (message) { return react_1.default.createElement("li", { key: "".concat(elementId, "_").concat(message) }, message); })))),
                react_1.default.createElement("div", { className: 'section-body' },
                    react_1.default.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: function (result) { return (0, utils_1.onDragEnd)(result, {
                            schema: schema,
                            uischema: uischema,
                            onChange: onChange,
                            definitionData: definitionData,
                            definitionUi: definitionUi,
                            categoryHash: categoryHash
                        }); }, className: 'section-body' },
                        react_1.default.createElement(react_beautiful_dnd_1.Droppable, { droppableId: 'droppable' }, function (providedDroppable) { return react_1.default.createElement("div", __assign({ ref: providedDroppable.innerRef }, providedDroppable.droppableProps),
                            (0, utils_1.generateElementComponentsFromSchemas)({
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
                                Card: Card_1.default,
                                Section: Section
                            }).map(function (element, index) { return react_1.default.createElement(react_beautiful_dnd_1.Draggable, { key: element.key, draggableId: element.key, index: index }, function (providedDraggable) { return react_1.default.createElement("div", __assign({ ref: providedDraggable.innerRef }, providedDraggable.draggableProps, providedDraggable.dragHandleProps), element); }); }),
                            providedDroppable.placeholder); }))),
                react_1.default.createElement("div", { className: 'section-footer' },
                    react_1.default.createElement(Add_1.default, { addElem: function (choice) {
                            if (choice === 'card') {
                                (0, utils_1.addCardObj)({
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
                                (0, utils_1.addSectionObj)({
                                    schema: schema,
                                    uischema: uischema,
                                    onChange: onChange,
                                    definitionData: definitionData,
                                    definitionUi: definitionUi,
                                    categoryHash: categoryHash
                                });
                            }
                        }, hidden: schemaData.properties && Object.keys(schemaData.properties).length !== 0 })),
                react_1.default.createElement("div", { className: classes.cardInteractions },
                    react_1.default.createElement(Tooltip_2.default, { placement: "top", title: "Additional configurations for this form element" },
                        react_1.default.createElement(IconButton_1.default, { color: "primary", onClick: function () { return setModalOpen(true); } },
                            react_1.default.createElement(Edit_1.default, null))),
                    react_1.default.createElement(Tooltip_2.default, { placement: 'top', title: "Delete form element" },
                        react_1.default.createElement(IconButton_1.default, { onClick: onDelete },
                            react_1.default.createElement(Delete_1.default, { color: "error" }))),
                    react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, includeValidations && react_1.default.createElement(FBCheckbox_1.default, { onChangeValue: function () { return onRequireToggle(); }, isChecked: required, label: 'Required', id: "".concat(elementId, "_required") })))),
            react_1.default.createElement(CardModal_1.default, { componentProps: {
                    dependents: dependents,
                    neighborNames: neighborNames,
                    name: keyName,
                    schema: schema,
                    type: 'object',
                    'ui:column': (_b = uischema['ui:column']) !== null && _b !== void 0 ? _b : ''
                }, isOpen: modalOpen, onClose: function () { return setModalOpen(false); }, onChange: function (newComponentProps) {
                    onDependentsChange(newComponentProps.dependents);
                    onChange(schema, __assign(__assign({}, uischema), { 'ui:column': newComponentProps['ui:column'] }));
                }, TypeSpecificParameters: defaultInputs_1.CardDefaultParameterInputs })),
        addElem ? react_1.default.createElement(Add_1.default, { addElem: function (choice) { return addElem(choice); } }) : '');
}
exports.default = Section;
//# sourceMappingURL=Section.js.map