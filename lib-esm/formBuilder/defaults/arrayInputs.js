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
import { excludeKeys, generateElementComponentsFromSchemas, generateCategoryHash } from "../utils.js";
import Card from "../Card.js";
import Section from "../Section.js";
import FBCheckbox from "../checkbox/FBCheckbox.js";
import shortAnswerInputs from "./shortAnswerInputs.js";
import longAnswerInputs from "./longAnswerInputs.js";
import numberInputs from "./numberInputs.js";
import defaultInputs from "./defaultInputs.js";
import { getRandomId } from "../utils.js";
import TextField from '../../textFieldContext/TextField.js';
// specify the inputs required for a string type object
function CardArrayParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return React.createElement("div", null,
        React.createElement(TextField, { label: "Minimum Items", value: parameters.minItems || '', placeholder: 'ex: 2', key: 'minimum', type: 'number', onChange: function (ev) {
                onChange(__assign(__assign({}, parameters), { minItems: parseInt(ev.target.value, 10) }));
            } }),
        React.createElement(TextField, { label: "Maximum Items", value: parameters.maxItems || '', placeholder: 'ex: 2', key: 'maximum', type: 'number', onChange: function (ev) {
                onChange(__assign(__assign({}, parameters), { maxItems: parseInt(ev.target.value, 10) }));
            } }));
}
function getInnerCardComponent(_a) {
    var defaultFormInputs = _a.defaultFormInputs;
    return function InnerCard(_a) {
        var parameters = _a.parameters, onChange = _a.onChange, mods = _a.mods;
        var elementId = useState(getRandomId)[0];
        var newDataProps = {};
        var newUiProps = {};
        var allFormInputs = excludeKeys(Object.assign({}, defaultFormInputs, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
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
        var _b = React.useState(false), cardOpen = _b[0], setCardOpen = _b[1];
        if (parameters.type !== 'array') {
            return React.createElement("h4", null, "Not an array ");
        }
        return React.createElement("div", { className: 'card-array' },
            React.createElement(FBCheckbox, { onChangeValue: function () {
                    if (newDataProps.items.type === 'object') {
                        onChange(__assign(__assign({}, parameters), { items: __assign(__assign({}, newDataProps.items), { type: 'string' }) }));
                    }
                    else {
                        onChange(__assign(__assign({}, parameters), { items: __assign(__assign({}, newDataProps.items), { type: 'object' }) }));
                    }
                }, isChecked: newDataProps.items.type === 'object', label: 'Section', id: "".concat(elementId, "_issection") }),
            generateElementComponentsFromSchemas({
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
                categoryHash: generateCategoryHash(allFormInputs),
                Card: function (props) { return React.createElement(Card, __assign({}, props, { showObjectNameInput: false })); },
                Section: Section
            }));
    };
}
var defaultFormInputs = __assign(__assign(__assign(__assign({}, defaultInputs), shortAnswerInputs), longAnswerInputs), numberInputs);
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
export default ArrayInputs;
//# sourceMappingURL=arrayInputs.js.map