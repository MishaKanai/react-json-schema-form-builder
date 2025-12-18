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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortAnswerInputs_1 = __importDefault(require("./shortAnswerInputs"));
var longAnswerInputs_1 = __importDefault(require("./longAnswerInputs"));
var numberInputs_1 = __importDefault(require("./numberInputs"));
var arrayInputs_1 = __importDefault(require("./arrayInputs"));
var defaultInputs_1 = __importDefault(require("./defaultInputs"));
var referenceInputs_1 = __importDefault(require("./referenceInputs"));
var DEFAULT_FORM_INPUTS = __assign(__assign(__assign(__assign(__assign(__assign({}, defaultInputs_1.default), referenceInputs_1.default), shortAnswerInputs_1.default), longAnswerInputs_1.default), numberInputs_1.default), arrayInputs_1.default);
exports.default = DEFAULT_FORM_INPUTS;
//# sourceMappingURL=defaultFormInputs.js.map