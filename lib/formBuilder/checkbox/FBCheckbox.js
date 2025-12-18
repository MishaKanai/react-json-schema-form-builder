"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var useStyles = (0, styles_1.makeStyles)({
    checkbox: {
        '& *': {
            display: 'inline-block'
        },
        '& input': {
            marginRight: '5px'
        }
    }
});
function FBCheckbox(_a) {
    var onChangeValue = _a.onChangeValue, _b = _a.value, value = _b === void 0 ? '' : _b, _c = _a.isChecked, isChecked = _c === void 0 ? false : _c, _d = _a.label, label = _d === void 0 ? '' : _d, _e = _a.use, use = _e === void 0 ? 'action' : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.id, id = _g === void 0 ? '' : _g, _h = _a.dataTest, dataTest = _h === void 0 ? '' : _h, _j = _a.labelClassName, labelClassName = _j === void 0 ? '' : _j;
    var classjss = useStyles();
    var classes = (0, classnames_1.default)('fb-checkbox', {
        'edit-checkbox': !disabled && use === 'edit',
        'action-checkbox': !disabled && use === 'action',
        'disabled-checked-checkbox': disabled && isChecked,
        'disabled-unchecked-checkbox': disabled && !isChecked
    });
    var potentialCheckboxId = id !== '' ? id : label;
    var checkboxId = potentialCheckboxId !== '' ? potentialCheckboxId : null;
    return react_1.default.createElement("div", { "data-test": 'checkbox', className: "".concat(classes, " ").concat(classjss.checkbox) },
        react_1.default.createElement("input", { type: 'checkbox', id: checkboxId, "data-test": dataTest || undefined, onChange: disabled ? function () { } : onChangeValue, value: value, disabled: disabled, checked: isChecked }),
        react_1.default.createElement("div", { className: 'checkbox-overlay' }, label && react_1.default.createElement("label", { htmlFor: checkboxId, className: labelClassName || undefined }, label)));
}
exports.default = FBCheckbox;
//# sourceMappingURL=FBCheckbox.js.map