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
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
var Card_1 = __importDefault(require("../Card"));
var Section_1 = __importDefault(require("../Section"));
var FBCheckbox_1 = __importDefault(require("../checkbox/FBCheckbox"));
var shortAnswerInputs_1 = __importDefault(require("./shortAnswerInputs"));
var longAnswerInputs_1 = __importDefault(require("./longAnswerInputs"));
var numberInputs_1 = __importDefault(require("./numberInputs"));
var defaultInputs_1 = __importDefault(require("./defaultInputs"));
var utils_2 = require("../utils");
var TextField_1 = __importDefault(require("../../textFieldContext/TextField"));
// specify the inputs required for a string type object
function CardArrayParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return react_1.default.createElement("div", null,
        react_1.default.createElement(TextField_1.default, { label: "Minimum Items", value: parameters.minItems || '', placeholder: 'ex: 2', key: 'minimum', type: 'number', onChange: function (ev) {
                onChange(__assign(__assign({}, parameters), { minItems: parseInt(ev.target.value, 10) }));
            } }),
        react_1.default.createElement(TextField_1.default, { label: "Maximum Items", value: parameters.maxItems || '', placeholder: 'ex: 2', key: 'maximum', type: 'number', onChange: function (ev) {
                onChange(__assign(__assign({}, parameters), { maxItems: parseInt(ev.target.value, 10) }));
            } }));
}
function getInnerCardComponent(_a) {
    var defaultFormInputs = _a.defaultFormInputs;
    return function InnerCard(_a) {
        var parameters = _a.parameters, onChange = _a.onChange, mods = _a.mods;
        var elementId = (0, react_1.useState)(utils_2.getRandomId)[0];
        var newDataProps = {};
        var newUiProps = {};
        var allFormInputs = (0, utils_1.excludeKeys)(Object.assign({}, defaultFormInputs, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
        // parse components into data and ui relevant pieces
        Object.keys(parameters).forEach(function (propName) {
            if (propName.startsWith('ui:*')) {
                newUiProps[propName.substring(4)] = parameters[propName];
            }
            else if (propName.startsWith('ui:')) {
                newUiProps[propName] = parameters[propName];
            }
            else if (!['name', 'required'].includes(propName)) {
                newDataProps[propName] = parameters[propName];
            }
        });
        var definitionData = parameters.definitionData ? parameters.definitionData : {};
        var definitionUi = parameters.definitionUi ? parameters.definitionUi : {};
        var _b = react_1.default.useState(false), cardOpen = _b[0], setCardOpen = _b[1];
        if (parameters.type !== 'array') {
            return react_1.default.createElement("h4", null, "Not an array ");
        }
        return react_1.default.createElement("div", { className: 'card-array' },
            react_1.default.createElement(FBCheckbox_1.default, { onChangeValue: function () {
                    if (newDataProps.items.type === 'object') {
                        onChange(__assign(__assign({}, parameters), { items: __assign(__assign({}, newDataProps.items), { type: 'string' }) }));
                    }
                    else {
                        onChange(__assign(__assign({}, parameters), { items: __assign(__assign({}, newDataProps.items), { type: 'object' }) }));
                    }
                }, isChecked: newDataProps.items.type === 'object', label: 'Section', id: "".concat(elementId, "_issection") }),
            (0, utils_1.generateElementComponentsFromSchemas)({
                schemaData: {
                    properties: {
                        item: newDataProps.items
                    }
                },
                uiSchemaData: {
                    item: newUiProps.items
                },
                onChange: function (schema, uischema) {
                    onChange(__assign(__assign({}, parameters), { items: schema.properties.item, 'ui:*items': uischema.item || {} }));
                },
                path: elementId,
                definitionData: definitionData,
                definitionUi: definitionUi,
                hideKey: true,
                cardOpenArray: [cardOpen],
                setCardOpenArray: function (newArr) { return setCardOpen(newArr[0]); },
                allFormInputs: allFormInputs,
                mods: mods,
                categoryHash: (0, utils_1.generateCategoryHash)(allFormInputs),
                Card: function (props) { return react_1.default.createElement(Card_1.default, __assign({}, props, { showObjectNameInput: false })); },
                Section: Section_1.default
            }));
    };
}
var defaultFormInputs = __assign(__assign(__assign(__assign({}, defaultInputs_1.default), shortAnswerInputs_1.default), longAnswerInputs_1.default), numberInputs_1.default);
defaultFormInputs.array = {
    displayName: 'Array',
    matchIf: [{
            types: ['array']
        }],
    defaultDataSchema: {
        items: {
            type: 'string'
        }
    },
    defaultUiSchema: {},
    type: 'array',
    cardBody: getInnerCardComponent({
        defaultFormInputs: defaultFormInputs
    }),
    modalBody: CardArrayParameterInputs
};
var ArrayInputs = {
    array: {
        displayName: 'Array',
        matchIf: [{
                types: ['array']
            }],
        defaultDataSchema: {
            items: {
                type: 'string'
            }
        },
        defaultUiSchema: {},
        type: 'array',
        cardBody: getInnerCardComponent({
            defaultFormInputs: defaultFormInputs
        }),
        modalBody: CardArrayParameterInputs
    }
};
exports.default = ArrayInputs;
//# sourceMappingURL=arrayInputs.js.map