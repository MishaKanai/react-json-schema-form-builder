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
import FBRadioGroup from "../radio/FBRadioGroup.js";
import FBTooltip from "../Tooltip.js";
import DependencyWarning from "./DependencyWarning.js";
import DependencyPossibility from "./DependencyPossibility.js";
import { getRandomId } from "../utils.js";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Add from '@mui/icons-material/Add';
// Box + sx rather than a plain div: these are descendant selectors, not flat properties.
var dependencyFieldSx = {
    '& .fa': {
        cursor: 'pointer'
    },
    '& .plus': {
        marginLeft: '1em'
    },
    '& h4': {
        marginBottom: '.5em'
    },
    '& h5': {
        fontSize: '1em'
    },
    '& .form-dependency-select': {
        fontSize: '0.75em',
        marginBottom: '1em'
    },
    '& .form-dependency-conditions': {
        textAlign: 'left',
        '& .form-dependency-condition': {
            padding: '1em',
            border: '1px solid gray',
            borderRadius: '4px',
            margin: '1em',
            '& *': {
                textAlign: 'initial'
            }
        }
    },
    '& p': {
        fontSize: '0.75em'
    },
    '& .fb-radio-button': {
        display: 'block'
    }
};
// checks whether an array corresponds to oneOf dependencies
function checkIfValueBasedDependency(dependents) {
    var valueBased = true;
    if (dependents && Array.isArray(dependents) && dependents.length > 0) {
        dependents.forEach(function (possibility) {
            if (!possibility.value || !possibility.value.enum) {
                valueBased = false;
            }
        });
    }
    else {
        valueBased = false;
    }
    return valueBased;
}
export default function DependencyField(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = useState(getRandomId())[0];
    var valueBased = checkIfValueBasedDependency(parameters.dependents || []);
    return React.createElement(Box, { className: 'form-dependency', sx: dependencyFieldSx },
        React.createElement("h4", null,
            "Dependencies",
            ' ',
            React.createElement(FBTooltip, { type: 'help', text: 'Control whether other form elements show based on this one' })),
        !!parameters.dependents && parameters.dependents.length > 0 && React.createElement(React.Fragment, null,
            React.createElement(FBRadioGroup, { defaultValue: valueBased ? 'value' : 'definition', horizontal: false, options: [{
                        value: 'definition',
                        label: 'Any value dependency'
                    }, {
                        value: 'value',
                        label: React.createElement(React.Fragment, null,
                            "Specific value dependency",
                            ' ',
                            React.createElement(FBTooltip, { type: 'help', text: "Specify whether these elements should show based on this element's value" }))
                    }], onChange: function (selection) {
                    if (parameters.dependents) {
                        var newDependents_1 = __spreadArray([], parameters.dependents, true);
                        if (selection === 'definition') {
                            parameters.dependents.forEach(function (possibility, index) {
                                newDependents_1[index] = __assign(__assign({}, possibility), { value: undefined });
                            });
                        }
                        else {
                            parameters.dependents.forEach(function (possibility, index) {
                                newDependents_1[index] = __assign(__assign({}, possibility), { value: {
                                        enum: []
                                    } });
                            });
                        }
                        onChange(__assign(__assign({}, parameters), { dependents: newDependents_1 }));
                    }
                } })),
        React.createElement(DependencyWarning, { parameters: parameters }),
        React.createElement("div", { className: 'form-dependency-conditions' },
            parameters.dependents ? parameters.dependents.map(function (possibility, index) { return React.createElement(DependencyPossibility, { possibility: possibility, neighborNames: parameters.neighborNames || [], parentEnums: parameters.enum, parentType: parameters.type, parentName: parameters.name, parentSchema: parameters.schema, path: parameters.path, key: "".concat(elementId, "_possibility").concat(index), onChange: function (newPossibility) {
                    var newDependents = parameters.dependents ? __spreadArray([], parameters.dependents, true) : [];
                    newDependents[index] = newPossibility;
                    onChange(__assign(__assign({}, parameters), { dependents: newDependents }));
                }, onDelete: function () {
                    var newDependents = parameters.dependents ? __spreadArray([], parameters.dependents, true) : [];
                    onChange(__assign(__assign({}, parameters), { dependents: __spreadArray(__spreadArray([], newDependents.slice(0, index), true), newDependents.slice(index + 1), true) }));
                } }); }) : '',
            React.createElement(Tooltip, { disableInteractive: true, placement: "top", title: "Add another dependency relation linking this element and other form elements" },
                React.createElement("span", { className: 'plus' },
                    React.createElement(IconButton, { onClick: function () {
                            var newDependents = parameters.dependents ? __spreadArray([], parameters.dependents, true) : [];
                            newDependents.push({
                                children: [],
                                value: valueBased ? {
                                    enum: []
                                } : undefined
                            });
                            onChange(__assign(__assign({}, parameters), { dependents: newDependents }));
                        }, size: "small" },
                        React.createElement(Add, null))))));
}
//# sourceMappingURL=DependencyField.js.map