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
var React = __importStar(require("react"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
var Add_1 = __importDefault(require("@material-ui/icons/Add"));
var TextField_1 = __importDefault(require("../textFieldContext/TextField"));
function CardEnumOptions(_a) {
    var initialValues = _a.initialValues, names = _a.names, showNames = _a.showNames, onChange = _a.onChange, type = _a.type;
    var possibleValues = [];
    var _loop_1 = function (index) {
        var value = initialValues[index];
        var name_1 = "".concat(value);
        if (names && index < names.length)
            name_1 = names[index];
        possibleValues.push(React.createElement("div", { key: index, style: { display: 'flex' } },
            React.createElement("div", { style: { margin: '.5em' } },
                React.createElement(TextField_1.default, { InputLabelProps: { shrink: true }, label: "Possible Value", value: value === undefined || value === null ? '' : value, key: "val-".concat(index), type: type === 'string' ? 'text' : 'number', onChange: function (ev) {
                        var newVal;
                        switch (type) {
                            case 'string':
                                newVal = ev.target.value;
                                break;
                            case 'number':
                            case 'integer':
                                newVal = parseFloat(ev.target.value);
                                if (Number.isInteger(newVal))
                                    newVal = parseInt(ev.target.value, 10);
                                if (Number.isNaN(newVal))
                                    newVal = type === 'string' ? '' : 0;
                                break;
                            default:
                                throw new Error("Enum called with unknown type ".concat(type));
                        }
                        onChange(__spreadArray(__spreadArray(__spreadArray([], initialValues.slice(0, index), true), [newVal], false), initialValues.slice(index + 1), true), names);
                    } })),
            React.createElement("div", { style: { margin: '.5em' } },
                React.createElement(TextField_1.default, { InputLabelProps: { shrink: true }, label: "Label", value: name_1 || '', key: "name-".concat(index), type: 'text', onChange: function (ev) {
                        if (names)
                            onChange(initialValues, __spreadArray(__spreadArray(__spreadArray([], names.slice(0, index), true), [ev.target.value], false), names.slice(index + 1), true));
                    }, style: {
                        display: showNames ? undefined : 'none'
                    } })),
            React.createElement("div", { style: { margin: 'auto 0' } },
                React.createElement("div", { style: { verticalAlign: 'middle' } },
                    React.createElement(IconButton_1.default, { size: "small", onClick: function () {
                            // remove this value
                            onChange(__spreadArray(__spreadArray([], initialValues.slice(0, index), true), initialValues.slice(index + 1), true), names ? __spreadArray(__spreadArray([], names.slice(0, index), true), names.slice(index + 1), true) : undefined);
                        } },
                        React.createElement(Clear_1.default, null))))));
    };
    for (var index = 0; index < initialValues.length; index += 1) {
        _loop_1(index);
    }
    return React.createElement("div", null,
        possibleValues,
        React.createElement("div", { style: { textAlign: 'center' } },
            React.createElement(IconButton_1.default, { size: "small", onClick: function () {
                    // add a new dropdown option
                    onChange(__spreadArray(__spreadArray([], initialValues, true), [type === 'string' ? '' : 0], false), names ? __spreadArray(__spreadArray([], names, true), [''], false) : undefined);
                } },
                React.createElement(Add_1.default, null))));
}
exports.default = CardEnumOptions;
//# sourceMappingURL=CardEnumOptions.js.map