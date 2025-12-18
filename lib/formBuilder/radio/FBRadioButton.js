"use strict";
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
var classnames_1 = __importDefault(require("classnames"));
function FBRadioButton(props) {
    var label = props.label, value = props.value, checked = props.checked, name = props.name, onChange = props.onChange, required = props.required, disabled = props.disabled, autoFocus = props.autoFocus;
    var id = (0, react_1.useState)("radio-".concat(Math.floor(Math.random() * 1000000)))[0];
    var classes = (0, classnames_1.default)('fb-radio-button', {
        disabled: disabled
    });
    return react_1.default.createElement("div", { className: classes, key: value },
        react_1.default.createElement("input", { id: id, type: 'radio', name: name, value: value, checked: checked, required: required, disabled: disabled, autoFocus: autoFocus, onChange: function () { return onChange(value); } }),
        react_1.default.createElement("label", { htmlFor: id }, label));
}
exports.default = FBRadioButton;
//# sourceMappingURL=FBRadioButton.js.map