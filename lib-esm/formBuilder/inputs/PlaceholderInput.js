// @flow
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
import React, { useState } from 'react';
import { getRandomId } from '../utils.js';
import TextField from '../../textFieldContext/TextField.js';
export function PlaceholderInput(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var elementId = useState(getRandomId())[0];
    return (React.createElement(TextField, { label: "Placeholder", value: parameters['ui:placeholder'], placeholder: 'Placeholder', key: 'placeholder', type: 'text', onChange: function (ev) {
            onChange(__assign(__assign({}, parameters), { 'ui:placeholder': ev.target.value }));
        }, helperText: React.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder', target: '_blank', rel: 'noopener noreferrer' }, "Hint to the user as to what kind of information is expected in the field") }));
}
//# sourceMappingURL=PlaceholderInput.js.map