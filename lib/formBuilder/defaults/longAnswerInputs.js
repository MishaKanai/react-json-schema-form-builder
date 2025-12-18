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
var Tooltip_1 = __importDefault(require("../Tooltip"));
var utils_1 = require("../utils");
var PlaceholderInput_1 = require("../inputs/PlaceholderInput");
var TextField_1 = __importDefault(require("../../textFieldContext/TextField"));
// specify the inputs required for a string type object
function CardLongAnswerParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    return react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(TextField_1.default, { label: "Minimum Length", value: parameters.minLength ? parameters.minLength : '', placeholder: 'Minimum Length', key: 'minLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { minLength: parseInt(ev.target.value, 10) }));
                } })),
        react_1.default.createElement("div", { style: { marginTop: '1em ' } },
            react_1.default.createElement(TextField_1.default, { label: "Maximum Length", value: parameters.maxLength ? parameters.maxLength : '', placeholder: 'Maximum Length', key: 'maxLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { maxLength: parseInt(ev.target.value, 10) }));
                } })),
        react_1.default.createElement("div", { style: { marginTop: '1em ' } },
            react_1.default.createElement(TextField_1.default, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "RegExp Pattern",
                    ' ',
                    react_1.default.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions' },
                        react_1.default.createElement(Tooltip_1.default, { type: 'help', text: 'Regular expression pattern that this must satisfy' }))), value: parameters.pattern ? parameters.pattern : '', placeholder: 'Regular Expression Pattern', key: 'pattern', type: 'text', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { pattern: ev.target.value }));
                } })),
        react_1.default.createElement(PlaceholderInput_1.PlaceholderInput, { parameters: parameters, onChange: onChange }),
        react_1.default.createElement("div", { className: 'card-modal-boolean' },
            react_1.default.createElement(FBCheckbox_1.default, { onChangeValue: function () {
                    onChange(__assign(__assign({}, parameters), { 'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true }));
                }, isChecked: parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false, label: 'Auto Focus' })));
}
function LongAnswer(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return (react_1.default.createElement(TextField_1.default, { label: "Default value", multiline: true, value: parameters.default, placeholder: 'Default', type: 'textarea', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: ev.target.value })); } }));
}
var longAnswerInput = {
    longAnswer: {
        displayName: 'Long Answer',
        matchIf: [{
                types: ['string'],
                widget: 'textarea'
            }],
        defaultDataSchema: {},
        defaultUiSchema: {
            'ui:widget': 'textarea'
        },
        type: 'string',
        cardBody: LongAnswer,
        modalBody: CardLongAnswerParameterInputs
    }
};
exports.default = longAnswerInput;
//# sourceMappingURL=longAnswerInputs.js.map