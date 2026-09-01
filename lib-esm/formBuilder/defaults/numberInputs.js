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
import React, { useState } from "react";
import FBCheckbox from "../checkbox/FBCheckbox.js";
import { getRandomId } from "../utils.js";
import TextField from '../../textFieldContext/TextField.js';
// specify the inputs required for a number type object
function CardNumberParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = useState(getRandomId())[0];
    return React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(TextField, { label: "Multiple of", helperText: "Require number to be a multiple of this number", value: parameters.multipleOf ? parameters.multipleOf : '', placeholder: 'ex: 2', key: 'multipleOf', type: 'number', onChange: function (ev) {
                    var newVal = parseFloat(ev.target.value);
                    if (Number.isNaN(newVal))
                        newVal = null;
                    onChange(__assign(__assign({}, parameters), { multipleOf: newVal }));
                } })),
        React.createElement("div", { style: { marginTop: '1em' } },
            React.createElement(TextField, { label: "Minimum", value: parameters.minimum || parameters.exclusiveMinimum || '', placeholder: 'ex: 3', key: 'minimum', type: 'number', onChange: function (ev) {
                    var newVal = parseFloat(ev.target.value);
                    if (Number.isNaN(newVal))
                        newVal = null;
                    // change either min or exclusiveMin depending on which one is active
                    if (parameters.exclusiveMinimum) {
                        onChange(__assign(__assign({}, parameters), { exclusiveMinimum: newVal, minimum: null }));
                    }
                    else {
                        onChange(__assign(__assign({}, parameters), { minimum: newVal, exclusiveMinimum: null }));
                    }
                } })),
        React.createElement("div", { className: 'card-modal-boolean' },
            React.createElement(FBCheckbox, { key: 'exclusiveMinimum', onChangeValue: function () {
                    var newMin = parameters.minimum || parameters.exclusiveMinimum;
                    if (parameters.exclusiveMinimum) {
                        onChange(__assign(__assign({}, parameters), { exclusiveMinimum: null, minimum: newMin }));
                    }
                    else {
                        onChange(__assign(__assign({}, parameters), { exclusiveMinimum: newMin, minimum: null }));
                    }
                }, isChecked: !!parameters.exclusiveMinimum, disabled: !parameters.minimum && !parameters.exclusiveMinimum, label: 'Exclusive Minimum' })),
        React.createElement("div", { style: { marginTop: '1em' } },
            React.createElement(TextField, { label: "Maximum", value: parameters.maximum || parameters.exclusiveMaximum || '', placeholder: 'ex: 8', key: 'maximum', type: 'number', onChange: function (ev) {
                    var newVal = parseFloat(ev.target.value);
                    if (Number.isNaN(newVal))
                        newVal = null;
                    // change either max or exclusiveMax depending on which one is active
                    if (parameters.exclusiveMinimum) {
                        onChange(__assign(__assign({}, parameters), { exclusiveMaximum: newVal, maximum: null }));
                    }
                    else {
                        onChange(__assign(__assign({}, parameters), { maximum: newVal, exclusiveMaximum: null }));
                    }
                } })),
        React.createElement("div", { className: 'card-modal-boolean' },
            React.createElement(FBCheckbox, { key: 'exclusiveMaximum', onChangeValue: function () {
                    var newMax = parameters.maximum || parameters.exclusiveMaximum;
                    if (parameters.exclusiveMaximum) {
                        onChange(__assign(__assign({}, parameters), { exclusiveMaximum: null, maximum: newMax }));
                    }
                    else {
                        onChange(__assign(__assign({}, parameters), { exclusiveMaximum: newMax, maximum: null }));
                    }
                }, isChecked: !!parameters.exclusiveMaximum, disabled: !parameters.maximum && !parameters.exclusiveMaximum, label: 'Exclusive Maximum' })));
}
function NumberField(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return (React.createElement(TextField, { label: "Default Number", type: "number", value: parameters.default, placeholder: 'Default', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: parseFloat(ev.target.value) })); } }));
}
var numberInputs = {
    integer: {
        displayName: 'Integer',
        matchIf: [{
                types: ['integer']
            }, {
                types: ['integer'],
                widget: 'number'
            }],
        defaultDataSchema: {},
        defaultUiSchema: {},
        type: 'integer',
        cardBody: NumberField,
        modalBody: CardNumberParameterInputs
    },
    number: {
        displayName: 'Number',
        matchIf: [{
                types: ['number']
            }],
        defaultDataSchema: {},
        defaultUiSchema: {},
        type: 'number',
        cardBody: NumberField,
        modalBody: CardNumberParameterInputs
    }
};
export default numberInputs;
//# sourceMappingURL=numberInputs.js.map