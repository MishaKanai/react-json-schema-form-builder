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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var FBCheckbox_1 = __importDefault(require("../checkbox/FBCheckbox"));
var utils_1 = require("../utils");
var TextField_1 = __importDefault(require("../../textFieldContext/TextField"));
// specify the inputs required for a number type object
function CardNumberParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    return react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(TextField_1.default, { label: "Multiple of", helperText: "Require number to be a multiple of this number", value: parameters.multipleOf ? parameters.multipleOf : '', placeholder: 'ex: 2', key: 'multipleOf', type: 'number', onChange: function (ev) {
                    var newVal = parseFloat(ev.target.value);
                    if (Number.isNaN(newVal))
                        newVal = null;
                    onChange(__assign(__assign({}, parameters), { multipleOf: newVal }));
                } })),
        react_1.default.createElement("div", { style: { marginTop: '1em' } },
            react_1.default.createElement(TextField_1.default, { label: "Minimum", value: parameters.minimum || parameters.exclusiveMinimum || '', placeholder: 'ex: 3', key: 'minimum', type: 'number', onChange: function (ev) {
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
        react_1.default.createElement("div", { className: 'card-modal-boolean' },
            react_1.default.createElement(FBCheckbox_1.default, { key: 'exclusiveMinimum', onChangeValue: function () {
                    var newMin = parameters.minimum || parameters.exclusiveMinimum;
                    if (parameters.exclusiveMinimum) {
                        onChange(__assign(__assign({}, parameters), { exclusiveMinimum: null, minimum: newMin }));
                    }
                    else {
                        onChange(__assign(__assign({}, parameters), { exclusiveMinimum: newMin, minimum: null }));
                    }
                }, isChecked: !!parameters.exclusiveMinimum, disabled: !parameters.minimum && !parameters.exclusiveMinimum, label: 'Exclusive Minimum' })),
        react_1.default.createElement("div", { style: { marginTop: '1em' } },
            react_1.default.createElement(TextField_1.default, { label: "Maximum", value: parameters.maximum || parameters.exclusiveMaximum || '', placeholder: 'ex: 8', key: 'maximum', type: 'number', onChange: function (ev) {
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
        react_1.default.createElement("div", { className: 'card-modal-boolean' },
            react_1.default.createElement(FBCheckbox_1.default, { key: 'exclusiveMaximum', onChangeValue: function () {
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
    return (react_1.default.createElement(TextField_1.default, { label: "Default Number", type: "number", value: parameters.default, placeholder: 'Default', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: parseFloat(ev.target.value) })); } }));
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
exports.default = numberInputs;
//# sourceMappingURL=numberInputs.js.map