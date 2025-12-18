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
var utils_1 = require("../utils");
var Tooltip_1 = __importDefault(require("../Tooltip"));
// warning message if not all possibilities specified
function DependencyWarning(_a) {
    var parameters = _a.parameters;
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    if (parameters.enum && parameters.dependents && parameters.dependents.length && parameters.dependents[0].value) {
        // get the set of defined enum values
        var definedVals_1 = new Set([]);
        (parameters.dependents || []).forEach(function (possibility) {
            if (possibility.value && possibility.value.enum)
                possibility.value.enum.forEach(function (val) { return definedVals_1.add(val); });
        });
        var undefinedVals_1 = [];
        if (Array.isArray(parameters.enum))
            parameters.enum.forEach(function (val) {
                if (!definedVals_1.has(val))
                    undefinedVals_1.push(val);
            });
        if (undefinedVals_1.length === 0)
            return null;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null,
                "Warning! The following values do not have associated dependency values:",
                ' ',
                react_1.default.createElement(Tooltip_1.default, { type: 'help', text: 'Each possible value for a value-based dependency must be defined to work properly' })),
            react_1.default.createElement("ul", null, undefinedVals_1.map(function (val, index) { return react_1.default.createElement("li", { key: index }, val); })));
    }
    return null;
}
exports.default = DependencyWarning;
//# sourceMappingURL=DependencyWarning.js.map