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
import React from "react";
import TextField from '../textFieldContext/TextField.js';
import classnames from "classnames";
import GeneralParameterInputs from "./GeneralParameterInputs.js";
import { defaultUiProps, defaultDataProps, categoryToNameMap, categoryType, subtractArray, getRandomId } from "./utils.js";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
var rowStyle = {
    display: 'flex'
};
var entryStyle = {
    margin: 0,
    width: '50%',
    textAlign: 'left',
    padding: '0.5em',
};
export default function CardGeneralParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange, allFormInputs = _a.allFormInputs, mods = _a.mods, _b = _a.showObjectNameInput, showObjectNameInput = _b === void 0 ? true : _b;
    var _c = React.useState(parameters.name), keyState = _c[0], setKeyState = _c[1];
    var _d = React.useState(null), keyError = _d[0], setKeyError = _d[1];
    var _e = React.useState(parameters.title), titleState = _e[0], setTitleState = _e[1];
    var _f = React.useState(parameters.description), descriptionState = _f[0], setDescriptionState = _f[1];
    var elementId = React.useState(getRandomId())[0];
    var categoryMap = categoryToNameMap(parameters.category, allFormInputs);
    var fetchLabel = function (labelName, defaultLabel) {
        return mods && mods.labels && typeof mods.labels[labelName] === 'string' ? mods.labels[labelName] : defaultLabel;
    };
    var objectNameLabel = fetchLabel('objectNameLabel', 'Object Name');
    var displayNameLabel = fetchLabel('displayNameLabel', 'Display Name');
    var descriptionLabel = fetchLabel('descriptionLabel', 'Description');
    var inputTypeLabel = fetchLabel('inputTypeLabel', 'Input Type');
    var availableInputTypes = function () {
        var definitionsInSchema = parameters.definitionData && Object.keys(parameters.definitionData).length !== 0;
        // Hide the "Reference" option if there are no definitions in the schema
        var inputKeys = Object.keys(categoryMap).filter(function (key) { return key !== 'ref' || definitionsInSchema; });
        // Exclude hidden inputs based on mods
        if (mods)
            inputKeys = subtractArray(inputKeys, mods.deactivatedFormInputs);
        return inputKeys.map(function (key) { return ({
            value: key,
            label: categoryMap[key]
        }); }).sort(function (a, b) { return a.label.localeCompare(b.label); });
    };
    var objectNameHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardObjectName === 'string' ? mods.tooltipDescriptions.cardObjectName : 'The back-end name of the object';
    var displayNameHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDisplayName === 'string' ? mods.tooltipDescriptions.cardDisplayName : 'The user-facing name of this object';
    var descriptionHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDescription === 'string' ? mods.tooltipDescriptions.cardDescription : 'This will appear as help text on the form';
    var inputTypeHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardInputType === 'string' ? mods.tooltipDescriptions.cardInputType : 'The type of form input displayed on the form';
    return React.createElement(React.Fragment, null,
        React.createElement("div", { style: rowStyle },
            showObjectNameInput && React.createElement("div", { style: entryStyle },
                React.createElement(TextField, { helperText: keyError !== null && keyError !== void 0 ? keyError : objectNameHelperText, label: objectNameLabel, error: keyError !== null, value: keyState || '', placeholder: 'Key', type: 'text', onChange: function (ev) { return setKeyState(ev.target.value); }, onBlur: function (ev) {
                        var value = ev.target.value;
                        if (value === parameters.name || !(parameters.neighborNames && parameters.neighborNames.includes(value))) {
                            setKeyError(null);
                            onChange(__assign(__assign({}, parameters), { name: value }));
                        }
                        else {
                            setKeyState(parameters.name);
                            setKeyError("\"".concat(value, "\" is already in use."));
                            onChange(__assign({}, parameters));
                        }
                    } })),
            React.createElement("div", { style: entryStyle, className: parameters.$ref === undefined ? undefined : 'disabled-input' },
                React.createElement(TextField, { helperText: displayNameHelperText, label: displayNameLabel, value: titleState || '', placeholder: 'Title', type: 'text', onChange: function (ev) { return setTitleState(ev.target.value); }, onBlur: function (ev) {
                        onChange(__assign(__assign({}, parameters), { title: ev.target.value }));
                    } }))),
        React.createElement("div", { style: rowStyle },
            React.createElement("div", { style: entryStyle, className: parameters.$ref ? 'disabled-input' : undefined },
                React.createElement(TextField, { helperText: descriptionHelperText, label: descriptionLabel, value: descriptionState || '', placeholder: 'Description', type: 'text', onChange: function (ev) { return setDescriptionState(ev.target.value); }, onBlur: function (ev) {
                        onChange(__assign(__assign({}, parameters), { description: ev.target.value }));
                    } })),
            React.createElement("div", { style: entryStyle, className: classnames({
                    'wide-card-entry': !showObjectNameInput
                }) },
                React.createElement(FormControl, { variant: "standard" },
                    React.createElement(InputLabel, { id: "inputtype-select-label" }, inputTypeLabel),
                    React.createElement(Select, { labelId: "inputtype-select-label", id: "inputtype-select", value: parameters.category, label: inputTypeLabel, onChange: function (e) {
                            // figure out the new 'type'
                            var newCategory = e.target.value;
                            var newProps = __assign(__assign(__assign({}, defaultUiProps(newCategory, allFormInputs)), defaultDataProps(newCategory, allFormInputs)), { name: parameters.name, required: parameters.required });
                            if (newProps.$ref !== undefined && !newProps.$ref) {
                                // assign an initial reference
                                var firstDefinition = Object.keys(parameters.definitionData)[0];
                                newProps.$ref = "#/definitions/".concat(firstDefinition || 'empty');
                            }
                            onChange(__assign(__assign({}, newProps), { title: newProps.title || parameters.title, default: newProps.default || '', type: newProps.type || categoryType(newCategory, allFormInputs), category: newProps.category || newCategory }));
                        } }, availableInputTypes().map(function (_a) {
                        var value = _a.value, label = _a.label;
                        return (React.createElement(MenuItem, { key: value, value: value }, label));
                    })),
                    React.createElement(FormHelperText, null, inputTypeHelperText)))),
        React.createElement("div", { style: { padding: '.5em' } },
            React.createElement(GeneralParameterInputs, { category: parameters.category, parameters: parameters, onChange: onChange, mods: mods, allFormInputs: allFormInputs })));
}
//# sourceMappingURL=CardGeneralParameterInputs.js.map