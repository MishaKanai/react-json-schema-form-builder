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
var Input_1 = __importDefault(require("@material-ui/core/Input"));
var CardEnumOptions_1 = __importDefault(require("../CardEnumOptions"));
var CardSelector_1 = __importDefault(require("./CardSelector"));
var FBCheckbox_1 = __importDefault(require("../checkbox/FBCheckbox"));
var utils_1 = require("../utils");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
var Add_1 = __importDefault(require("@material-ui/icons/Add"));
// handle value options for different card types
function ValueSelector(_a) {
    var possibility = _a.possibility, onChange = _a.onChange, parentEnums = _a.parentEnums, parentType = _a.parentType, parentName = _a.parentName, parentSchema = _a.parentSchema, path = _a.path;
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    if (possibility.value) {
        // enum type
        if (parentEnums) {
            var enumType = typeof parentEnums[0] === 'number' ? 'number' : 'string';
            if (enumType === 'string')
                return react_1.default.createElement(CardSelector_1.default, { possibleChoices: parentEnums.map(function (val) { return "".concat(val); }), chosenChoices: possibility.value.enum, onChange: function (chosenChoices) { return onChange(__assign(__assign({}, possibility), { value: {
                            enum: chosenChoices
                        } })); }, placeholder: 'Allowed value', path: path });
            if (enumType === 'number')
                return react_1.default.createElement(CardSelector_1.default, { possibleChoices: parentEnums.map(function (val) { return "".concat(val); }), chosenChoices: possibility.value.enum, onChange: function (chosenChoices) { return onChange(__assign(__assign({}, possibility), { value: {
                            enum: chosenChoices.map(function (val) { return Number.parseFloat(val); })
                        } })); }, placeholder: 'Allowed value', path: path });
        }
        // check box type
        if (parentType === 'boolean') {
            return react_1.default.createElement(FBCheckbox_1.default, { onChangeValue: function () {
                    if (possibility.value.enum && possibility.value.enum[0]) {
                        onChange(__assign(__assign({}, possibility), { value: {
                                enum: [false]
                            } }));
                    }
                    else {
                        onChange(__assign(__assign({}, possibility), { value: {
                                enum: [true]
                            } }));
                    }
                }, isChecked: possibility.value.enum && possibility.value.enum[0], label: parentName });
        }
        // object type
        if (parentType === 'object') {
            var enumArr_1 = possibility.value.enum;
            return react_1.default.createElement("div", null,
                enumArr_1.map(function (combination, index) { return react_1.default.createElement("li", { key: "".concat(elementId, "_possibleValue").concat(index) },
                    Object.keys(combination).map(function (key) {
                        var val = combination[key];
                        return react_1.default.createElement("div", { key: key },
                            react_1.default.createElement("h5", null,
                                key,
                                ":"),
                            {
                                string: react_1.default.createElement(Input_1.default, { value: val || '', placeholder: 'String value' /* type='string' */, onChange: function (ev) {
                                        var _a;
                                        var newVal = ev.target.value;
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-text' }),
                                number: react_1.default.createElement(Input_1.default, { value: val || '', placeholder: 'Number value', type: 'number', onChange: function (ev) {
                                        var _a;
                                        var newVal = Number.parseFloat(ev.target.value);
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-number' }),
                                array: react_1.default.createElement(Input_1.default, { value: JSON.stringify(val) || '', placeholder: 'Array in JSON' /* type='string' */, onChange: function (ev) {
                                        var _a;
                                        var newVal = val;
                                        try {
                                            newVal = JSON.parse(ev.target.value);
                                        }
                                        catch (error) {
                                            // eslint-disable-next-line no-console
                                            console.error('invalid JSON array input');
                                        }
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-text' }),
                                object: react_1.default.createElement(Input_1.default, { value: JSON.stringify(val) || '', placeholder: 'Object in JSON' /* type='string' */, onChange: function (ev) {
                                        var _a;
                                        var newVal = val;
                                        try {
                                            newVal = JSON.parse(ev.target.value);
                                        }
                                        catch (error) {
                                            // eslint-disable-next-line no-console
                                            console.error('invalid JSON object input');
                                        }
                                        var oldCombo = possibility.value.enum[index];
                                        onChange(__assign(__assign({}, possibility), { value: {
                                                enum: __spreadArray(__spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), [__assign(__assign({}, oldCombo), (_a = {}, _a[key] = newVal, _a))], false), enumArr_1.slice(index + 1), true)
                                            } }));
                                    }, className: 'card-modal-text' })
                            }[typeof val]);
                    }),
                    react_1.default.createElement(IconButton_1.default, { onClick: function () { return onChange(__assign(__assign({}, possibility), { value: {
                                enum: __spreadArray(__spreadArray([], enumArr_1.slice(0, index), true), enumArr_1.slice(index + 1), true)
                            } })); }, size: "small" },
                        react_1.default.createElement(Clear_1.default, null))); }),
                react_1.default.createElement(IconButton_1.default, { color: "primary", size: "small", onClick: function () {
                        var newCase = {};
                        var propArr = parentSchema ? parentSchema.properties : {};
                        Object.keys(propArr).forEach(function (key) {
                            if (propArr[key].type === 'number' || propArr[key].type === 'integer') {
                                newCase[key] = 0;
                            }
                            else if (propArr[key].type === 'array' || propArr[key].enum) {
                                newCase[key] = [];
                            }
                            else if (propArr[key].type === 'object' || propArr[key].properties) {
                                newCase[key] = {};
                            }
                            else {
                                newCase[key] = '';
                            }
                        });
                        onChange(__assign(__assign({}, possibility), { value: {
                                enum: __spreadArray(__spreadArray([], enumArr_1, true), [newCase], false)
                            } }));
                    } },
                    react_1.default.createElement(Add_1.default, null)));
        }
        return react_1.default.createElement(CardEnumOptions_1.default, { initialValues: possibility.value.enum, onChange: function (newEnum) { return onChange(__assign(__assign({}, possibility), { value: {
                    enum: newEnum
                } })); }, type: parentType || 'string', showNames: false });
    }
    else {
        return react_1.default.createElement("h5", null, " Appear if defined ");
    }
}
exports.default = ValueSelector;
//# sourceMappingURL=ValueSelector.js.map