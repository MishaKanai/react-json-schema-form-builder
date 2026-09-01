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
import { PlaceholderInput } from "../inputs/PlaceholderInput.js";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export function CardReferenceParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return React.createElement("div", null,
        React.createElement(PlaceholderInput, { parameters: parameters, onChange: onChange }));
}
function RefChoice(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var pathArr = (parameters.$ref || '').split('/');
    // const currentValueLabel = pathArr.length === 3 && pathArr[0] === '#' && pathArr[1] === 'definitions' && (parameters.definitionData || {})[pathArr[2]] ? parameters.definitionData[pathArr[2]].title || parameters.$ref : parameters.$ref;
    return React.createElement("div", { className: 'card-select' },
        React.createElement(FormControl, { variant: "standard" },
            React.createElement(InputLabel, { shrink: true, id: "refchoice-select-label" }, "Reference"),
            React.createElement(Select, { labelId: "refchoice-select-label", id: "refchoice-select", value: parameters.$ref, label: "Reference", onChange: function (e) {
                    onChange(__assign(__assign({}, parameters), { $ref: e.target.value }));
                } }, Object.keys(parameters.definitionData || {}).map(function (key) {
                var value = "#/definitions/".concat(key);
                var label = parameters.definitionData[key].title || value;
                return React.createElement(MenuItem, { key: value, value: value }, label);
            }))));
}
var referenceInputs = {
    ref: {
        displayName: 'Reference',
        matchIf: [{
                types: ['null'],
                $ref: true
            }],
        defaultDataSchema: {
            $ref: '',
            title: '',
            description: ''
        },
        defaultUiSchema: {},
        type: 'string',
        cardBody: RefChoice,
        modalBody: CardReferenceParameterInputs
    }
};
export default referenceInputs;
//# sourceMappingURL=referenceInputs.js.map