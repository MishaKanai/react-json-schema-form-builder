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
var react_1 = __importDefault(require("react"));
var Tooltip_1 = __importDefault(require("../Tooltip"));
var CardSelector_1 = __importDefault(require("./CardSelector"));
var ValueSelector_1 = __importDefault(require("./ValueSelector"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
function DependencyPossibility(_a) {
    var possibility = _a.possibility, neighborNames = _a.neighborNames, path = _a.path, onChange = _a.onChange, onDelete = _a.onDelete, parentEnums = _a.parentEnums, parentType = _a.parentType, parentName = _a.parentName, parentSchema = _a.parentSchema;
    return react_1.default.createElement("div", { className: 'form-dependency-condition' },
        react_1.default.createElement("h5", null,
            "Display the following:",
            ' ',
            react_1.default.createElement(Tooltip_1.default, { type: 'help', text: 'Choose the other form elements that depend on this one' })),
        react_1.default.createElement(CardSelector_1.default, { possibleChoices: neighborNames.filter(function (name) { return name !== parentName; }) || [], chosenChoices: possibility.children, onChange: function (chosenChoices) { return onChange(__assign(__assign({}, possibility), { children: __spreadArray([], chosenChoices, true) })); }, placeholder: 'Choose a dependent...', path: path }),
        react_1.default.createElement("h5", null,
            "If \"",
            parentName,
            "\" has ",
            possibility.value ? 'the value:' : 'a value.'),
        react_1.default.createElement("div", { style: {
                display: possibility.value ? 'block' : 'none'
            } },
            react_1.default.createElement(ValueSelector_1.default, { possibility: possibility, onChange: function (newPossibility) { return onChange(newPossibility); }, parentEnums: parentEnums, parentType: parentType, parentName: parentName, parentSchema: parentSchema, path: path })),
        react_1.default.createElement(IconButton_1.default, { size: "small", onClick: function () { return onDelete(); } },
            react_1.default.createElement(Clear_1.default, null)));
}
exports.default = DependencyPossibility;
//# sourceMappingURL=DependencyPossibility.js.map