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
import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card.js";
import Section from "./Section.js";
import Add from "./Add.js";
import { arrows as arrowsStyle } from "./styles.js";
import { parse, stringify, checkForUnsupportedFeatures, generateElementComponentsFromSchemas, addCardObj, addSectionObj, onDragEnd, countElementsFromSchema, generateCategoryHash, excludeKeys } from "./utils.js";
import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs.js";
// Alert/AlertTitle moved from @material-ui/lab into @mui/material in v5.
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import TextField from '../textFieldContext/TextField.js';
var formHeadStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '10px auto',
    backgroundColor: '#EBEBEB',
    border: '1px solid #858F96',
    borderRadius: '4px',
    width: '90%',
    padding: '20px',
};
var formBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
};
var formFooterStyle = {
    marginTop: '1em',
    textAlign: 'center',
};
export default function FormBuilder(_a) {
    var schema = _a.schema, uischema = _a.uischema, onChange = _a.onChange, mods = _a.mods, className = _a.className;
    var schemaData = parse(schema) || {};
    schemaData.type = 'object';
    var uiSchemaData = parse(uischema) || {};
    var allFormInputs = excludeKeys(Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
    var unsupportedFeatures = checkForUnsupportedFeatures(schemaData, uiSchemaData, allFormInputs);
    var elementNum = countElementsFromSchema(schemaData);
    var defaultCollapseStates = __spreadArray([], Array(elementNum), true).map(function () { return false; });
    var _b = React.useState(defaultCollapseStates), cardOpenArray = _b[0], setCardOpenArray = _b[1];
    var categoryHash = generateCategoryHash(allFormInputs);
    // Box (not a plain div) because the `arrows` fragment carries descendant selectors.
    return React.createElement(Box, { className: className, sx: __assign({ textAlign: 'center' }, arrowsStyle) },
        React.createElement(Alert, { style: {
                display: unsupportedFeatures.length === 0 ? 'none' : 'block'
            }, severity: "warning" },
            React.createElement(AlertTitle, null, "Unsupported Features"),
            unsupportedFeatures.map(function (message, index) { return React.createElement("li", { key: index }, message); })),
        (!mods || mods.showFormHead !== false) && React.createElement("div", { style: formHeadStyle, "data-test": 'form-head' },
            React.createElement("div", { style: { margin: '0em .5em' } },
                React.createElement(TextField, { label: mods && mods.labels && typeof mods.labels.formNameLabel === 'string' ? mods.labels.formNameLabel : 'Form Name', value: schemaData.title || '', placeholder: 'Title', onChange: function (ev) {
                        onChange(stringify(__assign(__assign({}, schemaData), { title: ev.target.value })), uischema);
                    } })),
            React.createElement("div", { style: { margin: '0em .5em' } },
                React.createElement(TextField, { label: mods && mods.labels && typeof mods.labels.formDescriptionLabel === 'string' ? mods.labels.formDescriptionLabel : 'Form Description', value: schemaData.description || '', placeholder: 'Description', onChange: function (ev) { return onChange(stringify(__assign(__assign({}, schemaData), { description: ev.target.value })), uischema); } }))),
        React.createElement("div", { style: formBodyStyle },
            React.createElement(DragDropContext, { onDragEnd: function (result) { return onDragEnd(result, {
                    schema: schemaData,
                    uischema: uiSchemaData,
                    onChange: function (newSchema, newUiSchema) { return onChange(stringify(newSchema), stringify(newUiSchema)); },
                    definitionData: schemaData.definitions,
                    definitionUi: uiSchemaData.definitions,
                    categoryHash: categoryHash
                }); } },
                React.createElement(Droppable, { droppableId: 'droppable' }, function (providedDroppable) { return React.createElement("div", __assign({ ref: providedDroppable.innerRef }, providedDroppable.droppableProps),
                    generateElementComponentsFromSchemas({
                        schemaData: schemaData,
                        uiSchemaData: uiSchemaData,
                        onChange: function (newSchema, newUiSchema) { return onChange(stringify(newSchema), stringify(newUiSchema)); },
                        definitionData: schemaData.definitions,
                        definitionUi: uiSchemaData.definitions,
                        path: 'root',
                        cardOpenArray: cardOpenArray,
                        setCardOpenArray: setCardOpenArray,
                        allFormInputs: allFormInputs,
                        mods: mods,
                        categoryHash: categoryHash,
                        Card: Card,
                        Section: Section
                    }).map(function (element, index) { return React.createElement(Draggable, { key: element.key, draggableId: element.key, index: index }, function (providedDraggable) { return React.createElement("div", __assign({ ref: providedDraggable.innerRef }, providedDraggable.draggableProps, providedDraggable.dragHandleProps), element); }); }),
                    providedDroppable.placeholder); }))),
        React.createElement("div", { style: formFooterStyle },
            React.createElement(Add, { addElem: function (choice) {
                    if (choice === 'card') {
                        addCardObj({
                            schema: schemaData,
                            uischema: uiSchemaData,
                            mods: mods,
                            onChange: function (newSchema, newUiSchema) { return onChange(stringify(newSchema), stringify(newUiSchema)); },
                            definitionData: schemaData.definitions,
                            definitionUi: uiSchemaData.definitions,
                            categoryHash: categoryHash
                        });
                    }
                    else if (choice === 'section') {
                        addSectionObj({
                            schema: schemaData,
                            uischema: uiSchemaData,
                            onChange: function (newSchema, newUiSchema) { return onChange(stringify(newSchema), stringify(newUiSchema)); },
                            definitionData: schemaData.definitions,
                            definitionUi: uiSchemaData.definitions,
                            categoryHash: categoryHash
                        });
                    }
                }, hidden: schemaData.properties && Object.keys(schemaData.properties).length !== 0 })));
}
//# sourceMappingURL=FormBuilder.js.map