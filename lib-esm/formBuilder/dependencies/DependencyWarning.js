import React, { useState } from "react";
import { getRandomId } from "../utils.js";
import Tooltip from "../Tooltip.js";
// warning message if not all possibilities specified
export default function DependencyWarning(_a) {
    var parameters = _a.parameters;
    var elementId = useState(getRandomId())[0];
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
        return React.createElement(React.Fragment, null,
            React.createElement("p", null,
                "Warning! The following values do not have associated dependency values:",
                ' ',
                React.createElement(Tooltip, { type: 'help', text: 'Each possible value for a value-based dependency must be defined to work properly' })),
            React.createElement("ul", null, undefinedVals_1.map(function (val, index) { return React.createElement("li", { key: index }, val); })));
    }
    return null;
}
//# sourceMappingURL=DependencyWarning.js.map