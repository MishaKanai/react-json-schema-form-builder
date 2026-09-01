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
import * as React from "react";
import CardGallery from "./CardGallery.js";
import { parse, stringify, propagateDefinitionChanges, generateCategoryHash, excludeKeys } from "./utils.js";
import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs.js";
export default function PredefinedGallery(_a) {
    var schema = _a.schema, uischema = _a.uischema, onChange = _a.onChange, mods = _a.mods;
    var schemaData = React.useMemo(function () { return parse(schema) || {}; }, [schema]);
    var uiSchemaData = React.useMemo(function () { return parse(uischema) || {}; }, [uischema]);
    var allFormInputs = excludeKeys(Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
    var categoryHash = generateCategoryHash(allFormInputs);
    React.useEffect(function () {
        if (!uiSchemaData.definitions) {
            // eslint-disable-next-line no-console
            console.log('Parsing UI schema to assign UI for definitions');
            // need to create definitions from scratch
            var references_1 = [];
            // recursively search for all $refs in the schemaData
            var findRefs_1 = function (name, schemaObject) {
                if (!schemaObject)
                    return;
                if (typeof schemaObject === 'object')
                    Object.keys(schemaObject).forEach(function (key) {
                        if (typeof key === 'string') {
                            if (key === '$ref')
                                references_1.push(name);
                            findRefs_1(key, schemaObject[key]);
                        }
                    });
                if (Array.isArray(schemaObject))
                    schemaObject.forEach(function (innerObj) {
                        findRefs_1(name, innerObj);
                    });
            };
            findRefs_1('root', schemaData);
            uiSchemaData.definitions = {};
            var referenceSet_1 = new Set(references_1);
            Object.keys(uiSchemaData).forEach(function (uiProp) {
                if (referenceSet_1.has(uiProp))
                    uiSchemaData.definitions[uiProp] = uiSchemaData[uiProp];
            });
            if (!Object.keys(uiSchemaData.definitions).length) {
                uiSchemaData.definitions = undefined;
            }
            onChange(stringify(schemaData), stringify(uiSchemaData));
        }
    }, [uiSchemaData, schemaData]);
    return React.createElement("div", null,
        React.createElement(CardGallery, { definitionSchema: schemaData.definitions || {}, definitionUiSchema: uiSchemaData.definitions || {}, onChange: function (newDefinitions, newDefinitionsUi) {
                // propagate changes in ui definitions to all relavant parties in main schema
                propagateDefinitionChanges(__assign(__assign({}, schemaData), { definitions: newDefinitions }), __assign(__assign({}, uiSchemaData), { definitions: newDefinitionsUi }), function (newSchema, newUiSchema) { return onChange(stringify(newSchema), stringify(newUiSchema)); }, categoryHash);
            }, mods: mods, categoryHash: categoryHash }));
}
//# sourceMappingURL=PredefinedGallery.js.map