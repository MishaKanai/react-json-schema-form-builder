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
import React, { useState } from "react";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FBCheckbox from "../checkbox/FBCheckbox.js";
import { getRandomId } from "../utils.js";
import { PlaceholderInput } from "../inputs/PlaceholderInput.js";
import TextField from '../../textFieldContext/TextField.js';
var formatDictionary = {
    '': 'None',
    email: 'Email',
    hostname: 'Hostname',
    uri: 'URI',
    regex: 'Regular Expression'
};
var formatTypeDictionary = {
    email: 'email',
    url: 'uri'
};
var autoDictionary = {
    '': 'None',
    email: 'Email',
    username: 'User Name',
    password: 'Password',
    'street-address': 'Street Address',
    country: 'Country'
};
// specify the inputs required for a string type object
function CardShortAnswerParameterInputs(_a) {
    var _b, _c;
    var parameters = _a.parameters, onChange = _a.onChange;
    console.log({
        parameters: parameters
    });
    var elementId = useState(getRandomId())[0];
    return React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(TextField, { label: "Minimum Length", value: parameters.minLength ? parameters.minLength : '', placeholder: 'Minimum Length', key: 'minLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { minLength: parseInt(ev.target.value, 10) }));
                } })),
        React.createElement("div", { style: { marginTop: '1em' } },
            React.createElement(TextField, { label: "Maximum Length", value: parameters.maxLength ? parameters.maxLength : '', placeholder: 'Maximum Length', key: 'maxLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { maxLength: parseInt(ev.target.value, 10) }));
                } })),
        React.createElement("div", { style: { marginTop: '1em' } },
            React.createElement(TextField, { label: "RegExp Pattern", value: parameters.pattern ? parameters.pattern : '', placeholder: 'Regular Expression Pattern', key: 'pattern', type: 'text', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { pattern: ev.target.value }));
                }, helperText: React.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions', target: '_blank', rel: 'noopener noreferrer' }, "Regular expression pattern that this must satisfy") })),
        React.createElement("div", { style: { marginTop: '1em' } },
            React.createElement(FormControl, { variant: "standard" },
                React.createElement(InputLabel, { shrink: true, id: "format-select-label" }, "Format"),
                React.createElement(Select, { labelId: "format-select-label", id: "format-select", value: (_b = parameters.format) !== null && _b !== void 0 ? _b : '', label: "Format", onChange: function (e) {
                        onChange(__assign(__assign({}, parameters), { format: e.target.value }));
                    } }, Object.entries(formatDictionary).map(function (_a) {
                    var value = _a[0], label = _a[1];
                    return (React.createElement(MenuItem, { key: value, value: value }, label));
                })),
                React.createElement(FormHelperText, null, "Require string input to match a certain common format"))),
        React.createElement("div", { style: { marginTop: '1em' } },
            React.createElement(FormControl, { variant: "standard" },
                React.createElement(InputLabel, { shrink: true, id: "auto-select-label" }, "Auto Complete Category"),
                React.createElement(Select, { labelId: "auto-select-label", id: "auto-select", value: (_c = parameters['ui:autocomplete']) !== null && _c !== void 0 ? _c : '', label: "Auto Complete Category", onChange: function (e) {
                        console.log(e);
                        onChange(__assign(__assign({}, parameters), { 'ui:autocomplete': e.target.value }));
                    } }, Object.entries(autoDictionary).map(function (_a) {
                    var value = _a[0], label = _a[1];
                    return (React.createElement(MenuItem, { key: value, value: value }, label));
                })),
                React.createElement(FormHelperText, null,
                    React.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete', target: '_blank', rel: 'noopener noreferrer' }, "Suggest entries based on the user's browser history")))),
        React.createElement(PlaceholderInput, { parameters: parameters, onChange: onChange }),
        React.createElement("div", { className: 'card-modal-boolean' },
            React.createElement(FBCheckbox, { onChangeValue: function () {
                    onChange(__assign(__assign({}, parameters), { 'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true }));
                }, isChecked: parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false, label: 'Auto Focus' })));
}
function ShortAnswerField(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return (React.createElement(TextField, { label: "Default Value", value: parameters.default, placeholder: 'Default', type: formatTypeDictionary[parameters.format] || 'text', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: ev.target.value })); } }));
}
function Password(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return (React.createElement(TextField, { label: "Default Password", value: parameters.default, placeholder: 'Default', type: 'password', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: ev.target.value })); } }));
}
var shortAnswerInput = {
    shortAnswer: {
        displayName: 'Short Answer',
        matchIf: __spreadArray([{
                types: ['string']
            }], ['email', 'hostname', 'uri', 'regex'].map(function (format) { return ({
            types: ['string'],
            format: format
        }); }), true),
        defaultDataSchema: {},
        defaultUiSchema: {},
        type: 'string',
        cardBody: ShortAnswerField,
        modalBody: CardShortAnswerParameterInputs
    },
    password: {
        displayName: 'Password',
        matchIf: [{
                types: ['string'],
                widget: 'password'
            }],
        defaultDataSchema: {},
        defaultUiSchema: {
            'ui:widget': 'password'
        },
        type: 'string',
        cardBody: Password,
        modalBody: CardShortAnswerParameterInputs
    }
};
export default shortAnswerInput;
//# sourceMappingURL=shortAnswerInputs.js.map