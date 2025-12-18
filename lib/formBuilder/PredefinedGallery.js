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
var React = __importStar(require("react"));
var CardGallery_1 = __importDefault(require("./CardGallery"));
var utils_1 = require("./utils");
var defaultFormInputs_1 = __importDefault(require("./defaults/defaultFormInputs"));
function PredefinedGallery(_a) {
    var schema = _a.schema, uischema = _a.uischema, onChange = _a.onChange, mods = _a.mods;
    var schemaData = React.useMemo(function () { return (0, utils_1.parse)(schema) || {}; }, [schema]);
    var uiSchemaData = React.useMemo(function () { return (0, utils_1.parse)(uischema) || {}; }, [uischema]);
    var allFormInputs = (0, utils_1.excludeKeys)(Object.assign({}, defaultFormInputs_1.default, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
    var categoryHash = (0, utils_1.generateCategoryHash)(allFormInputs);
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
            onChange((0, utils_1.stringify)(schemaData), (0, utils_1.stringify)(uiSchemaData));
        }
    }, [uiSchemaData, schemaData]);
    return React.createElement("div", null,
        React.createElement(CardGallery_1.default, { definitionSchema: schemaData.definitions || {}, definitionUiSchema: uiSchemaData.definitions || {}, onChange: function (newDefinitions, newDefinitionsUi) {
                // propagate changes in ui definitions to all relavant parties in main schema
                (0, utils_1.propagateDefinitionChanges)(__assign(__assign({}, schemaData), { definitions: newDefinitions }), __assign(__assign({}, uiSchemaData), { definitions: newDefinitionsUi }), function (newSchema, newUiSchema) { return onChange((0, utils_1.stringify)(newSchema), (0, utils_1.stringify)(newUiSchema)); }, categoryHash);
            }, mods: mods, categoryHash: categoryHash }));
}
exports.default = PredefinedGallery;
//# sourceMappingURL=PredefinedGallery.js.map