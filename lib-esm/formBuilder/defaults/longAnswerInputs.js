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
import React, { useState } from "react";
import FBCheckbox from "../checkbox/FBCheckbox.js";
import Tooltip from "../Tooltip.js";
import { getRandomId } from "../utils.js";
import { PlaceholderInput } from "../inputs/PlaceholderInput.js";
import TextField from '../../textFieldContext/TextField.js';
// specify the inputs required for a string type object
function CardLongAnswerParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = useState(getRandomId())[0];
    return React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(TextField, { label: "Minimum Length", value: parameters.minLength ? parameters.minLength : '', placeholder: 'Minimum Length', key: 'minLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { minLength: parseInt(ev.target.value, 10) }));
                } })),
        React.createElement("div", { style: { marginTop: '1em ' } },
            React.createElement(TextField, { label: "Maximum Length", value: parameters.maxLength ? parameters.maxLength : '', placeholder: 'Maximum Length', key: 'maxLength', type: 'number', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { maxLength: parseInt(ev.target.value, 10) }));
                } })),
        React.createElement("div", { style: { marginTop: '1em ' } },
            React.createElement(TextField, { label: React.createElement(React.Fragment, null,
                    "RegExp Pattern",
                    ' ',
                    React.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions' },
                        React.createElement(Tooltip, { type: 'help', text: 'Regular expression pattern that this must satisfy' }))), value: parameters.pattern ? parameters.pattern : '', placeholder: 'Regular Expression Pattern', key: 'pattern', type: 'text', onChange: function (ev) {
                    onChange(__assign(__assign({}, parameters), { pattern: ev.target.value }));
                } })),
        React.createElement(PlaceholderInput, { parameters: parameters, onChange: onChange }),
        React.createElement("div", { className: 'card-modal-boolean' },
            React.createElement(FBCheckbox, { onChangeValue: function () {
                    onChange(__assign(__assign({}, parameters), { 'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true }));
                }, isChecked: parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false, label: 'Auto Focus' })));
}
function LongAnswer(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return (React.createElement(TextField, { label: "Default value", multiline: true, value: parameters.default, placeholder: 'Default', type: 'textarea', onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: ev.target.value })); } }));
}
var longAnswerInput = {
    longAnswer: {
        displayName: 'Long Answer',
        matchIf: [{
                types: ['string'],
                widget: 'textarea'
            }],
        defaultDataSchema: {},
        defaultUiSchema: {
            'ui:widget': 'textarea'
        },
        type: 'string',
        cardBody: LongAnswer,
        modalBody: CardLongAnswerParameterInputs
    }
};
export default longAnswerInput;
//# sourceMappingURL=longAnswerInputs.js.map