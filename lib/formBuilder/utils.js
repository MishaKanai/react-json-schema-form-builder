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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomId = exports.getNewElementDefaultDataOptions = exports.excludeKeys = exports.subtractArray = exports.propagateDefinitionChanges = exports.onDragEnd = exports.generateElementComponentsFromSchemas = exports.addSectionObj = exports.addCardObj = exports.DEFAULT_INPUT_NAME = exports.updateSchemas = exports.getCardParameterInputComponentForType = exports.generateUiSchemaFromElementProps = exports.generateSchemaFromElementProps = exports.countElementsFromSchema = exports.generateElementPropsFromSchemas = exports.checkForUnsupportedFeatures = exports.getCardCategory = exports.generateCategoryHash = exports.categoryToNameMap = exports.getCardBody = exports.categoryType = exports.defaultUiProps = exports.defaultDataProps = exports.stringify = exports.parse = void 0;
var React = __importStar(require("react"));
// parse in either YAML or JSON
function parse(text) {
    if (!text)
        return {};
    return JSON.parse(text);
}
exports.parse = parse;
// stringify in either YAML or JSON
function stringify(obj) {
    if (!obj)
        return '{}';
    return JSON.stringify(obj);
}
exports.stringify = stringify;
function defaultDataProps(category, allFormInputs) {
    return allFormInputs[category].defaultDataSchema;
}
exports.defaultDataProps = defaultDataProps;
function defaultUiProps(category, allFormInputs) {
    return allFormInputs[category].defaultUiSchema;
}
exports.defaultUiProps = defaultUiProps;
function categoryType(category, allFormInputs) {
    return allFormInputs[category].type;
}
exports.categoryType = categoryType;
function getCardBody(category, allFormInputs) {
    return allFormInputs[category] && allFormInputs[category].cardBody || (function () { return null; });
}
exports.getCardBody = getCardBody;
function categoryToNameMap(category, allFormInputs) {
    var categoryNameMap = {};
    Object.keys(allFormInputs).forEach(function (inputName) {
        categoryNameMap[inputName] = allFormInputs[inputName].displayName;
    });
    return categoryNameMap;
}
exports.categoryToNameMap = categoryToNameMap;
function updateElementNames(elementArray) {
    var elementNames = elementArray.map(function (elem) { return elem.name; });
    return elementArray.map(function (elem) {
        var newElem = elem;
        newElem.neighborNames = elementNames;
        return newElem;
    });
}
function generateCategoryHash(allFormInputs) {
    var categoryHash = {};
    Object.keys(allFormInputs).forEach(function (categoryName) {
        var formInput = allFormInputs[categoryName];
        formInput.matchIf.forEach(function (match) {
            match.types.forEach(function (type) {
                var hash = "type:".concat(type === 'null' ? '' : type, ";widget:").concat(match.widget || '', ";field:").concat(match.field || '', ";format:").concat(match.format || '', ";$ref:").concat(match.$ref ? 'true' : 'false', ";enum:").concat(match.enum ? 'true' : 'false');
                if (categoryHash[hash]) {
                    throw new Error("Duplicate hash: ".concat(hash));
                }
                categoryHash[hash] = categoryName;
            });
        });
    });
    return categoryHash;
}
exports.generateCategoryHash = generateCategoryHash;
// determines a card's category based on it's properties
// mostly useful for reading a schema for the first time
function getCardCategory(cardProps, categoryHash) {
    var currentHash = "type:".concat(cardProps.dataOptions.type || '', ";widget:").concat(cardProps.uiOptions['ui:widget'] || '', ";field:").concat(cardProps.uiOptions['ui:field'] || '', ";format:").concat(cardProps.dataOptions.format || '', ";$ref:").concat(cardProps.$ref !== undefined ? 'true' : 'false', ";enum:").concat(cardProps.dataOptions.enum ? 'true' : 'false');
    var category = categoryHash[currentHash];
    if (!category) {
        if (cardProps.$ref)
            return 'ref';
        // eslint-disable-next-line no-console
        console.error("No match for card': ".concat(currentHash, " among set"));
        return 'shortAnswer';
    }
    return category;
}
exports.getCardCategory = getCardCategory;
// check for unsupported feature in schema and uischema
var supportedPropertyParameters = new Set(['title', 'description', 'enum', 'minLength', 'maxLength', 'multipleOf', 'minimum', 'maximum', 'format', 'exclusiveMinimum', 'exclusiveMaximum', 'type', 'default', 'pattern', 'required', 'properties', 'items', 'definitions', '$ref', 'minItems', 'maxItems', 'enumNames', 'dependencies', '$id', '$schema', 'meta', 'additionalProperties']);
var supportedUiParameters = new Set(['ui:order', 'ui:widget', 'ui:autofocus', 'ui:autocomplete', 'ui:options', 'ui:field', 'ui:placeholder', 'ui:column', 'items', 'definitions']);
// recursively called function to check an object for unsupported features
function checkObjectForUnsupportedFeatures(schema, uischema, supportedWidgets, supportedFields, supportedOptions) {
    // add each unsupported feature to this array
    var unsupportedFeatures = [];
    // check for unsupported whole object features
    if (schema && typeof schema === 'object')
        Object.keys(schema).forEach(function (property) {
            if (!supportedPropertyParameters.has(property) && property !== 'properties')
                unsupportedFeatures.push("Unrecognized Object Property: ".concat(property));
        });
    if (uischema && typeof uischema === 'object')
        Object.keys(uischema).forEach(function (uiProperty) {
            var propDefined = false;
            // search for the property in the schema properties and dependencies
            if (schema.properties && Object.keys(schema.properties).includes(uiProperty))
                propDefined = true;
            if (schema.dependencies) {
                Object.keys(schema.dependencies).forEach(function (dependencyKey) {
                    Object.keys(schema.dependencies[dependencyKey]).forEach(function (parameter) {
                        if (parameter === 'oneOf') {
                            schema.dependencies[dependencyKey].oneOf.forEach(function (grouping) {
                                if (grouping.properties)
                                    if (Object.keys(grouping.properties).includes(uiProperty))
                                        propDefined = true;
                            });
                        }
                        else if (parameter === 'properties') {
                            if (Object.keys(schema.dependencies[dependencyKey].properties).includes(uiProperty))
                                propDefined = true;
                        }
                    });
                });
            }
            if (!propDefined && !supportedUiParameters.has(uiProperty))
                unsupportedFeatures.push("Unrecognized UI schema property: ".concat(uiProperty));
        });
    // check for unsupported property parameters
    if (schema.properties)
        Object.entries(schema.properties).forEach(function (_a) {
            var parameter = _a[0], element = _a[1];
            if (element && typeof element === 'object' && element.type && element.type !== 'object') {
                // make sure that the type is valid
                if (!['array', 'string', 'integer', 'number', 'boolean'].includes(element.type))
                    unsupportedFeatures.push("Unrecognized type: ".concat(element.type, " in ").concat(parameter));
                // check the properties of each property if it is a basic object
                Object.keys(element).forEach(function (key) {
                    if (!supportedPropertyParameters.has(key))
                        unsupportedFeatures.push("Property Parameter: ".concat(key, " in ").concat(parameter));
                });
            }
            else {
                // check the properties of each property if it is a basic object
                Object.keys(element).forEach(function (key) {
                    if (!supportedPropertyParameters.has(key))
                        unsupportedFeatures.push("Property Parameter: ".concat(key, " in ").concat(parameter));
                });
            }
            // check for unsupported UI components
            if (uischema && uischema[parameter] && element && (!element.type || element.type !== 'object')) {
                // check for unsupported ui properties
                Object.keys(uischema[parameter]).forEach(function (uiProp) {
                    if (!supportedUiParameters.has(uiProp))
                        unsupportedFeatures.push("UI Property: ".concat(uiProp, " for ").concat(parameter));
                    // check for unsupported ui widgets
                    if (uiProp === 'ui:widget' && !supportedWidgets.has(uischema[parameter][uiProp])) {
                        unsupportedFeatures.push("UI Widget: ".concat(uischema[parameter][uiProp], " for ").concat(parameter));
                    }
                    // check for unsupported ui fields
                    if (uiProp === 'ui:field' && !supportedFields.has(uischema[parameter][uiProp]))
                        unsupportedFeatures.push("UI Field: ".concat(uischema[parameter][uiProp], " for ").concat(parameter));
                    // check unsupported ui option
                    if (uiProp === 'ui:options')
                        Object.keys(uischema[parameter]['ui:options']).forEach(function (uiOption) {
                            if (!supportedOptions.has(uiOption))
                                unsupportedFeatures.push("UI Property: ui:options.".concat(uiOption, " for ").concat(parameter));
                        });
                });
            }
        });
    return unsupportedFeatures;
}
// parent function that checks for unsupported features in an entire document
function checkForUnsupportedFeatures(schema, uischema, allFormInputs) {
    // add each unsupported feature to this array
    var unsupportedFeatures = [];
    var widgets = [];
    var fields = [];
    var options = [];
    Object.keys(allFormInputs).forEach(function (inputType) {
        allFormInputs[inputType].matchIf.forEach(function (match) {
            if (match.widget && !widgets.includes(match.widget))
                widgets.push(match.widget);
            if (match.field && !fields.includes(match.field))
                fields.push(match.field);
        });
        if (allFormInputs[inputType].possibleOptions && Array.isArray(allFormInputs[inputType].possibleOptions)) {
            options.push.apply(options, allFormInputs[inputType].possibleOptions);
        }
    });
    var supportedWidgets = new Set(widgets);
    var supportedFields = new Set(fields);
    var supportedOptions = new Set(options);
    // check for unsupported whole form features
    if (schema && typeof schema === 'object' && schema.type === 'object') {
        unsupportedFeatures.push.apply(unsupportedFeatures, checkObjectForUnsupportedFeatures(schema, uischema, supportedWidgets, supportedFields, supportedOptions));
    }
    else {
        unsupportedFeatures.push('jsonSchema form is not of type object');
    }
    return unsupportedFeatures;
}
exports.checkForUnsupportedFeatures = checkForUnsupportedFeatures;
// make an element out of the corresponding properties and UI properties
function generateDependencyElement(name, dataProps, uiProperties, requiredNames, definitionData, definitionUi, categoryHash, useDefinitionDetails) {
    if (useDefinitionDetails === void 0) { useDefinitionDetails = true; }
    var uiProps = __assign({}, uiProperties);
    var newElement = {};
    var elementDetails = dataProps && typeof dataProps === 'object' ? dataProps : {};
    // populate newElement with reference if applicable
    if (elementDetails.$ref !== undefined && definitionData) {
        var pathArr = typeof elementDetails.$ref === 'string' ? elementDetails.$ref.split('/') : [];
        if (pathArr[0] === '#' && pathArr[1] === 'definitions' && definitionData[pathArr[2]] && useDefinitionDetails === true) {
            elementDetails = __assign(__assign({}, elementDetails), definitionData[pathArr[2]]);
        }
        var definedUiProps = (definitionUi || {})[pathArr[2]];
        uiProps = __assign(__assign({}, (definedUiProps || {})), uiProps);
    }
    newElement.name = name;
    newElement.required = requiredNames.includes(name);
    newElement.$ref = typeof elementDetails.$ref === 'string' ? elementDetails.$ref : undefined;
    if (elementDetails.type && elementDetails.type === 'object') {
        // create a section
        newElement.schema = elementDetails;
        newElement.uischema = uiProps || {};
        newElement.propType = 'section';
    }
    else {
        // create a card
        newElement.dataOptions = elementDetails;
        newElement.uiOptions = uiProps || {};
        // ensure that uiOptions does not have duplicate keys with dataOptions
        var reservedKeys_1 = Object.keys(newElement.dataOptions);
        Object.keys(newElement.uiOptions).forEach(function (uiKey) {
            if (reservedKeys_1.includes(uiKey)) {
                newElement.uiOptions["ui:*".concat(uiKey)] = newElement.uiOptions[uiKey];
            }
        });
        newElement.dataOptions.category = getCardCategory(newElement, categoryHash);
        newElement.propType = 'card';
    }
    return newElement;
}
// generate an array of element objects from a schema and uischema
function generateElementPropsFromSchemas(parameters) {
    var schema = parameters.schema, uischema = parameters.uischema, definitionData = parameters.definitionData, definitionUi = parameters.definitionUi, categoryHash = parameters.categoryHash;
    if (!schema.properties)
        return [];
    var elementDict = {};
    var requiredNames = schema.required ? schema.required : [];
    // read regular elements from properties
    Object.entries(schema.properties).forEach(function (_a) {
        var parameter = _a[0], element = _a[1];
        var newElement = {};
        var elementDetails = element && typeof element === 'object' ? element : {};
        // populate newElement with reference if applicable
        if (elementDetails.$ref !== undefined && definitionData) {
            if (elementDetails.$ref && !elementDetails.$ref.startsWith('#/definitions'))
                throw new Error("Invalid definition, not at '#/definitions': ".concat(elementDetails.$ref));
            var pathArr = elementDetails.$ref !== undefined ? elementDetails.$ref.split('/') : [];
            if (pathArr[0] === '#' && pathArr[1] === 'definitions' && definitionData[pathArr[2]]) {
                elementDetails = __assign(__assign({}, definitionData[pathArr[2]]), elementDetails);
            }
            var definedUiProps = (definitionUi || {})[pathArr[2]];
            uischema[parameter] = __assign(__assign({}, (definedUiProps || {})), uischema[parameter]);
        }
        newElement.name = parameter;
        newElement.required = requiredNames.includes(parameter);
        newElement.$ref = elementDetails.$ref;
        newElement.dataOptions = elementDetails;
        if (elementDetails.type && elementDetails.type === 'object') {
            // create a section
            newElement.schema = elementDetails;
            newElement.uischema = uischema[parameter] || {};
            newElement.propType = 'section';
        }
        else {
            // create a card
            newElement.uiOptions = uischema[parameter] || {};
            // ensure that uiOptions does not have duplicate keys with dataOptions
            var reservedKeys_2 = Object.keys(newElement.dataOptions);
            Object.keys(newElement.uiOptions).forEach(function (uiKey) {
                if (reservedKeys_2.includes(uiKey)) {
                    newElement.uiOptions["ui:*".concat(uiKey)] = newElement.uiOptions[uiKey];
                }
            });
            newElement.dataOptions.category = getCardCategory(newElement, categoryHash);
            newElement.propType = 'card';
        }
        elementDict[newElement.name] = newElement;
    });
    // read dependent elements from dependencies
    if (schema.dependencies) {
        var useDefinitionDetails_1 = false;
        Object.keys(schema.dependencies).forEach(function (parent) {
            var group = schema.dependencies[parent];
            if (group.oneOf) {
                var possibilityIndex_1 = 0;
                group.oneOf.forEach(function (possibility) {
                    if (!elementDict[parent].dependents) {
                        elementDict[parent].dependents = [];
                    }
                    elementDict[parent].dependents.push({
                        children: [],
                        value: possibility.properties[parent]
                    });
                    var requiredValues = possibility.required || [];
                    Object.entries(possibility.properties).forEach(function (_a) {
                        var parameter = _a[0], element = _a[1];
                        // create a new element if not present in main properties
                        if (!Object.keys(elementDict).includes(parameter)) {
                            var newElement = generateDependencyElement(parameter, element, uischema[parameter], requiredNames, definitionData, definitionUi, categoryHash, useDefinitionDetails_1);
                            newElement.required = requiredValues.includes(newElement.name);
                            elementDict[newElement.name] = newElement;
                        }
                        if (parameter !== parent) {
                            var newElement = elementDict[parameter];
                            newElement.dependent = true;
                            newElement.parent = parent;
                            elementDict[parent].dependents[possibilityIndex_1].children.push(parameter);
                        }
                    });
                    possibilityIndex_1 += 1;
                });
            }
            else if (group.properties) {
                var requiredValues_1 = group.required || [];
                Object.entries(group.properties).forEach(function (_a) {
                    var parameter = _a[0], element = _a[1];
                    var newElement = generateDependencyElement(parameter, element, uischema[parameter], requiredNames, definitionData, definitionUi, categoryHash, useDefinitionDetails_1);
                    newElement.required = requiredValues_1.includes(newElement.name);
                    newElement.dependent = true;
                    newElement.parent = parent;
                    elementDict[newElement.name] = newElement;
                    if (elementDict[parent].dependents) {
                        elementDict[parent].dependents[0].children.push(parameter);
                    }
                    else {
                        elementDict[parent].dependents = [{
                                children: [parameter]
                            }];
                    }
                });
            }
            else {
                // eslint-disable-next-line no-console
                console.error('unsupported dependency type encountered');
            }
        });
    }
    // now reorder in accordance with ui:order if defined
    var cardPropList = [];
    if (uischema['ui:order']) {
        // in case there are any options not in ui:order
        var remainder_1 = [];
        Object.keys(elementDict).forEach(function (name) {
            if (!uischema['ui:order'].includes(name))
                remainder_1.push(elementDict[name]);
        });
        // map ui order elements into the right order
        uischema['ui:order'].forEach(function (name) {
            // if contains the wildcard *, insert remainder cards there
            if (name === '*') {
                remainder_1.forEach(function (remCard) {
                    cardPropList.push(remCard);
                });
            }
            else if (elementDict[name]) {
                cardPropList.push(elementDict[name]);
            }
        });
    }
    else {
        Object.keys(elementDict).forEach(function (name) {
            cardPropList.push(elementDict[name]);
        });
    }
    updateElementNames(cardPropList);
    return cardPropList;
}
exports.generateElementPropsFromSchemas = generateElementPropsFromSchemas;
// determine the number of element objects from schema and uischema
function countElementsFromSchema(schemaData) {
    if (!schemaData.properties)
        return 0;
    var elementDict = {};
    var elementCount = 0;
    // read regular elements from properties
    Object.entries(schemaData.properties).forEach(function (_a) {
        var parameter = _a[0];
        elementDict[parameter] = {};
        elementCount += 1;
    });
    // read dependent elements from dependencies
    if (schemaData.dependencies) {
        Object.keys(schemaData.dependencies).forEach(function (parent) {
            var group = schemaData.dependencies[parent];
            if (group.oneOf) {
                var possibilityIndex_2 = 0;
                group.oneOf.forEach(function (possibility) {
                    if (!elementDict[parent].dependents) {
                        elementDict[parent].dependents = [];
                    }
                    elementDict[parent].dependents.push({
                        children: [],
                        value: possibility.properties[parent]
                    });
                    Object.entries(possibility.properties).forEach(function (_a) {
                        var parameter = _a[0];
                        // create a new element if not present in main properties
                        if (!Object.keys(elementDict).includes(parameter)) {
                            elementDict[parameter] = {};
                            elementCount += 1;
                        }
                        if (parameter !== parent) {
                            var newElement = elementDict[parameter];
                            newElement.dependent = true;
                            newElement.parent = parent;
                            elementDict[parent].dependents[possibilityIndex_2].children.push(parameter);
                        }
                    });
                    possibilityIndex_2 += 1;
                });
            }
            else if (group.properties) {
                Object.entries(group.properties).forEach(function (_a) {
                    var parameter = _a[0];
                    elementDict[parameter] = {};
                    elementCount += 1;
                    if (elementDict[parent].dependents) {
                        elementDict[parent].dependents[0].children.push(parameter);
                    }
                    else {
                        elementDict[parent].dependents = [{
                                children: [parameter]
                            }];
                    }
                });
            }
            else {
                // eslint-disable-next-line no-console
                console.error('unsupported dependency type encountered');
            }
        });
    }
    return elementCount;
}
exports.countElementsFromSchema = countElementsFromSchema;
// convert an element into a schema equivalent
function generateSchemaElementFromElement(element) {
    var _a, _b;
    if (element.$ref !== undefined) {
        var title = element.schema !== undefined && element.schema.title !== undefined ? element.schema.title : element.dataOptions.title;
        var description = element.schema !== undefined && element.schema.description !== undefined ? element.schema.description : element.dataOptions.description;
        var returnElement = {
            $ref: element.$ref,
            title: title,
            description: description
        };
        var length_1 = (_b = (_a = element === null || element === void 0 ? void 0 : element.schema) === null || _a === void 0 ? void 0 : _a.required) === null || _b === void 0 ? void 0 : _b.length;
        if (length_1 !== undefined && length_1 > 0) {
            returnElement = __assign(__assign({}, returnElement), { required: element.schema.required });
        }
        return returnElement;
    }
    else if (element.propType === 'card') {
        if (element.dataOptions.category === 'section') {
            return {
                type: 'object'
            };
        }
        else {
            var prop_1 = {};
            Object.keys(element.dataOptions).forEach(function (key) {
                if (!['category', 'hideKey', 'path', 'definitionData', 'definitionUi', 'allFormInputs'].includes(key) && element.dataOptions[key] !== '')
                    prop_1[key] = element.dataOptions[key];
            });
            return prop_1;
        }
    }
    else if (element.propType === 'section') {
        return element.schema;
    }
    else {
        throw new Error('Element that is neither card, section, nor ref');
    }
}
// generate a new schema from a complete array of card objects
function generateSchemaFromElementProps(elementArr) {
    if (!elementArr)
        return {};
    var newSchema = {};
    var props = {};
    var dependencies = {};
    var elementDict = {};
    var dependentElements = new Set([]);
    for (var index = 0; index < elementArr.length; index += 1) {
        var element = elementArr[index];
        elementDict[element.name] = __assign({}, element);
        if (element.dependents)
            element.dependents.forEach(function (possibility) {
                possibility.children.forEach(function (dependentElement) {
                    dependentElements.add(dependentElement);
                });
            });
    }
    Object.keys(elementDict).forEach(function (elementName) {
        var element = elementDict[elementName];
        if (element.dependents && element.dependents[0]) {
            if (element.dependents[0].value) {
                // handle value based case
                dependencies[elementName] = {
                    oneOf: element.dependents.map(function (possibility) {
                        var _a;
                        var childrenComponents = {};
                        var requiredValues = [];
                        possibility.children.forEach(function (child) {
                            if (elementDict[child]) {
                                childrenComponents[child] = generateSchemaElementFromElement(elementDict[child]);
                                if (elementDict[child].required)
                                    requiredValues.push(child);
                            }
                        });
                        return {
                            properties: __assign((_a = {}, _a[elementName] = possibility.value, _a), childrenComponents),
                            required: requiredValues
                        };
                    })
                };
            }
            else {
                // handle definition based case
                var childrenComponents_1 = {};
                var requiredValues_2 = [];
                element.dependents[0].children.forEach(function (child) {
                    childrenComponents_1[child] = generateSchemaElementFromElement(elementDict[child]);
                    if (elementDict[child].required)
                        requiredValues_2.push(child);
                });
                dependencies[elementName] = {
                    properties: childrenComponents_1,
                    required: requiredValues_2
                };
            }
        }
        if (!dependentElements.has(elementName))
            props[element.name] = generateSchemaElementFromElement(element);
    });
    newSchema.properties = props;
    newSchema.dependencies = dependencies;
    newSchema.required = elementArr.filter(function (_a) {
        var required = _a.required, dependent = _a.dependent;
        return required && !dependent;
    }).map(function (_a) {
        var name = _a.name;
        return name;
    });
    return newSchema;
}
exports.generateSchemaFromElementProps = generateSchemaFromElementProps;
function generateUiSchemaFromElementProps(elementArr, definitionUi) {
    if (!elementArr)
        return {};
    var uiSchema = {};
    var uiOrder = [];
    var definitions = definitionUi;
    elementArr.forEach(function (element) {
        uiOrder.push(element.name);
        if (element.$ref !== undefined) {
            // look for the reference
            var pathArr = typeof element.$ref === 'string' ? element.$ref.split('/') : [];
            if (definitions && definitions[pathArr[2]])
                uiSchema[element.name] = definitions[pathArr[2]];
        }
        if (element.propType === 'card' && element.uiOptions) {
            Object.keys(element.uiOptions).forEach(function (uiOption) {
                if (!uiSchema[element.name])
                    uiSchema[element.name] = {};
                if (uiOption.startsWith('ui:*')) {
                    uiSchema[element.name][uiOption.substring(4)] = element.uiOptions[uiOption];
                }
                else {
                    uiSchema[element.name][uiOption] = element.uiOptions[uiOption];
                }
            });
        }
        else if (element.propType === 'section' && Object.keys(element.uischema).length > 0) {
            uiSchema[element.name] = element.uischema;
        }
    });
    uiSchema['ui:order'] = uiOrder;
    return uiSchema;
}
exports.generateUiSchemaFromElementProps = generateUiSchemaFromElementProps;
function getCardParameterInputComponentForType(category, allFormInputs) {
    return allFormInputs[category] && allFormInputs[category].modalBody || (function () { return null; });
}
exports.getCardParameterInputComponentForType = getCardParameterInputComponentForType;
// takes in an array of Card Objects and updates both schemas
function updateSchemas(elementArr, parameters) {
    var schema = parameters.schema, uischema = parameters.uischema, onChange = parameters.onChange, definitionUi = parameters.definitionUi;
    var newSchema = Object.assign(__assign({}, schema), generateSchemaFromElementProps(elementArr));
    var newUiSchema = generateUiSchemaFromElementProps(elementArr, definitionUi);
    if (uischema.definitions) {
        newUiSchema.definitions = uischema.definitions;
    }
    // mandate that the type is an object if not already done
    newSchema.type = 'object';
    onChange(newSchema, newUiSchema);
}
exports.updateSchemas = updateSchemas;
exports.DEFAULT_INPUT_NAME = 'newInput';
// ensure that each added block has a unique name
function getIdFromElementsBlock(elements) {
    var names = elements.map(function (element) { return element.name; });
    var defaultNameLength = exports.DEFAULT_INPUT_NAME.length;
    return names.length > 0 ? Math.max.apply(Math, names.map(function (name) {
        if (name.startsWith(exports.DEFAULT_INPUT_NAME)) {
            var index = name.substring(defaultNameLength, name.length);
            var value = Number.parseInt(index);
            if (!isNaN(value)) {
                return value;
            }
        }
        return 0;
    })) + 1 : 1;
}
// given an initial schema, update with a new card appended
function addCardObj(parameters) {
    var schema = parameters.schema, uischema = parameters.uischema, mods = parameters.mods, onChange = parameters.onChange, definitionData = parameters.definitionData, definitionUi = parameters.definitionUi, index = parameters.index, categoryHash = parameters.categoryHash;
    var newElementObjArr = generateElementPropsFromSchemas({
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        categoryHash: categoryHash
    });
    var i = getIdFromElementsBlock(newElementObjArr);
    var dataOptions = getNewElementDefaultDataOptions(i, mods);
    var newElement = {
        name: "".concat(exports.DEFAULT_INPUT_NAME).concat(i),
        required: false,
        dataOptions: dataOptions,
        uiOptions: mods && mods.newElementDefaultUiSchema || {},
        propType: 'card',
        schema: {},
        uischema: {},
        neighborNames: []
    };
    if (index !== undefined && index !== null) {
        newElementObjArr.splice(index + 1, 0, newElement);
    }
    else {
        newElementObjArr.push(newElement);
    }
    updateSchemas(newElementObjArr, {
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        onChange: onChange
    });
}
exports.addCardObj = addCardObj;
// given an initial schema, update with a new section appended
function addSectionObj(parameters) {
    var schema = parameters.schema, uischema = parameters.uischema, onChange = parameters.onChange, definitionData = parameters.definitionData, definitionUi = parameters.definitionUi, index = parameters.index, categoryHash = parameters.categoryHash;
    var newElementObjArr = generateElementPropsFromSchemas({
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        categoryHash: categoryHash
    });
    var i = getIdFromElementsBlock(newElementObjArr);
    var newElement = {
        name: "".concat(exports.DEFAULT_INPUT_NAME).concat(i),
        required: false,
        dataOptions: {
            title: "New Input ".concat(i),
            type: 'object',
            default: ''
        },
        uiOptions: {},
        propType: 'section',
        schema: {
            title: "New Input ".concat(i),
            type: 'object'
        },
        uischema: {},
        neighborNames: []
    };
    if (index !== undefined && index !== null) {
        newElementObjArr.splice(index + 1, 0, newElement);
    }
    else {
        newElementObjArr.push(newElement);
    }
    updateSchemas(newElementObjArr, {
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        onChange: onChange
    });
}
exports.addSectionObj = addSectionObj;
// generate an array of Card and Section components from a schema
function generateElementComponentsFromSchemas(parameters) {
    var schemaData = parameters.schemaData, uiSchemaData = parameters.uiSchemaData, onChange = parameters.onChange, definitionData = parameters.definitionData, definitionUi = parameters.definitionUi, hideKey = parameters.hideKey, path = parameters.path, cardOpenArray = parameters.cardOpenArray, setCardOpenArray = parameters.setCardOpenArray, allFormInputs = parameters.allFormInputs, mods = parameters.mods, categoryHash = parameters.categoryHash, Card = parameters.Card, Section = parameters.Section;
    var schema = parse(stringify(schemaData));
    var uischema = parse(stringify(uiSchemaData));
    if (!schema.properties)
        return [];
    var elementPropArr = generateElementPropsFromSchemas({
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        categoryHash: categoryHash
    });
    var elementList = elementPropArr.map(function (elementProp, index) {
        var expanded = cardOpenArray && index < cardOpenArray.length && cardOpenArray[index] || false;
        if (elementProp.propType === 'card') {
            // choose the appropriate type specific parameters
            var TypeSpecificParameters = getCardParameterInputComponentForType(elementProp.dataOptions.category || 'string', allFormInputs);
            // add a fully defined card component to the list of components
            return React.createElement(Card, { componentProps: Object.assign({
                    name: elementPropArr[index].name,
                    required: elementPropArr[index].required,
                    hideKey: hideKey,
                    path: "".concat(path, "_").concat(elementPropArr[index].name),
                    definitionData: definitionData,
                    definitionUi: definitionUi,
                    neighborNames: elementPropArr[index].neighborNames,
                    dependents: elementPropArr[index].dependents,
                    dependent: elementPropArr[index].dependent,
                    parent: elementPropArr[index].parent
                }, elementPropArr[index].uiOptions, elementPropArr[index].dataOptions), key: "".concat(path, "_").concat(elementPropArr[index].name), TypeSpecificParameters: TypeSpecificParameters, onChange: function (newCardObj) {
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    // extract uiOptions and other properties
                    var newDataProps = {};
                    var newUiProps = {};
                    Object.keys(newCardObj).forEach(function (propName) {
                        if (propName.startsWith('ui:')) {
                            if (propName.startsWith('ui:*')) {
                                newUiProps[propName.substring(4)] = newCardObj[propName];
                            }
                            else {
                                newUiProps[propName] = newCardObj[propName];
                            }
                        }
                        else if (!['name', 'required', 'neighborNames', 'dependents', 'dependent', 'parent'].includes(propName)) {
                            newDataProps[propName] = newCardObj[propName];
                        }
                    });
                    if (newElementObjArr[index].propType === 'card') {
                        var oldElement = newElementObjArr[index];
                        newElementObjArr[index] = __assign(__assign({}, oldElement), { dataOptions: newDataProps, uiOptions: newUiProps, required: newCardObj.required, dependents: newCardObj.dependents, dependent: newCardObj.dependent, parent: newCardObj.parent, name: newCardObj.name, $ref: newCardObj.$ref, propType: 'card' });
                    }
                    else {
                        throw new Error('Card editing non card element');
                    }
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onDelete: function () {
                    // splice out this index from the card array
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    newElementObjArr.splice(index, 1);
                    setCardOpenArray(__spreadArray(__spreadArray([], cardOpenArray.slice(0, index), true), cardOpenArray.slice(index + 1), true));
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onMoveUp: function () {
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    if (index === 0)
                        return;
                    var tempBlock = newElementObjArr[index - 1];
                    newElementObjArr[index - 1] = newElementObjArr[index];
                    newElementObjArr[index] = tempBlock;
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onMoveDown: function () {
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    if (index === elementPropArr.length - 1)
                        return;
                    var tempBlock = newElementObjArr[index + 1];
                    newElementObjArr[index + 1] = newElementObjArr[index];
                    newElementObjArr[index] = tempBlock;
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, addElem: function (choice) {
                    if (choice === 'card') {
                        addCardObj({
                            schema: schema,
                            uischema: uischema,
                            mods: mods,
                            onChange: onChange,
                            definitionData: definitionData || {},
                            definitionUi: definitionUi || {},
                            index: index,
                            categoryHash: categoryHash
                        });
                    }
                    else if (choice === 'section') {
                        addSectionObj({
                            schema: schema,
                            uischema: uischema,
                            onChange: onChange,
                            definitionData: definitionData || {},
                            definitionUi: definitionUi || {},
                            index: index,
                            categoryHash: categoryHash
                        });
                    }
                    setCardOpenArray(__spreadArray(__spreadArray([], cardOpenArray, true), [false], false));
                }, cardOpen: expanded, setCardOpen: function (newState) { return setCardOpenArray(__spreadArray(__spreadArray(__spreadArray([], cardOpenArray.slice(0, index), true), [newState], false), cardOpenArray.slice(index + 1), true)); }, allFormInputs: allFormInputs, mods: mods });
        }
        else if (elementProp.propType === 'section') {
            // create a section with the appropriate schemas here
            return React.createElement(Section, { schema: elementProp.schema, uischema: elementProp.uischema, onChange: function (newSchema, newUiSchema, newRef) {
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    var oldSection = newElementObjArr[index];
                    newElementObjArr[index] = __assign(__assign({}, oldSection), { schema: newSchema, uischema: newUiSchema, propType: 'section' });
                    if (newRef)
                        newElementObjArr[index].$ref = newRef;
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onNameChange: function (newName) {
                    var oldSection = elementProp;
                    // check if newName overlaps with an existing name
                    if (elementPropArr.map(function (elem) { return elem.name; }).includes(newName))
                        return;
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    newElementObjArr[index] = __assign(__assign({}, oldSection), { name: newName });
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onRequireToggle: function () {
                    var oldSection = elementProp;
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    newElementObjArr[index] = __assign(__assign({}, oldSection), { required: !oldSection.required });
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onDependentsChange: function (newDependents) {
                    var oldSection = elementProp;
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    newElementObjArr[index] = __assign(__assign({}, oldSection), { dependents: newDependents });
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        onChange: onChange,
                        definitionData: definitionData,
                        definitionUi: definitionUi
                    });
                }, onDelete: function () {
                    // splice out this index from the card array
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    newElementObjArr.splice(index, 1);
                    setCardOpenArray(__spreadArray(__spreadArray([], cardOpenArray.slice(0, index), true), cardOpenArray.slice(index + 1), true));
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onMoveUp: function () {
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    if (index === 0)
                        return;
                    var tempBlock = newElementObjArr[index - 1];
                    newElementObjArr[index - 1] = newElementObjArr[index];
                    newElementObjArr[index] = tempBlock;
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, onMoveDown: function () {
                    var newElementObjArr = generateElementPropsFromSchemas({
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        categoryHash: categoryHash
                    });
                    if (index === elementPropArr.length - 1)
                        return;
                    var tempBlock = newElementObjArr[index + 1];
                    newElementObjArr[index + 1] = newElementObjArr[index];
                    newElementObjArr[index] = tempBlock;
                    updateSchemas(newElementObjArr, {
                        schema: schema,
                        uischema: uischema,
                        definitionData: definitionData,
                        definitionUi: definitionUi,
                        onChange: onChange
                    });
                }, name: elementProp.name, key: "".concat(path, "_").concat(elementPropArr[index].name), required: elementProp.required, path: "".concat(path, "_").concat(elementProp.name), definitionData: definitionData || {}, definitionUi: definitionUi || {}, hideKey: hideKey, reference: elementProp.$ref, neighborNames: elementProp.neighborNames, dependents: elementProp.dependents, dependent: elementProp.dependent, parent: elementProp.parent, addElem: function (choice) {
                    if (choice === 'card') {
                        addCardObj({
                            schema: schema,
                            uischema: uischema,
                            mods: mods,
                            onChange: onChange,
                            definitionData: definitionData || {},
                            definitionUi: definitionUi || {},
                            index: index,
                            categoryHash: categoryHash
                        });
                    }
                    else if (choice === 'section') {
                        addSectionObj({
                            schema: schema,
                            uischema: uischema,
                            onChange: onChange,
                            definitionData: definitionData || {},
                            definitionUi: definitionUi || {},
                            index: index,
                            categoryHash: categoryHash
                        });
                    }
                    setCardOpenArray(__spreadArray(__spreadArray([], cardOpenArray, true), [false], false));
                }, cardOpen: expanded, setCardOpen: function (newState) { return setCardOpenArray(__spreadArray(__spreadArray(__spreadArray([], cardOpenArray.slice(0, index), true), [newState], false), cardOpenArray.slice(index + 1), true)); }, allFormInputs: allFormInputs, categoryHash: categoryHash, mods: mods });
        }
        else {
            return React.createElement("div", null,
                React.createElement("h2", null, " Error parsing element "));
        }
    });
    return elementList;
}
exports.generateElementComponentsFromSchemas = generateElementComponentsFromSchemas;
// function called when drag and drop ends
function onDragEnd(result, details) {
    var schema = details.schema, uischema = details.uischema, onChange = details.onChange, definitionData = details.definitionData, definitionUi = details.definitionUi, categoryHash = details.categoryHash;
    var src = result.source.index;
    var dest = result.destination.index;
    var newElementObjArr = generateElementPropsFromSchemas({
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        categoryHash: categoryHash
    });
    var tempBlock = newElementObjArr[src];
    newElementObjArr[src] = newElementObjArr[dest];
    newElementObjArr[dest] = tempBlock;
    updateSchemas(newElementObjArr, {
        schema: schema,
        uischema: uischema,
        definitionData: definitionData || {},
        definitionUi: definitionUi || {},
        onChange: onChange
    });
}
exports.onDragEnd = onDragEnd;
// helper function to recursively update sections
function propagateElementChange(elementArr, definitionData, definitionUi, categoryHash) {
    var updatedElementArr = [];
    elementArr.forEach(function (element) {
        // update section and it's children
        if (element.propType === 'section') {
            var childrenElements = generateElementPropsFromSchemas({
                schema: element.schema,
                uischema: element.uischema,
                definitionData: definitionData,
                definitionUi: definitionUi,
                categoryHash: categoryHash
            });
            var updatedChildren = propagateElementChange(childrenElements, definitionData, definitionUi, categoryHash);
            var newUiSchema = Object.assign(__assign({}, element.uischema), generateSchemaFromElementProps(updatedChildren));
            var newSchema = Object.assign(__assign({}, element.schema), generateSchemaFromElementProps(updatedChildren));
            var newElement = __assign(__assign({}, element), { schema: newSchema, uischema: newUiSchema });
            updatedElementArr.push(newElement);
        }
        else {
            updatedElementArr.push(element);
        }
    });
    return updatedElementArr;
}
// propogate changes in a schema and ui schema with updated definitions but outdated body componenents
function propagateDefinitionChanges(schema, uischema, onChange, categoryHash) {
    var definitionData = schema.definitions;
    var definitionUi = uischema.definitions;
    var bodyElements = generateElementPropsFromSchemas({
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        categoryHash: categoryHash
    });
    var updatedBodyElements = propagateElementChange(bodyElements, definitionData, definitionUi, categoryHash);
    updateSchemas(updatedBodyElements, {
        schema: schema,
        uischema: uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        onChange: onChange
    });
}
exports.propagateDefinitionChanges = propagateDefinitionChanges;
// Member-wise subtraction of array2 from array1
function subtractArray(array1, array2) {
    if (array2 === undefined || array2 === null)
        return array1;
    var keys = array2.reduce(function (acc, curr) {
        acc[curr] = true;
        return acc;
    }, {});
    return array1.filter(function (v) { return !keys[v]; });
}
exports.subtractArray = subtractArray;
function excludeKeys(obj, keys) {
    if (!keys)
        return __assign({}, obj);
    var keysHash = keys.reduce(function (acc, curr) {
        acc[curr] = true;
        return acc;
    }, {});
    return Object.keys(obj).reduce(function (acc, curr) {
        var _a;
        return keysHash[curr] ? acc : __assign(__assign({}, acc), (_a = {}, _a[curr] = obj[curr], _a));
    }, {});
}
exports.excludeKeys = excludeKeys;
function getNewElementDefaultDataOptions(i, mods) {
    if (mods && mods.newElementDefaultDataOptions !== undefined) {
        var title = "".concat(mods.newElementDefaultDataOptions.title, " ").concat(i);
        return __assign(__assign({}, mods.newElementDefaultDataOptions), {
            title: title
        });
    }
    else {
        return {
            title: "New Input ".concat(i),
            type: 'string',
            default: ''
        };
    }
}
exports.getNewElementDefaultDataOptions = getNewElementDefaultDataOptions;
function getRandomId() {
    var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var numberOfChars = chars.length;
    var randomIdLength = 50;
    return Array.from({
        length: randomIdLength
    }).map(function () { return chars[Math.floor(Math.random() * numberOfChars)]; }).join('');
}
exports.getRandomId = getRandomId;
//# sourceMappingURL=utils.js.map