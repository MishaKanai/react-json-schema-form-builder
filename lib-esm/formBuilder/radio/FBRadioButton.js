import React, { useState } from "react";
import classnames from "classnames";
export default function FBRadioButton(props) {
    var label = props.label, value = props.value, checked = props.checked, name = props.name, onChange = props.onChange, required = props.required, disabled = props.disabled, autoFocus = props.autoFocus;
    var id = useState("radio-".concat(Math.floor(Math.random() * 1000000)))[0];
    var classes = classnames('fb-radio-button', {
        disabled: disabled
    });
    return React.createElement("div", { className: classes, key: value },
        React.createElement("input", { id: id, type: 'radio', name: name, value: value, checked: checked, required: required, disabled: disabled, autoFocus: autoFocus, onChange: function () { return onChange(value); } }),
        React.createElement("label", { htmlFor: id }, label));
}
//# sourceMappingURL=FBRadioButton.js.map