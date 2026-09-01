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
import shortAnswerInputs from "./shortAnswerInputs.js";
import longAnswerInputs from "./longAnswerInputs.js";
import numberInputs from "./numberInputs.js";
import arrayInputs from "./arrayInputs.js";
import defaultInputs from "./defaultInputs.js";
import referenceInputs from "./referenceInputs.js";
var DEFAULT_FORM_INPUTS = __assign(__assign(__assign(__assign(__assign(__assign({}, defaultInputs), referenceInputs), shortAnswerInputs), longAnswerInputs), numberInputs), arrayInputs);
export default DEFAULT_FORM_INPUTS;
//# sourceMappingURL=defaultFormInputs.js.map