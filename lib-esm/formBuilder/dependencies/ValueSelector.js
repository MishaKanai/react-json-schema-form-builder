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
import Input from '@mui/material/Input';
import CardEnumOptions from "../CardEnumOptions.js";
import CardSelector from "./CardSelector.js";
import FBCheckbox from "../checkbox/FBCheckbox.js";
import { getRandomId } from "../utils.js";
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';
// handle value options for different card types
export default function ValueSelector(_a) {
    var possibility = _a.possibility, onChange = _a.onChange, parentEnums = _a.parentEnums, parentType = _a.parentType, parentName = _a.parentName, parentSchema = _a.parentSchema, path = _a.path;
    var elementId = useState(getRandomId())[0];
    if (possibility.value) {
        // enum type
        if (parentEnums) {
            var enumType = typeof parentEnums[0] === 'number' ? 'number' : 'string';
            if (enumType === 'string')
                return React.createElement(CardSelector, { possibleChoices: parentEnums.map(function (val) { return "".concat(val); }), chosenChoices: possibility.value.enum, onChange: function (chosenChoices) { return onChange(__assign(__assign({}, possibility), { value: {
                            enum: chosenChoices
                        } })); }, placeholder: 'Allowed value', path: path });
            if (enumType === 'number')
                return React.createElement(CardSelector, { possibleChoices: parentEnums.map(function (val) { return "".concat(val); }), chosenChoices: possibility.value.enum, onChange: function (chosenChoices) { return onChange(__assign(__assign({}, possibility), { value: {
                            enum: chosenChoices.map(function (val) { return Number.parseFloat(val); })
                        } })); }, placeholder: 'Allowed value', path: path });
        }
        // check box type
        if (parentType === 'boolean') {
            return React.createElement(FBCheckbox, { onChangeValue: function () {
                    if (possibility.value.enum && possibility.value.enum[0]) {
                        onChange(__assign(__assign({}, possibility), { value: {
                                enum: [false]
                            } }));
                    }
                    else {
                        onChange(__assign(__assign({}, possibility), { value: {
                                enum: [true]
                            } }));
                    }
                }, isChecked: possibility.value.enum && possibility.value.enum[0], label: parentName });
        }
        // object type
        if (parentType === 'object') {
            var enumArr_1 = possibility.value.enum;
            return React.createElement("div", null,
                enumArr_1.map(function (combination, index) { return React.createElement("li", { key: "".concat(elementId, "_possibleValue").concat(index) },
                    Object.keys(combination).map(function (key) {
                        var val = combination[key];
                        return React.createElement("div", { key: key },
                            React.createElement("h5", null,
                                key,
                                ":"),
                            {
                                string: React.createElement(Input, { value: val || '', placeholder: 'String value' /* type='string' */, onChange: function (ev) {
                                        var _a;
                                        var newVal = ev.target.value;
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-text' }),
                                number: React.createElement(Input, { value: val || '', placeholder: 'Number value', type: 'number', onChange: function (ev) {
                                        var _a;
                                        var newVal = Number.parseFloat(ev.target.value);
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-number' }),
                                array: React.createElement(Input, { value: JSON.stringify(val) || '', placeholder: 'Array in JSON' /* type='string' */, onChange: function (ev) {
                                        var _a;
                                        var newVal = val;
                                        try {
                                            newVal = JSON.parse(ev.target.value);
                                        }
                                        catch (error) {
                                            // eslint-disable-next-line no-console
                                            console.error('invalid JSON array input');
                                        }
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-text' }),
                                object: React.createElement(Input, { value: JSON.stringify(val) || '', placeholder: 'Object in JSON' /* type='string' */, onChange: function (ev) {
                                        var _a;
                                        var newVal = val;
                                        try {
                                            newVal = JSON.parse(ev.target.value);
                                        }
                                        catch (error) {
                                            // eslint-disable-next-line no-console
                                            console.error('invalid JSON object input');
                                        }
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-text' })
                            }[typeof val]);
                    }),
                    React.createElement(IconButton, { onClick: function () { return onChange(__assign(__assign({}, possibility), { value: {
                                enum: __spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), enumArr_1.slice(index + 1), true)
                            } })); }, size: "small" },
                        React.createElement(Clear, null))); }),
                React.createElement(IconButton, { color: "primary", size: "small", onClick: function () {
                        var newCase = {};
                        var propArr = parentSchema ? parentSchema.properties : {};
                        Object.keys(propArr).forEach(function (key) {
                            if (propArr[key].type === 'number' || propArr[key].type === 'integer') {
                                newCase[key] = 0;
                            }
                            else if (propArr[key].type === 'array' || propArr[key].enum) {
                                newCase[key] = [];
                            }
                            else if (propArr[key].type === 'object' || propArr[key].properties) {
                                newCase[key] = {};
                            }
                            else {
                                newCase[key] = '';
                            }
                        });
                        onChange(__assign(__assign({}, possibility), { value: {
                                enum: __spreadArray(__spreadArray([], enumArr_1, true), [newCase], false)
                            } }));
                    } },
                    React.createElement(Add, null)));
        }
        return React.createElement(CardEnumOptions, { initialValues: possibility.value.enum, onChange: function (newEnum) { return onChange(__assign(__assign({}, possibility), { value: {
                    enum: newEnum
                } })); }, type: parentType || 'string', showNames: false });
    }
    else {
        return React.createElement("h5", null, " Appear if defined ");
    }
}
//# sourceMappingURL=ValueSelector.js.map