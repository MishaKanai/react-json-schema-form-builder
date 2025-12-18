"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var FBRadioButton_1 = __importDefault(require("./FBRadioButton"));
var useStyles = (0, styles_1.makeStyles)({
    radio: {
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
    }
});
function FBRadioGroup(props) {
    var options = props.options, defaultValue = props.defaultValue, onChange = props.onChange, horizontal = props.horizontal, id = props.id, autoFocus = props.autoFocus, disabled = props.disabled;
    var name = Math.random().toString();
    var classjss = useStyles();
    var classes = (0, classnames_1.default)('fb-radio-group', {
        horizontal: horizontal
    });
    return react_1.default.createElement("div", { id: id, className: "".concat(classes, " ").concat(classjss.radio) }, options.map(function (option, index) { return react_1.default.createElement(FBRadioButton_1.default, { value: option.value, label: option.label, name: name, key: option.value, checked: option.value === defaultValue, autoFocus: autoFocus && index === 1, onChange: onChange, disabled: disabled }); }));
}
exports.default = FBRadioGroup;
//# sourceMappingURL=FBRadioGroup.js.map