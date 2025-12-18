"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("./utils");
var Card_1 = __importDefault(require("./Card"));
var Section_1 = __importDefault(require("./Section"));
var Add_1 = __importDefault(require("./Add"));
var defaultFormInputs_1 = __importDefault(require("./defaults/defaultFormInputs"));
function CardGallery(_a) {
    var definitionSchema = _a.definitionSchema, definitionUiSchema = _a.definitionUiSchema, onChange = _a.onChange, mods = _a.mods, categoryHash = _a.categoryHash;
    var elementNum = (0, utils_1.countElementsFromSchema)({
        properties: definitionSchema
    });
    var defaultCollapseStates = __spreadArray([], Array(elementNum), true).map(function () { return false; });
    var _b = react_1.default.useState(defaultCollapseStates), cardOpenArray = _b[0], setCardOpenArray = _b[1];
    var allFormInputs = Object.assign({}, defaultFormInputs_1.default, mods && mods.customFormInputs || {});
    var componentArr = (0, utils_1.generateElementComponentsFromSchemas)({
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
        Card: Card_1.default,
        Section: Section_1.default
    }).map(function (element) { return react_1.default.createElement("div", { key: typeof element.key === 'string' ? element.key : '', className: 'form_gallery_container' }, element); });
    return react_1.default.createElement("div", { className: 'form_gallery' },
        componentArr,
        componentArr.length === 0 && react_1.default.createElement("h5", null, "No components in \"definitions\""),
        react_1.default.createElement("div", { className: 'form_footer' },
            react_1.default.createElement(Add_1.default, { addElem: function (choice) {
                    if (choice === 'card') {
                        (0, utils_1.addCardObj)({
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
                        (0, utils_1.addSectionObj)({
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
exports.default = CardGallery;
//# sourceMappingURL=CardGallery.js.map