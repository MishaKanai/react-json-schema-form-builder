var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from "react";
import { generateElementComponentsFromSchemas, countElementsFromSchema, addCardObj, addSectionObj } from "./utils.js";
import Card from "./Card.js";
import Section from "./Section.js";
import Add from "./Add.js";
import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs.js";
export default function CardGallery(_a) {
    var definitionSchema = _a.definitionSchema, definitionUiSchema = _a.definitionUiSchema, onChange = _a.onChange, mods = _a.mods, categoryHash = _a.categoryHash;
    var elementNum = countElementsFromSchema({
        properties: definitionSchema
    });
    var defaultCollapseStates = __spreadArray([], Array(elementNum), true).map(function () { return false; });
    var _b = React.useState(defaultCollapseStates), cardOpenArray = _b[0], setCardOpenArray = _b[1];
    var allFormInputs = Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {});
    var componentArr = generateElementComponentsFromSchemas({
        schemaData: {
            properties: definitionSchema
        },
        uiSchemaData: definitionUiSchema,
        onChange: function (newDefinitions, newDefinitionUis) {
            var oldUi = newDefinitionUis;
            var newUi = {};
            Object.keys(oldUi).forEach(function (definedUi) {
                if (!['definitions', 'ui:order'].includes(definedUi))
                    newUi[definedUi] = oldUi[definedUi];
            });
            onChange(newDefinitions.properties, newUi);
        },
        path: 'definitions',
        definitionData: definitionSchema,
        definitionUi: definitionUiSchema,
        cardOpenArray: cardOpenArray,
        setCardOpenArray: setCardOpenArray,
        allFormInputs: allFormInputs,
        mods: mods,
        categoryHash: categoryHash,
        Card: Card,
        Section: Section
    }).map(function (element) { return React.createElement("div", { key: typeof element.key === 'string' ? element.key : '', className: 'form_gallery_container' }, element); });
    return React.createElement("div", { className: 'form_gallery' },
        componentArr,
        componentArr.length === 0 && React.createElement("h5", null, "No components in \"definitions\""),
        React.createElement("div", { className: 'form_footer' },
            React.createElement(Add, { addElem: function (choice) {
                    if (choice === 'card') {
                        addCardObj({
                            schema: {
                                properties: definitionSchema
                            },
                            uischema: definitionUiSchema,
                            mods: mods,
                            onChange: function (newDefinitions, newDefinitionUis) {
                                var oldUi = newDefinitionUis;
                                var newUi = {};
                                Object.keys(oldUi).forEach(function (definedUiSchemaKey) {
                                    if (!['definitions', 'ui:order'].includes(definedUiSchemaKey))
                                        newUi[definedUiSchemaKey] = oldUi[definedUiSchemaKey];
                                });
                                onChange(newDefinitions.properties, newUi);
                            },
                            definitionData: definitionSchema,
                            definitionUi: definitionUiSchema,
                            categoryHash: categoryHash
                        });
                    }
                    else if (choice === 'section') {
                        addSectionObj({
                            schema: {
                                properties: definitionSchema
                            },
                            uischema: definitionUiSchema,
                            onChange: function (newDefinitions, newDefinitionUis) {
                                var oldUi = newDefinitionUis;
                                var newUi = {};
                                Object.keys(oldUi).forEach(function (definedUiSchemaKey) {
                                    if (!['definitions', 'ui:order'].includes(definedUiSchemaKey))
                                        newUi[definedUiSchemaKey] = oldUi[definedUiSchemaKey];
                                });
                                onChange(newDefinitions.properties, newUi);
                            },
                            definitionData: definitionSchema,
                            definitionUi: definitionUiSchema,
                            categoryHash: categoryHash
                        });
                    }
                }, hidden: !!definitionSchema && Object.keys(definitionSchema).length !== 0 })));
}
//# sourceMappingURL=CardGallery.js.map