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
var react_1 = __importStar(require("react"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
var utils_1 = require("../utils");
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
// a field that lets you choose adjacent blocks
function CardSelector(_a) {
    var possibleChoices = _a.possibleChoices, chosenChoices = _a.chosenChoices, onChange = _a.onChange, placeholder = _a.placeholder, path = _a.path;
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("ul", null, chosenChoices.map(function (chosenChoice, index) { return react_1.default.createElement("li", { key: "".concat(elementId, "_neighbor_").concat(index) },
            chosenChoice,
            ' ',
            react_1.default.createElement(IconButton_1.default, { onClick: function () { return onChange(__spreadArray(__spreadArray([], chosenChoices.slice(0, index), true), chosenChoices.slice(index + 1), true)); }, size: "small" },
                react_1.default.createElement(Clear_1.default, null))); })),
        react_1.default.createElement(FormControl_1.default, { fullWidth: true },
            react_1.default.createElement(InputLabel_1.default, { shrink: true, id: elementId + "-label" }, placeholder),
            react_1.default.createElement(Select_1.default, { fullWidth: true, labelId: elementId + "-label", id: elementId, value: '', label: placeholder, onChange: function (e) {
                    onChange(__spreadArray(__spreadArray([], chosenChoices, true), [e.target.value], false));
                } }, possibleChoices.filter(function (choice) { return !chosenChoices.includes(choice); }).map(function (choice) {
                return react_1.default.createElement(MenuItem_1.default, { key: choice, value: choice }, choice);
            }))));
}
exports.default = CardSelector;
//# sourceMappingURL=CardSelector.js.map