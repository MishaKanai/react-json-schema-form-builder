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
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import { getRandomId } from "../utils.js";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// a field that lets you choose adjacent blocks
export default function CardSelector(_a) {
    var possibleChoices = _a.possibleChoices, chosenChoices = _a.chosenChoices, onChange = _a.onChange, placeholder = _a.placeholder, path = _a.path;
    var elementId = useState(getRandomId())[0];
    return React.createElement(React.Fragment, null,
        React.createElement("ul", null, chosenChoices.map(function (chosenChoice, index) { return React.createElement("li", { key: "".concat(elementId, "_neighbor_").concat(index) },
            chosenChoice,
            ' ',
            React.createElement(IconButton, { onClick: function () { return onChange(__spreadArray(__spreadArray([], chosenChoices.slice(0, index), true), chosenChoices.slice(index + 1), true)); }, size: "small" },
                React.createElement(Clear, null))); })),
        React.createElement(FormControl, { fullWidth: true, variant: "standard" },
            React.createElement(InputLabel, { shrink: true, id: elementId + "-label" }, placeholder),
            React.createElement(Select, { fullWidth: true, labelId: elementId + "-label", id: elementId, value: '', label: placeholder, onChange: function (e) {
                    onChange(__spreadArray(__spreadArray([], chosenChoices, true), [e.target.value], false));
                } }, possibleChoices.filter(function (choice) { return !chosenChoices.includes(choice); }).map(function (choice) {
                return React.createElement(MenuItem, { key: choice, value: choice }, choice);
            }))));
}
//# sourceMappingURL=CardSelector.js.map