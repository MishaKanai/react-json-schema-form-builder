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
var FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
var FBCheckbox_1 = __importDefault(require("../checkbox/FBCheckbox"));
var utils_1 = require("../utils");
var PlaceholderInput_1 = require("../inputs/PlaceholderInput");
var TextField_1 = __importDefault(require("../../textFieldContext/TextField"));
var formatDictionary = {
    '': 'None',
    email: 'Email',
    hostname: 'Hostname',
    uri: 'URI',
    regex: 'Regular Expression'
};
var formatTypeDictionary = {
    email: 'email',
    url: 'uri'
};
var autoDictionary = {
    '': 'None',
    email: 'Email',
    username: 'User Name',
    password: 'Password',
    'street-address': 'Street Address',
    country: 'Country'
};
// specify the inputs required for a string type object
function CardShortAnswerParameterInputs(_a) {
    var _b, _c;
    var parameters = _a.parameters, onChange = _a.onChange;
    console.log({
        parameters: parameters
    });
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    return react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(TextField_1.default, { label: "Minimum Length", value: parameters.minLength ? parameters.minLength : '', placeholder: 'Minimum Length', key: 'minLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { minLength: parseInt(ev.target.value, 10) }));
                } })),
        react_1.default.createElement("div", { style: { marginTop: '1em' } },
            react_1.default.createElement(TextField_1.default, { label: "Maximum Length", value: parameters.maxLength ? parameters.maxLength : '', placeholder: 'Maximum Length', key: 'maxLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { maxLength: parseInt(ev.target.value, 10) }));
                } })),
        react_1.default.createElement("div", { style: { marginTop: '1em' } },
            react_1.default.createElement(TextField_1.default, { label: "RegExp Pattern", value: parameters.pattern ? parameters.pattern : '', placeholder: 'Regular Expression Pattern', key: 'pattern', type: 'text', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { pattern: ev.target.value }));
                }, helperText: react_1.default.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions', target: '_blank', rel: 'noopener noreferrer' }, "Regular expression pattern that this must satisfy") })),
        react_1.default.createElement("div", { style: { marginTop: '1em' } },
            react_1.default.createElement(FormControl_1.default, null,
                react_1.default.createElement(InputLabel_1.default, { shrink: true, id: "format-select-label" }, "Format"),
                react_1.default.createElement(Select_1.default, { labelId: "format-select-label", id: "format-select", value: (_b = parameters.format) !== null && _b !== void 0 ? _b : '', label: "Format", placeholder: 'Format', onChange: function (e) {
                        onChange(__assign(__assign({}, parameters), { format: e.target.value }));
                    } }, Object.entries(formatDictionary).map(function (_a) {
                    var value = _a[0], label = _a[1];
                    return (react_1.default.createElement(MenuItem_1.default, { key: value, value: value }, label));
                })),
                react_1.default.createElement(FormHelperText_1.default, null, "Require string input to match a certain common format"))),
        react_1.default.createElement("div", { style: { marginTop: '1em' } },
            react_1.default.createElement(FormControl_1.default, null,
                react_1.default.createElement(InputLabel_1.default, { shrink: true, id: "auto-select-label" }, "Auto Complete Category"),
                react_1.default.createElement(Select_1.default, { labelId: "auto-select-label", id: "auto-select", value: (_c = parameters['ui:autocomplete']) !== null && _c !== void 0 ? _c : '', label: "Auto Complete Category", placeholder: 'Auto Complete Category', onChange: function (e) {
                        console.log(e);
                        onChange(__assign(__assign({}, parameters), { 'ui:autocomplete': e.target.value }));
                    } }, Object.entries(autoDictionary).map(function (_a) {
                    var value = _a[0], label = _a[1];
                    return (react_1.default.createElement(MenuItem_1.default, { key: value, value: value }, label));
                })),
                react_1.default.createElement(FormHelperText_1.default, null,
                    react_1.default.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete', target: '_blank', rel: 'noopener noreferrer' }, "Suggest entries based on the user's browser history")))),
        react_1.default.createElement(PlaceholderInput_1.PlaceholderInput, { parameters: parameters, onChange: onChange }),
        react_1.default.createElement("div", { className: 'card-modal-boolean' },
            react_1.default.createElement(FBCheckbox_1.default, { onChangeValue: function () {
                    onChange(__assign(__assign({}, parameters), { 'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true }));
                }, isChecked: parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false, label: 'Auto Focus' })));
}
function ShortAnswerField(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return (react_1.default.createElement(TextField_1.default, { label: "Default Value", value: parameters.default, placeholder: 'Default', type: formatTypeDictionary[parameters.format] || 'text', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: ev.target.value })); } }));
}
function Password(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return (react_1.default.createElement(TextField_1.default, { label: "Default Password", value: parameters.default, placeholder: 'Default', type: 'password', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: ev.target.value })); } }));
}
var shortAnswerInput = {
    shortAnswer: {
        displayName: 'Short Answer',
        matchIf: __spreadArray([{
                types: ['string']
            }], ['email', 'hostname', 'uri', 'regex'].map(function (format) { return ({
            types: ['string'],
            format: format
        }); }), true),
        defaultDataSchema: {},
        defaultUiSchema: {},
        type: 'string',
        cardBody: ShortAnswerField,
        modalBody: CardShortAnswerParameterInputs
    },
    password: {
        displayName: 'Password',
        matchIf: [{
                types: ['string'],
                widget: 'password'
            }],
        defaultDataSchema: {},
        defaultUiSchema: {
            'ui:widget': 'password'
        },
        type: 'string',
        cardBody: Password,
        modalBody: CardShortAnswerParameterInputs
    }
};
exports.default = shortAnswerInput;
//# sourceMappingURL=shortAnswerInputs.js.map