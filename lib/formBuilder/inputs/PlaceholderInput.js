"use strict";
// @flow
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
exports.PlaceholderInput = void 0;
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
var TextField_1 = __importDefault(require("../../textFieldContext/TextField"));
function PlaceholderInput(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    return (react_1.default.createElement(TextField_1.default, { label: "Placeholder", value: parameters['ui:placeholder'], placeholder: 'Placeholder', key: 'placeholder', type: 'text', onChange: function (ev) {
            onChange(__assign(__assign({}, parameters), { 'ui:placeholder': ev.target.value }));
        }, helperText: react_1.default.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder', target: '_blank', rel: 'noopener noreferrer' }, "Hint to the user as to what kind of information is expected in the field") }));
}
exports.PlaceholderInput = PlaceholderInput;
//# sourceMappingURL=PlaceholderInput.js.map