"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDefaultParameterInputs = void 0;
var React = __importStar(require("react"));
var FBCheckbox_1 = __importDefault(require("../checkbox/FBCheckbox"));
var CardEnumOptions_1 = __importDefault(require("../CardEnumOptions"));
var utils_1 = require("../utils");
var TextField_1 = __importDefault(require("../../textFieldContext/TextField"));
var styles_1 = require("@material-ui/core/styles");
var useStyles = (0, styles_1.makeStyles)({
    hidden: {
        display: 'none'
    }
});
// specify the inputs required for a string type object
function CardDefaultParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return React.createElement("div", null);
}
exports.CardDefaultParameterInputs = CardDefaultParameterInputs;
var getInputCardBodyComponent = function (_a) {
    var type = _a.type;
    return function InputCardBodyComponent(_a) {
        var parameters = _a.parameters, onChange = _a.onChange;
        return (React.createElement(TextField_1.default, { label: "Default Value", value: parameters.default || '', placeholder: 'Default', type: type, InputLabelProps: type === 'date' || type === 'time' || type === 'datetime-local' ? {
                shrink: true
            } : undefined, onChange: function (ev) { return onChange(__assign(__assign({}, parameters), { default: ev.target.value })); } }));
    };
};
function Checkbox(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return React.createElement("div", { className: 'card-boolean' },
        React.createElement(FBCheckbox_1.default, { onChangeValue: function () {
                onChange(__assign(__assign({}, parameters), { default: parameters.default ? parameters.default !== true : true }));
            }, isChecked: parameters.default ? parameters.default === true : false, label: 'Default' }));
}
function MultipleChoice(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var classes = useStyles();
    var enumArray = Array.isArray(parameters.enum) ? parameters.enum : [];
    // eslint-disable-next-line no-restricted-globals
    var containsUnparsableString = enumArray.some(function (val) { return isNaN(val); });
    var containsString = containsUnparsableString || enumArray.some(function (val) { return typeof val === 'string'; });
    var _b = React.useState(!!enumArray.length && !containsString), isNumber = _b[0], setIsNumber = _b[1];
    var elementId = React.useState((0, utils_1.getRandomId)())[0];
    return React.createElement("div", { className: 'card-enum' },
        React.createElement("h3", null, "Possible Values"),
        React.createElement(FBCheckbox_1.default, { onChangeValue: function () {
                if (Array.isArray(parameters.enumNames)) {
                    // remove the enumNames
                    onChange(__assign(__assign({}, parameters), { enumNames: null }));
                }
                else {
                    // create enumNames as a copy of enum values
                    onChange(__assign(__assign({}, parameters), { enumNames: enumArray.map(function (val) { return "".concat(val); }) }));
                }
            }, isChecked: Array.isArray(parameters.enumNames), label: 'Display label is different from value', id: "".concat(elementId, "_different") }),
        React.createElement("div", { className: containsUnparsableString || !enumArray.length ? classes.hidden : '' },
            React.createElement(FBCheckbox_1.default, { onChangeValue: function () {
                    if (containsString || !isNumber) {
                        // attempt converting enum values into numbers
                        try {
                            var newEnum = enumArray.map(function (val) {
                                var newNum = 0;
                                if (val)
                                    newNum = parseFloat(val) || 0;
                                if (Number.isNaN(newNum))
                                    throw new Error("Could not convert ".concat(val));
                                return newNum;
                            });
                            setIsNumber(true);
                            onChange(__assign(__assign({}, parameters), { enum: newEnum }));
                        }
                        catch (error) {
                            // eslint-disable-next-line no-console
                            console.error(error);
                        }
                    }
                    else {
                        // convert enum values back into strings
                        var newEnum = enumArray.map(function (val) { return "".concat(val || 0); });
                        setIsNumber(false);
                        onChange(__assign(__assign({}, parameters), { enum: newEnum }));
                    }
                }, isChecked: isNumber, disabled: containsUnparsableString, label: 'Force number', id: "".concat(elementId, "_forceNumber") })),
        React.createElement(CardEnumOptions_1.default, { initialValues: enumArray, names: Array.isArray(parameters.enumNames) ? parameters.enumNames.map(function (val) { return "".concat(val); }) : undefined, showNames: Array.isArray(parameters.enumNames), onChange: function (newEnum, newEnumNames) { return onChange(__assign(__assign({}, parameters), { enum: newEnum, enumNames: newEnumNames })); }, type: isNumber ? 'number' : 'string' }));
}
var defaultInputs = {
    dateTime: {
        displayName: 'Date-Time',
        matchIf: [{
                types: ['string'],
                format: 'date-time'
            }],
        defaultDataSchema: {
            format: 'date-time'
        },
        defaultUiSchema: {},
        type: 'string',
        cardBody: getInputCardBodyComponent({
            type: 'datetime-local'
        }),
        modalBody: CardDefaultParameterInputs
    },
    date: {
        displayName: 'Date',
        matchIf: [{
                types: ['string'],
                format: 'date'
            }],
        defaultDataSchema: {
            format: 'date'
        },
        defaultUiSchema: {},
        type: 'string',
        cardBody: getInputCardBodyComponent({
            type: 'date'
        }),
        modalBody: CardDefaultParameterInputs
    },
    time: {
        displayName: 'Time',
        matchIf: [{
                types: ['string'],
                format: 'time'
            }],
        defaultDataSchema: {
            format: 'time'
        },
        defaultUiSchema: {},
        type: 'string',
        cardBody: getInputCardBodyComponent({
            type: 'time'
        }),
        modalBody: CardDefaultParameterInputs
    },
    checkbox: {
        displayName: 'Checkbox',
        matchIf: [{
                types: ['boolean']
            }],
        defaultDataSchema: {},
        defaultUiSchema: {},
        type: 'boolean',
        cardBody: Checkbox,
        modalBody: CardDefaultParameterInputs
    },
    radio: {
        displayName: 'Radio',
        matchIf: [{
                types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
                widget: 'radio',
                enum: true
            }],
        defaultDataSchema: {
            enum: []
        },
        defaultUiSchema: {
            'ui:widget': 'radio'
        },
        type: 'string',
        cardBody: MultipleChoice,
        modalBody: CardDefaultParameterInputs
    },
    dropdown: {
        displayName: 'Dropdown',
        matchIf: [{
                types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
                enum: true
            }],
        defaultDataSchema: {
            enum: []
        },
        defaultUiSchema: {},
        type: 'string',
        cardBody: MultipleChoice,
        modalBody: CardDefaultParameterInputs
    }
};
exports.default = defaultInputs;
//# sourceMappingURL=defaultInputs.js.map