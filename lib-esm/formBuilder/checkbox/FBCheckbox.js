import React from "react";
import classnames from "classnames";
import Box from '@mui/material/Box';
// Box + sx rather than a plain div: these are descendant selectors, not flat properties.
var checkboxSx = {
    '& *': {
        display: 'inline-block'
    },
    '& input': {
        marginRight: '5px'
    }
};
export default function FBCheckbox(_a) {
    var onChangeValue = _a.onChangeValue, _b = _a.value, value = _b === void 0 ? '' : _b, _c = _a.isChecked, isChecked = _c === void 0 ? false : _c, _d = _a.label, label = _d === void 0 ? '' : _d, _e = _a.use, use = _e === void 0 ? 'action' : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.id, id = _g === void 0 ? '' : _g, _h = _a.dataTest, dataTest = _h === void 0 ? '' : _h, _j = _a.labelClassName, labelClassName = _j === void 0 ? '' : _j;
    var classes = classnames('fb-checkbox', {
        'edit-checkbox': !disabled && use === 'edit',
        'action-checkbox': !disabled && use === 'action',
        'disabled-checked-checkbox': disabled && isChecked,
        'disabled-unchecked-checkbox': disabled && !isChecked
    });
    var potentialCheckboxId = id !== '' ? id : label;
    var checkboxId = potentialCheckboxId !== '' ? potentialCheckboxId : null;
    return React.createElement(Box, { "data-test": 'checkbox', className: classes, sx: checkboxSx },
        React.createElement("input", { type: 'checkbox', id: checkboxId, "data-test": dataTest || undefined, onChange: disabled ? function () { } : onChangeValue, value: value, disabled: disabled, checked: isChecked }),
        React.createElement("div", { className: 'checkbox-overlay' }, label && React.createElement("label", { htmlFor: checkboxId, className: labelClassName || undefined }, label)));
}
//# sourceMappingURL=FBCheckbox.js.map