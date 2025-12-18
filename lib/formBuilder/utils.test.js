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
var enzyme_1 = require("enzyme");
var react_1 = __importDefault(require("react"));
var Card_1 = __importDefault(require("./Card"));
var defaultFormInputs_1 = __importDefault(require("./defaults/defaultFormInputs"));
var Section_1 = __importDefault(require("./Section"));
var utils_1 = require("./utils");
var schema = {
    type: 'object',
    properties: {
        obj1: {
            enum: [0, 1, 2, 3, 4],
            title: 'testName'
        },
        obj2: {
            type: 'number',
            title: 'testName2'
        },
        obj3: {
            type: 'string',
            minLength: 5
        }
    }
};
var uischema = {
    obj1: {
        'ui:widget': 'radio'
    },
    'ui:order': ['obj2', 'obj3', 'obj1']
};
var elementPropArr = [{
        name: 'card1',
        dataOptions: {
            type: 'string'
        },
        required: true,
        uiOptions: {},
        propType: 'card'
    }, {
        name: 'card2',
        dataOptions: {
            type: 'number',
            multipleOf: 2
        },
        required: false,
        uiOptions: {
            'ui:widget': 'number'
        },
        propType: 'card'
    }, {
        name: 'card3',
        required: true,
        dataOptions: {
            type: 'boolean'
        },
        uiOptions: {
            'ui:widget': 'boolean'
        },
        propType: 'card'
    }];
var parse = utils_1.parse;
var getCardCategory = utils_1.getCardCategory;
var stringify = utils_1.stringify;
var generateElementPropsFromSchemas = utils_1.generateElementPropsFromSchemas;
var generateElementComponentsFromSchemas = utils_1.generateElementComponentsFromSchemas;
var generateSchemaFromElementProps = utils_1.generateSchemaFromElementProps;
var generateUiSchemaFromElementProps = utils_1.generateUiSchemaFromElementProps;
var getNewElementDefaultDataOptions = utils_1.getNewElementDefaultDataOptions;
function generateSchemaWithUnnamedProperties(amount) {
    var properties = __spreadArray([], Array.from(Array(10).keys()), true).reduce(function (acc, id) {
        var _a;
        return __assign(__assign({}, acc), (_a = {}, _a["".concat(utils_1.DEFAULT_INPUT_NAME).concat(id + 1)] = {
            type: 'string'
        }, _a));
    }, {});
    return {
        $id: 'https://example.com/person.schema.json',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: 'Test',
        type: 'object',
        properties: properties
    };
}
describe('parse', function () {
    it('parses valid JSON into a JS object', function () {
        expect(parse("\n    {\n      \"key\": {\n        \"array\": [\"item1\", \"item2\"],\n        \"name\": \"obj1\",\n        \"num\": 0\n      }\n    }", 'json')).toEqual({
            key: {
                array: ['item1', 'item2'],
                name: 'obj1',
                num: 0
            }
        });
    });
    it('parses empty JSON into an empty JS object', function () {
        expect(parse('', 'json')).toEqual({});
    });
});
describe('stringify', function () {
    it('turns an object into validly formatted JSON', function () {
        expect(stringify({
            key: {
                array: ['item1', 'item2'],
                name: 'obj1',
                num: 0
            }
        }, 'json')).toEqual('{"key":{"array":["item1","item2"],"name":"obj1","num":0}}');
    });
});
describe('getCardCategory', function () {
    it('returns the correct category for cards without ui refinements', function () {
        var card = {
            dataOptions: {
                type: 'string'
            },
            uiOptions: {},
            propType: 'card'
        };
        var categoryHash = (0, utils_1.generateCategoryHash)(defaultFormInputs_1.default);
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('shortAnswer');
        card = {
            dataOptions: {
                type: 'integer'
            },
            uiOptions: {},
            propType: 'card'
        };
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('integer');
        card = {
            dataOptions: {
                type: 'number'
            },
            uiOptions: {},
            propType: 'card'
        };
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('number');
        card = {
            dataOptions: {
                type: 'boolean'
            },
            uiOptions: {},
            propType: 'card'
        };
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('checkbox');
        card = {
            dataOptions: {
                type: 'array'
            },
            uiOptions: {},
            propType: 'card'
        };
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('array');
        card = {
            dataOptions: {
                enum: [0, 1, 2, 3, 4, 5]
            },
            uiOptions: {},
            propType: 'card'
        };
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('dropdown');
    });
    it('returns the correct category for cards with ui refinements', function () {
        var card = {
            dataOptions: {
                type: 'string'
            },
            uiOptions: {
                'ui:widget': 'password'
            },
            propType: 'card'
        };
        var categoryHash = (0, utils_1.generateCategoryHash)(defaultFormInputs_1.default);
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('password');
        card = {
            dataOptions: {
                enum: [0, 1, 2, 3, 4, 5]
            },
            uiOptions: {
                'ui:widget': 'radio'
            },
            propType: 'card'
        };
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('radio');
        card = {
            dataOptions: {
                type: 'array'
            },
            uiOptions: {},
            propType: 'card'
        };
        expect(getCardCategory(card, categoryHash, defaultFormInputs_1.default)).toEqual('array');
    });
});
describe('checkForUnsupportedFeatures', function () {
    it('gives no warnings for various valid combinations', function () {
        var testSchema = {
            type: 'object'
        };
        var testUischema = {};
        expect((0, utils_1.checkForUnsupportedFeatures)(testSchema, testUischema, defaultFormInputs_1.default)).toEqual([]);
        testSchema = {
            type: 'object',
            properties: {
                obj1: {
                    type: 'string'
                },
                obj2: {
                    type: 'string'
                }
            }
        };
        testUischema = {
            'ui:order': ['obj1', 'obj2']
        };
        expect((0, utils_1.checkForUnsupportedFeatures)(testSchema, testUischema, defaultFormInputs_1.default)).toEqual([]);
    });
    it('gives no warnings for the inclusion of $schema and meta keywords', function () {
        var testSchema = {
            type: 'object',
            $schema: 'http://json-schema.org/draft-07/schema#',
            meta: {
                some: 'meta information'
            }
        };
        var testUischema = {};
        expect((0, utils_1.checkForUnsupportedFeatures)(testSchema, testUischema, defaultFormInputs_1.default)).toEqual([]);
    });
    it('gives warnings for unknown features in schema', function () {
        var testSchema = {
            type: 'object'
        };
        var testUischema = {};
        expect((0, utils_1.checkForUnsupportedFeatures)(testSchema, testUischema, defaultFormInputs_1.default)).toEqual([]);
        testSchema = {
            type: 'object',
            erroneousKey: 'val',
            properties: {
                obj1: {
                    type: 'string'
                },
                obj2: {
                    type: 'number'
                }
            },
            dependencies: {
                a: {
                    type: 'string'
                },
                b: {
                    type: 'string'
                }
            }
        };
        testUischema = {
            'ui:order': ['obj1', 'obj2']
        };
        expect((0, utils_1.checkForUnsupportedFeatures)(testSchema, testUischema, defaultFormInputs_1.default)).toEqual(['Unrecognized Object Property: erroneousKey']);
    });
    it('gives warnings for unknown features in ui schema', function () {
        var testSchema = {
            type: 'object'
        };
        var testUischema = {};
        expect((0, utils_1.checkForUnsupportedFeatures)(testSchema, testUischema, defaultFormInputs_1.default)).toEqual([]);
        testSchema = {
            type: 'object',
            properties: {
                obj1: {
                    type: 'string'
                },
                obj2: {
                    type: 'number'
                }
            }
        };
        testUischema = {
            'ui:order': ['obj1', 'obj2'],
            'ui:error': {
                asdf: 'asdf'
            },
            obj1: {
                'ui:widget': 'password',
                'ui:error2': 'err'
            }
        };
        expect((0, utils_1.checkForUnsupportedFeatures)(testSchema, testUischema, defaultFormInputs_1.default)).toEqual(['Unrecognized UI schema property: ui:error', 'UI Property: ui:error2 for obj1']);
    });
});
describe('generateElementPropsFromSchemas', function () {
    it('generates an array of card objects from a schema and ui schema', function () {
        var cardObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            categoryHash: (0, utils_1.generateCategoryHash)(defaultFormInputs_1.default),
            allFormInputs: defaultFormInputs_1.default
        });
        expect(cardObjArr).toHaveLength(3);
        // see if reading properties from data schema
        expect(cardObjArr[0].dataOptions.title).toEqual('testName2');
        // see if reading type specific properties from data schema
        expect(cardObjArr[1].dataOptions.minLength).toEqual(5);
        // check if reading the ui schema
        expect(cardObjArr[2].uiOptions['ui:widget']).toEqual('radio');
        // check if order is correct
        expect(cardObjArr[0].name).toEqual('obj2');
        expect(cardObjArr[1].name).toEqual('obj3');
        expect(cardObjArr[2].name).toEqual('obj1');
    });
    it('generates an array of card objects with titles that remain the same for dependency updates', function () {
        var dependencySchema = {
            type: 'object',
            properties: {
                parentFirstNames: {
                    $ref: '#/definitions/firstNames',
                    title: 'Parent First Names',
                    description: ''
                }
            },
            dependencies: {
                parentFirstNames: {
                    properties: {
                        childFirstNames: {
                            $ref: '#/definitions/firstNames',
                            title: 'Child First Names',
                            description: ''
                        }
                    },
                    required: []
                }
            },
            definitions: {
                first_names: {
                    title: 'First Names',
                    type: 'string'
                }
            },
            required: []
        };
        var dependencyUiSchema = {
            'ui:order': ['parentFirstNames', 'childFirstNames']
        };
        var cardObjArr = generateElementPropsFromSchemas({
            schema: dependencySchema,
            uischema: dependencyUiSchema,
            categoryHash: (0, utils_1.generateCategoryHash)(defaultFormInputs_1.default),
            allFormInputs: defaultFormInputs_1.default
        });
        expect(cardObjArr).toHaveLength(2);
        //check that the dependency element's title remains the same.
        expect(cardObjArr[1].dataOptions.title).toEqual('Child First Names');
        //check that the dependency element's title is not the definition's title.
        expect(cardObjArr[1].dataOptions.title).not.toEqual('First Names');
    });
});
describe('generateSchemaFromElementProps', function () {
    var schemaProps = generateSchemaFromElementProps(elementPropArr, defaultFormInputs_1.default);
    it('generates a schema representation of properties from card object array', function () {
        expect(schemaProps.properties).toEqual({
            card1: {
                type: 'string'
            },
            card2: {
                multipleOf: 2,
                type: 'number'
            },
            card3: {
                type: 'boolean'
            }
        });
        expect(schemaProps.required).toEqual(['card1', 'card3']);
    });
    it('throws an exception if propType is invalid', function () {
        expect(function () { return generateSchemaFromElementProps([{
                name: 'card3',
                required: true,
                dataOptions: {
                    type: 'boolean'
                },
                uiOptions: {
                    'ui:widget': 'boolean'
                },
                propType: 'foobar'
            }], defaultFormInputs_1.default); }).toThrow(new Error('Element that is neither card, section, nor ref'));
    });
    it('generates schema from element with schema prop', function () {
        var expectedSchemaElement = {
            $ref: '#/definitions/someDefinition',
            title: 'Input Field',
            description: 'This is an example description'
        };
        var result = generateSchemaFromElementProps([{
                name: 'exampleCard',
                required: true,
                $ref: '#/definitions/someDefinition',
                schema: {
                    description: 'This is an example description',
                    title: 'Input Field'
                },
                propType: 'card'
            }], defaultFormInputs_1.default);
        expect(result.properties.exampleCard).toEqual(expectedSchemaElement);
    });
    it('generates schema from element with dataOptions prop', function () {
        var expectedSchemaElement = {
            $ref: '#/definitions/someDefinition',
            title: 'Input Field',
            description: 'This is an example description'
        };
        var result = generateSchemaFromElementProps([{
                name: 'exampleCard',
                required: true,
                $ref: '#/definitions/someDefinition',
                dataOptions: {
                    description: 'This is an example description',
                    title: 'Input Field'
                },
                propType: 'card'
            }], defaultFormInputs_1.default);
        expect(result.properties.exampleCard).toEqual(expectedSchemaElement);
    });
    it('generates the correct JSON Schema from a compound element with the required prop', function () {
        var expectedSchemaElement = {
            $ref: '#/definitions/someDefinition',
            title: 'Input Field',
            description: 'This is an example description',
            required: ['field_one']
        };
        var result = generateSchemaFromElementProps([{
                name: 'exampleCard',
                required: true,
                $ref: '#/definitions/someDefinition',
                dataOptions: {
                    description: 'This is an example description',
                    title: 'Input Field'
                },
                schema: {
                    required: ['field_one']
                },
                propType: 'card'
            }], defaultFormInputs_1.default);
        expect(result.properties.exampleCard).toEqual(expectedSchemaElement);
    });
});
describe('generateUiSchemaFromElementProps', function () {
    var uiSchema = generateUiSchemaFromElementProps(elementPropArr, defaultFormInputs_1.default);
    it('generates a ui schema representation from card object array', function () {
        expect(uiSchema).toEqual({
            card2: {
                'ui:widget': 'number'
            },
            card3: {
                'ui:widget': 'boolean'
            },
            'ui:order': ['card1', 'card2', 'card3']
        });
    });
});
describe('generateElementComponentsFromSchemas', function () {
    it('propagates mods to Section component', function () {
        var MockComponent = jest.fn(function () { return react_1.default.createElement("div", null); });
        var mods = {
            customFormInputs: {
                test: {
                    displayName: 'Test',
                    matchIf: [{
                            types: ['number'],
                            widget: 'test'
                        }],
                    defaultDataSchema: {},
                    defaultUiSchema: {
                        'ui:widget': 'test'
                    },
                    type: 'number',
                    cardBody: MockComponent
                }
            }
        };
        var allFormInputs = __assign(__assign({}, defaultFormInputs_1.default), mods.customFormInputs);
        var categoryHash = (0, utils_1.generateCategoryHash)(allFormInputs);
        var TestComponent = function () { return react_1.default.createElement(react_1.default.Fragment, null, generateElementComponentsFromSchemas({
            schemaData: {
                type: 'object',
                properties: {
                    section1: {
                        title: 'Section 1',
                        type: 'object',
                        properties: {
                            newInput1: {
                                items: {
                                    type: 'number'
                                },
                                title: 'New Input 1',
                                type: 'array'
                            }
                        },
                        dependencies: {},
                        required: []
                    }
                },
                dependencies: {},
                required: []
            },
            uiSchemaData: {
                section1: {
                    newInput1: {
                        items: {
                            'ui:widget': 'test'
                        }
                    },
                    'ui:order': ['newInput1']
                },
                'ui:order': ['section1']
            },
            onChange: function () { },
            path: '',
            cardOpenArray: [true],
            setCardOpenArray: function () { },
            allFormInputs: allFormInputs,
            mods: mods,
            categoryHash: categoryHash,
            Card: Card_1.default,
            Section: Section_1.default
        })); };
        var div = document.createElement('div');
        document.body.appendChild(div);
        (0, enzyme_1.mount)(react_1.default.createElement(TestComponent, null), {
            attachTo: div
        });
        expect(MockComponent.mock.calls[0][0].mods).toEqual(mods);
    });
});
describe('subtractArray', function () {
    it('returns the first array if the second array is undefined', function () {
        var array1 = ['a', 'b', 'f'];
        var array2 = undefined;
        var expectedResult = ['a', 'b', 'f'];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns an empty array if both arrays are empty', function () {
        var array1 = [];
        var array2 = [];
        var expectedResult = [];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns an empty array if both arrays are identical', function () {
        var array1 = ['a', 'b', 'c'];
        var array2 = ['a', 'b', 'c'];
        var expectedResult = [];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns an empty array if both arrays have the same elements', function () {
        var array1 = ['c', 'a', 'b', 'd'];
        var array2 = ['a', 'b', 'c', 'd'];
        var expectedResult = [];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns an array equal to array1 if array2 is empty', function () {
        var array1 = ['c', 'a', 'b', 'd'];
        var array2 = [];
        var expectedResult = ['c', 'a', 'b', 'd'];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns an empty array if array1 is empty', function () {
        var array1 = [];
        var array2 = ['a', 'b', 'c'];
        var expectedResult = [];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns array1 without the elements in array2', function () {
        var array1 = ['a', 'b', 'c', 'd', 'e'];
        var array2 = ['a', 'b', 'c'];
        var expectedResult = ['d', 'e'];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns array1 without the elements in array2 even if array2 contains elements not included in array1', function () {
        var array1 = ['a', 'b', 'c', 'd', 'e'];
        var array2 = ['a', 'b', 'c', 'f', 'g'];
        var expectedResult = ['d', 'e'];
        var actualResult = (0, utils_1.subtractArray)(array1, array2);
        expect(actualResult).toEqual(expectedResult);
    });
});
describe('excludeKeys', function () {
    it('returns the given object excluding the given keys', function () {
        var obj = {
            foo: 'bar',
            biz: 'baz',
            boo: 'baa',
            bla: 'bee'
        };
        var keys = ['biz', 'boo', 'extraKey'];
        var expectedResult = {
            foo: 'bar',
            bla: 'bee'
        };
        var actualResult = (0, utils_1.excludeKeys)(obj, keys);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns the given object if keys is empty', function () {
        var obj = {
            foo: 'bar',
            biz: 'baz',
            boo: 'baa',
            bla: 'bee'
        };
        var keys = [];
        var expectedResult = {
            foo: 'bar',
            biz: 'baz',
            boo: 'baa',
            bla: 'bee'
        };
        var actualResult = (0, utils_1.excludeKeys)(obj, keys);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns the given object if keys is undefined', function () {
        var obj = {
            foo: 'bar',
            biz: 'baz',
            boo: 'baa',
            bla: 'bee'
        };
        var keys = undefined;
        var expectedResult = {
            foo: 'bar',
            biz: 'baz',
            boo: 'baa',
            bla: 'bee'
        };
        var actualResult = (0, utils_1.excludeKeys)(obj, keys);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns the given object if keys is null', function () {
        var obj = {
            foo: 'bar',
            biz: 'baz',
            boo: 'baa',
            bla: 'bee'
        };
        var keys = null;
        var expectedResult = {
            foo: 'bar',
            biz: 'baz',
            boo: 'baa',
            bla: 'bee'
        };
        var actualResult = (0, utils_1.excludeKeys)(obj, keys);
        expect(actualResult).toEqual(expectedResult);
    });
    it('returns an empty object if both obj and keys are empty', function () {
        var obj = {};
        var keys = [];
        var expectedResult = {};
        var actualResult = (0, utils_1.excludeKeys)(obj, keys);
        expect(actualResult).toEqual(expectedResult);
    });
});
describe('getNewElementDefaultDataOptions', function () {
    it('returns a default dataOptions when undefined mods are passed', function () {
        var i = 1;
        var mods = undefined;
        var expectedDataOptions = {
            title: 'New Input 1',
            type: 'string',
            default: ''
        };
        var actualDataOptions = getNewElementDefaultDataOptions(i, mods);
        expect(actualDataOptions).toEqual(expectedDataOptions);
    });
    it('returns a title containing the index', function () {
        var i = 146;
        var mods = undefined;
        var expectedDataOptions = {
            title: 'New Input 146',
            type: 'string',
            default: ''
        };
        var actualDataOptions = getNewElementDefaultDataOptions(i, mods);
        expect(actualDataOptions).toEqual(expectedDataOptions);
    });
    it('returns a default dataOptions when mods without newElementDefaultDataOptions are passed', function () {
        var i = 1;
        var mods = {
            labels: {
                formNameLabel: 'Form Title'
            }
        };
        var expectedDataOptions = {
            title: 'New Input 1',
            type: 'string',
            default: ''
        };
        var actualDataOptions = getNewElementDefaultDataOptions(i, mods);
        expect(actualDataOptions).toEqual(expectedDataOptions);
    });
    it('returns dataOptions with a $ref when mods with newElementDefaultDataOptions are passed', function () {
        var i = 1;
        var mods = {
            newElementDefaultDataOptions: {
                title: 'Input Field',
                $ref: '#/definitions/someDefinition'
            }
        };
        var expectedDataOptions = {
            title: 'Input Field 1',
            $ref: '#/definitions/someDefinition'
        };
        var actualDataOptions = getNewElementDefaultDataOptions(i, mods);
        expect(actualDataOptions).toEqual(expectedDataOptions);
    });
    it('returns dataOptions with another kind of field when mods with newElementDefaultDataOptions are passed', function () {
        var i = 1;
        var mods = {
            newElementDefaultDataOptions: {
                title: 'Input',
                type: 'number',
                default: 1,
                minimum: 1,
                maximum: 10
            }
        };
        var expectedDataOptions = {
            title: 'Input 1',
            type: 'number',
            default: 1,
            minimum: 1,
            maximum: 10
        };
        var actualDataOptions = getNewElementDefaultDataOptions(i, mods);
        expect(actualDataOptions).toEqual(expectedDataOptions);
    });
});
describe('addCardObj', function () {
    it('should be able to add more than 10 unnamed CardObj', function () {
        var mockEvent = jest.fn(function () { });
        var defaultUiSchema = {};
        var props = {
            schema: generateSchemaWithUnnamedProperties(10),
            uischema: defaultUiSchema,
            onChange: function (schema, uischema) { return mockEvent(schema, uischema); },
            definitionData: {},
            definitionUi: {},
            categoryHash: {}
        };
        (0, utils_1.addCardObj)(props);
        var currentSchema = mockEvent.mock.calls[0][0];
        var inputElementsCount = Object.keys(currentSchema.properties).length;
        expect(inputElementsCount).toEqual(11);
    });
});
describe('addSectionObj', function () {
    it('should be able to add more than 10 unnamed SectionObj', function () {
        var mockEvent = jest.fn(function () { });
        var defaultUiSchema = {};
        var props = {
            schema: generateSchemaWithUnnamedProperties(10),
            uischema: defaultUiSchema,
            onChange: function (schema, uischema) { return mockEvent(schema, uischema); },
            definitionData: {},
            definitionUi: {},
            categoryHash: {}
        };
        (0, utils_1.addSectionObj)(props);
        var currentSchema = mockEvent.mock.calls[0][0];
        var inputElementsCount = Object.keys(currentSchema.properties).length;
        expect(inputElementsCount).toEqual(11);
    });
});
describe('getRandomId', function () {
    it('should return string of length 50 of random lower case letters', function () {
        expect((0, utils_1.getRandomId)()).toMatch(/^[a-z]{50}$/);
    });
});
//# sourceMappingURL=utils.test.js.map