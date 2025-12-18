"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var FBRadioGroup_1 = __importDefault(require("../radio/FBRadioGroup"));
var Tooltip_1 = __importDefault(require("../Tooltip"));
var DependencyWarning_1 = __importDefault(require("./DependencyWarning"));
var DependencyPossibility_1 = __importDefault(require("./DependencyPossibility"));
var utils_1 = require("../utils");
var Tooltip_2 = __importDefault(require("@material-ui/core/Tooltip"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Add_1 = __importDefault(require("@material-ui/icons/Add"));
var styles_1 = require("@material-ui/core/styles");
var useStyles = (0, styles_1.makeStyles)({
    dependencyField: {
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
    }
});
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
function DependencyField(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    var classes = useStyles();
    var valueBased = checkIfValueBasedDependency(parameters.dependents || []);
    return react_1.default.createElement("div", { className: "form-dependency ".concat(classes.dependencyField) },
        react_1.default.createElement("h4", null,
            "Dependencies",
            ' ',
            react_1.default.createElement(Tooltip_1.default, { type: 'help', text: 'Control whether other form elements show based on this one' })),
        !!parameters.dependents && parameters.dependents.length > 0 && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(FBRadioGroup_1.default, { defaultValue: valueBased ? 'value' : 'definition', horizontal: false, options: [{
                        value: 'definition',
                        label: 'Any value dependency'
                    }, {
                        value: 'value',
                        label: react_1.default.createElement(react_1.default.Fragment, null,
                            "Specific value dependency",
                            ' ',
                            react_1.default.createElement(Tooltip_1.default, { type: 'help', text: "Specify whether these elements should show based on this element's value" }))
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
        react_1.default.createElement(DependencyWarning_1.default, { parameters: parameters }),
        react_1.default.createElement("div", { className: 'form-dependency-conditions' },
            parameters.dependents ? parameters.dependents.map(function (possibility, index) { return react_1.default.createElement(DependencyPossibility_1.default, { possibility: possibility, neighborNames: parameters.neighborNames || [], parentEnums: parameters.enum, parentType: parameters.type, parentName: parameters.name, parentSchema: parameters.schema, path: parameters.path, key: "".concat(elementId, "_possibility").concat(index), onChange: function (newPossibility) {
                    var newDependents = parameters.dependents ? __spreadArray([], parameters.dependents, true) : [];
                    newDependents[index] = newPossibility;
                    onChange(__assign(__assign({}, parameters), { dependents: newDependents }));
                }, onDelete: function () {
                    var newDependents = parameters.dependents ? __spreadArray([], parameters.dependents, true) : [];
                    onChange(__assign(__assign({}, parameters), { dependents: __spreadArray(__spreadArray([], newDependents.slice(0, index), true), newDependents.slice(index + 1), true) }));
                } }); }) : '',
            react_1.default.createElement(Tooltip_2.default, { placement: "top", title: "Add another dependency relation linking this element and other form elements" },
                react_1.default.createElement("span", { className: 'plus' },
                    react_1.default.createElement(IconButton_1.default, { onClick: function () {
                            var newDependents = parameters.dependents ? __spreadArray([], parameters.dependents, true) : [];
                            newDependents.push({
                                children: [],
                                value: valueBased ? {
                                    enum: []
                                } : undefined
                            });
                            onChange(__assign(__assign({}, parameters), { dependents: newDependents }));
                        }, size: "small" },
                        react_1.default.createElement(Add_1.default, null))))));
}
exports.default = DependencyField;
//# sourceMappingURL=DependencyField.js.map