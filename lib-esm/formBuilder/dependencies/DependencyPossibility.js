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
import Tooltip from "../Tooltip.js";
import CardSelector from "./CardSelector.js";
import ValueSelector from "./ValueSelector.js";
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
export default function DependencyPossibility(_a) {
    var possibility = _a.possibility, neighborNames = _a.neighborNames, path = _a.path, onChange = _a.onChange, onDelete = _a.onDelete, parentEnums = _a.parentEnums, parentType = _a.parentType, parentName = _a.parentName, parentSchema = _a.parentSchema;
    return React.createElement("div", { className: 'form-dependency-condition' },
        React.createElement("h5", null,
            "Display the following:",
            ' ',
            React.createElement(Tooltip, { type: 'help', text: 'Choose the other form elements that depend on this one' })),
        React.createElement(CardSelector, { possibleChoices: neighborNames.filter(function (name) { return name !== parentName; }) || [], chosenChoices: possibility.children, onChange: function (chosenChoices) { return onChange(__assign(__assign({}, possibility), { children: __spreadArray([], chosenChoices, true) })); }, placeholder: 'Choose a dependent...', path: path }),
        React.createElement("h5", null,
            "If \"",
            parentName,
            "\" has ",
            possibility.value ? 'the value:' : 'a value.'),
        React.createElement("div", { style: {
                display: possibility.value ? 'block' : 'none'
            } },
            React.createElement(ValueSelector, { possibility: possibility, onChange: function (newPossibility) { return onChange(newPossibility); }, parentEnums: parentEnums, parentType: parentType, parentName: parentName, parentSchema: parentSchema, path: path })),
        React.createElement(IconButton, { size: "small", onClick: function () { return onDelete(); } },
            React.createElement(Clear, null)));
}
//# sourceMappingURL=DependencyPossibility.js.map