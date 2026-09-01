import * as React from "react";
import { getCardBody } from "./utils.js";
export default function GeneralParameterInputs(_a) {
    var category = _a.category, parameters = _a.parameters, onChange = _a.onChange, mods = _a.mods, allFormInputs = _a.allFormInputs;
    var CardBody = getCardBody(category, allFormInputs);
    return React.createElement("div", null,
        React.createElement(CardBody, { parameters: parameters, onChange: onChange, mods: mods || {} }));
}
//# sourceMappingURL=GeneralParameterInputs.js.map