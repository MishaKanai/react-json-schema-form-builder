import React from "react";
import classnames from "classnames";
import Box from '@mui/material/Box';
import FBRadioButton from "./FBRadioButton.js";
// Box + sx rather than a plain div: these are descendant selectors, not flat properties.
var radioSx = {
    '& .fb-radio-button': {
        display: 'block',
        '& input[type="radio"]': {
            marginRight: '5px',
            marginBottom: 0,
            height: '1em',
            verticalAlign: 'middle'
        },
        '& input[type="radio"] + label': {
            marginTop: 0,
            marginBottom: 0,
            verticalAlign: 'middle'
        }
    }
};
export default function FBRadioGroup(props) {
    var options = props.options, defaultValue = props.defaultValue, onChange = props.onChange, horizontal = props.horizontal, id = props.id, autoFocus = props.autoFocus, disabled = props.disabled;
    var name = Math.random().toString();
    var classes = classnames('fb-radio-group', {
        horizontal: horizontal
    });
    return React.createElement(Box, { id: id, className: classes, sx: radioSx }, options.map(function (option, index) { return React.createElement(FBRadioButton, { value: option.value, label: option.label, name: name, key: option.value, checked: option.value === defaultValue, autoFocus: autoFocus && index === 1, onChange: onChange, disabled: disabled }); }));
}
//# sourceMappingURL=FBRadioGroup.js.map