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
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';
import TextField from '../textFieldContext/TextField.js';
export default function CardEnumOptions(_a) {
    var initialValues = _a.initialValues, names = _a.names, showNames = _a.showNames, onChange = _a.onChange, type = _a.type;
    var possibleValues = [];
    var _loop_1 = function (index) {
        var value = initialValues[index];
        var name_1 = "".concat(value);
        if (names && index < names.length)
            name_1 = names[index];
        possibleValues.push(React.createElement("div", { key: index, style: { display: 'flex' } },
            React.createElement("div", { style: { margin: '.5em' } },
                React.createElement(TextField, { InputLabelProps: { shrink: true }, label: "Possible Value", value: value === undefined || value === null ? '' : value, key: "val-".concat(index), type: type === 'string' ? 'text' : 'number', onChange: function (ev) {
                        var newVal;
                        switch (type) {
                            case 'string':
                                newVal = ev.target.value;
                                break;
                            case 'number':
                            case 'integer':
                                newVal = parseFloat(ev.target.value);
                                if (Number.isInteger(newVal))
                                    newVal = parseInt(ev.target.value, 10);
                                if (Number.isNaN(newVal))
                                    newVal = type === 'string' ? '' : 0;
                                break;
                            default:
                                throw new Error("Enum called with unknown type ".concat(type));
                        }
                        onChange(__spreadArray(__spreadArray(__spreadArray([], initialValues.slice(0, index), true), [newVal], false), initialValues.slice(index + 1), true), names);
                    } })),
            React.createElement("div", { style: { margin: '.5em' } },
                React.createElement(TextField, { InputLabelProps: { shrink: true }, label: "Label", value: name_1 || '', key: "name-".concat(index), type: 'text', onChange: function (ev) {
                        if (names)
                            onChange(initialValues, __spreadArray(__spreadArray(__spreadArray([], names.slice(0, index), true), [ev.target.value], false), names.slice(index + 1), true));
                    }, style: {
                        display: showNames ? undefined : 'none'
                    } })),
            React.createElement("div", { style: { margin: 'auto 0' } },
                React.createElement("div", { style: { verticalAlign: 'middle' } },
                    React.createElement(IconButton, { size: "small", onClick: function () {
                            // remove this value
                            onChange(__spreadArray(__spreadArray([], initialValues.slice(0, index), true), initialValues.slice(index + 1), true), names ? __spreadArray(__spreadArray([], names.slice(0, index), true), names.slice(index + 1), true) : undefined);
                        } },
                        React.createElement(Clear, null))))));
    };
    for (var index = 0; index < initialValues.length; index += 1) {
        _loop_1(index);
    }
    return React.createElement("div", null,
        possibleValues,
        React.createElement("div", { style: { textAlign: 'center' } },
            React.createElement(IconButton, { size: "small", onClick: function () {
                    // add a new dropdown option
                    onChange(__spreadArray(__spreadArray([], initialValues, true), [type === 'string' ? '' : 0], false), names ? __spreadArray(__spreadArray([], names, true), [''], false) : undefined);
                } },
                React.createElement(Add, null))));
}
//# sourceMappingURL=CardEnumOptions.js.map