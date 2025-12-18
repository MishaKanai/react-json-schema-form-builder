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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var FormBuilder_1 = __importDefault(require("./FormBuilder"));
// mocks to record events
var mockEvent = jest.fn(function () { });
var props = {
    schema: '',
    uischema: '',
    onChange: function (newSchema, newUiSchema) { return mockEvent(newSchema, newUiSchema); }
};
var schemaWithDefinitions = {
    type: 'object',
    definitions: {
        exampleDefinition: {
            type: 'string'
        }
    },
    properties: {
        exampleField: {
            $ref: '#/definitions/exampleDefinition',
            title: 'Custom Title',
            description: 'Custom Description'
        }
    }
};
var propsWithDefinitions = {
    schema: JSON.stringify(schemaWithDefinitions),
    uiSchema: '',
    onChange: function (newSchema, newUiSchema) { return mockEvent(newSchema, newUiSchema); }
};
describe('FormBuilder', function () {
    it('renders without error', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        expect(wrapper.exists('.form-body')).toBeTruthy();
        expect(wrapper.exists('[data-test="form-head"]')).toBeTruthy();
    });
    it('renders the appropriate number of cards', function () {
        var modProps = __assign(__assign({}, props), { schema: "{\n   \"type\": \"object\",\n   \"properties\": {\n      \"obj1\": {\n         \"type\": \"string\"\n      },\n      \"obj2\": {\n         \"type\": \"number\"\n      },\n      \"obj3\": {\n         \"type\": \"boolean\"\n      }\n   }\n}" });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, modProps)), {
            attachTo: div
        });
        expect(wrapper.find('.form-body').first().find('.collapse').length).toEqual(3);
    });
    it('generates warning messages', function () {
        var modProps = __assign(__assign({}, props), { schema: "{\n   \"type\": \"object\",\n   \"properties\": {\n      \"obj1\": {\n         \"type\": \"string\"\n      },\n      \"obj2\": {\n         \"type\": \"number\",\n         \"badSideProp\": \"asdf\"\n      },\n      \"obj3\": {\n         \"type\": \"boolean\"\n      }\n   }\n}", uischema: "{\n   \"ui:order\": [\n      \"obj1\",\n      \"obj3\",\n      \"obj2\"\n   ],\n   \"invalidUiProp\": \"asdf\"\n}" });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, modProps)), {
            attachTo: div
        });
        var errors = wrapper.find('.alert-warning').first().find('li').map(function (error) { return error.text(); });
        expect(errors).toEqual(['Unrecognized UI schema property: invalidUiProp', 'Property Parameter: badSideProp in obj2']);
    });
    it('renders the cards in the correct order according to ui:order', function () {
        var modProps = __assign(__assign({}, props), { schema: "\n        {\n   \"type\": \"object\",\n   \"properties\": {\n      \"obj1\": {\n         \"type\": \"string\",\n         \"title\": \"obj1\"\n      },\n      \"obj2\": {\n         \"type\": \"number\",\n         \"badSideProp\": \"asdf\",\n         \"title\": \"obj2\"\n      },\n      \"obj3\": {\n         \"type\": \"boolean\",\n         \"title\": \"obj3\"\n      }\n   }\n}", uischema: "\n{\n   \"ui:order\": [\n      \"obj1\",\n      \"obj3\",\n      \"obj2\"\n   ],\n   \"invalidUiProp\": \"asdf\"\n}" });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, modProps)), {
            attachTo: div
        });
        var blocks = wrapper.find('.collapse').map(function (block) { return block.find('.card-text').first().props().value; });
        expect(blocks).toEqual(['obj1', 'obj3', 'obj2']);
    });
    it('adds to the schema when hitting the add card button', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        var plusButton = wrapper.find('.fa-square-plus').first();
        plusButton.simulate('click');
        var createButton = wrapper.find('button').at(1);
        expect(mockEvent).toHaveBeenCalledTimes(0);
        createButton.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(1);
        var cardInputs = wrapper.first().find('input');
        mockEvent.mockClear();
    });
    it('renders custom labels in the form head', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props, { mods: {
                labels: {
                    formNameLabel: 'test name label',
                    formDescriptionLabel: 'test description label'
                }
            } })), {
            attachTo: div
        });
        expect(wrapper.find('[data-test="form-name-label"]').text()).toEqual('test name label');
        expect(wrapper.find('[data-test="form-description-label"]').text()).toEqual('test description label');
    });
    it('does not render the form head if showFormHead is false', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props, { mods: {
                showFormHead: false
            } })), {
            attachTo: div
        });
        expect(wrapper.exists('.form-body')).toBeTruthy();
        expect(wrapper.exists('[data-test="form-head"]')).toBeFalsy();
    });
    it('renders $refs with custom titles and descriptions', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, propsWithDefinitions)), {
            attachTo: div
        });
        expect(wrapper.exists('.form-body')).toBeTruthy();
        var cardInputs = wrapper.find('.card-container').first().find('input');
        expect(cardInputs.at(1).props().value).toEqual('Custom Title');
        expect(cardInputs.at(2).props().value).toEqual('Custom Description');
    });
    it('supports the $schema keyword and there is no error', function () {
        var jsonSchema = {
            $schema: 'http://json-schema.org/draft-07/schema#'
        };
        var props = {
            schema: JSON.stringify(jsonSchema),
            uiSchema: '{}',
            onChange: jest.fn(function () { }),
            mods: {},
            className: 'my-form-builder'
        };
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        var errors = wrapper.find('.alert-warning').first().find('li').map(function (error) { return error.text(); });
        expect(errors).toEqual([]);
    });
    it('supports the meta keyword and there is no error', function () {
        var jsonSchema = {
            $schema: 'http://json-schema.org/draft-07/schema#',
            meta: {
                some: 'meta information'
            }
        };
        var props = {
            schema: JSON.stringify(jsonSchema),
            uiSchema: '{}',
            onChange: jest.fn(function () { }),
            mods: {},
            className: 'my-form-builder'
        };
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        var errors = wrapper.find('.alert-warning').first().find('li').map(function (error) { return error.text(); });
        expect(errors).toEqual([]);
    });
    it('supports column size', function () {
        var jsonSchema = {
            $schema: 'http://json-schema.org/draft-07/schema#',
            meta: {
                some: 'meta information'
            }
        };
        var uischema = {
            newInput1: {
                'ui:column': 4
            },
            'ui:order': ['newInput1']
        };
        var props = {
            schema: JSON.stringify(jsonSchema),
            uiSchema: JSON.stringify(uischema),
            onChange: jest.fn(function () { }),
            mods: {},
            className: 'my-form-builder'
        };
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        var errors = wrapper.find('.alert-warning').first().find('li').map(function (error) { return error.text(); });
        expect(errors).toEqual([]);
    });
    it('supports column size on sections', function () {
        var jsonSchema = {
            definitions: {
                first_names: {
                    title: 'First Names',
                    type: 'string'
                },
                last_names: {
                    title: 'Last Names',
                    type: 'string'
                },
                residential_address: {
                    title: 'Residential Address',
                    type: 'object',
                    properties: {
                        country: {
                            title: 'Country',
                            type: 'string'
                        },
                        street_address_line: {
                            title: 'Street Address Line',
                            type: 'string'
                        }
                    },
                    dependencies: {},
                    required: []
                }
            },
            properties: {
                user_first_names: {
                    $ref: '#/definitions/first_names',
                    title: 'User First Names',
                    description: ''
                },
                user_last_name: {
                    $ref: '#/definitions/last_names',
                    title: 'User Last Name',
                    description: ''
                },
                user_residential_address: {
                    $ref: '#/definitions/residential_address',
                    title: 'User Residential Address',
                    description: ''
                }
            },
            dependencies: {},
            required: [],
            type: 'object'
        };
        var uischema = {
            definitions: {
                residential_address: {
                    'ui:order': ['country', 'street_address_line']
                }
            },
            'ui:order': ['user_first_names', 'user_last_name', 'user_residential_address'],
            user_first_names: {
                'ui:column': '25'
            },
            user_last_name: {
                'ui:column': '25'
            },
            user_residential_address: {
                'ui:order': ['country', 'address_line'],
                'ui:column': '50',
                country: {
                    'ui:column': '30'
                },
                street_address_line: {
                    'ui:column': '70'
                }
            }
        };
        var props = {
            schema: JSON.stringify(jsonSchema),
            uiSchema: JSON.stringify(uischema),
            onChange: jest.fn(function () { }),
            mods: {},
            className: 'my-form-builder'
        };
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        var errors = wrapper.find('.alert-warning').first().find('li').map(function (error) { return error.text(); });
        expect(errors).toEqual([]);
    });
    it('validates additionalProperties as a valid property', function () {
        var jsonSchema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            properties: {},
            required: [],
            additionalProperties: false
        };
        var props = {
            schema: JSON.stringify(jsonSchema),
            uiSchema: '{}',
            onChange: jest.fn(function () { }),
            mods: {},
            className: 'my-form-builder'
        };
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        var errors = wrapper.find('.alert-warning').first().find('li').map(function (error) { return error.text(); });
        expect(errors).toEqual([]);
    });
    it('should support placeholder in the UI schema', function () {
        var jsonSchema = {
            $schema: 'http://json-schema.org/draft-07/schema#',
            type: 'object',
            properties: {
                input1: {
                    $ref: '#/definitions/name',
                    title: 'First Name',
                    description: 'Please enter your first name'
                },
                input2: {
                    title: 'Last Name',
                    type: 'string'
                }
            }
        };
        var uischema = {
            input1: {
                'ui:placeholder': 'Reference Placeholder'
            },
            input2: {
                'ui:placeholder': 'ShortAnswer Placeholder'
            },
            'ui:order': ['input1', 'input2']
        };
        var props = {
            schema: JSON.stringify(jsonSchema),
            uiSchema: JSON.stringify(uischema),
            onChange: jest.fn(function () { }),
            mods: {},
            className: 'my-form-builder'
        };
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, props)), {
            attachTo: div
        });
        var errors = wrapper.find('.alert-warning').first().find('li').map(function (error) { return error.text(); });
        expect(errors).toEqual([]);
    });
    it("should allow changing of Section's Display Name", function () {
        var uiSchema = {
            definitions: {
                full_names: {
                    'ui:order': ['first_names', 'last_names']
                }
            },
            user_full_names: {
                'ui:order': ['first_names', 'last_names']
            },
            'ui:order': ['user_full_names']
        };
        var jsonSchema = {
            definitions: {
                full_names: {
                    title: 'Full Names',
                    type: 'object',
                    description: 'This is a composite field',
                    properties: {
                        first_names: {
                            title: 'First Names',
                            type: 'string'
                        },
                        last_names: {
                            title: 'Last Names',
                            type: 'string'
                        }
                    },
                    dependencies: {},
                    required: []
                }
            },
            properties: {
                user_full_names: {
                    $ref: '#/definitions/full_names',
                    title: 'User Full Names',
                    description: 'Full names description'
                }
            },
            dependencies: {},
            required: [],
            type: 'object'
        };
        var innerProps = __assign(__assign({}, props), { schema: JSON.stringify(jsonSchema), uiSchema: JSON.stringify(uiSchema) });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, innerProps)), {
            attachTo: div
        });
        var sectionHeadInputs = wrapper.find('.section-container').first().find('.section-head').first().find('input');
        var titleInput = sectionHeadInputs.at(2);
        titleInput.simulate('change', {
            target: {
                value: 'new title change'
            }
        });
        var updatedSchema = JSON.parse(mockEvent.mock.calls[0][0]);
        expect(updatedSchema.properties.user_full_names.title).toEqual('new title change');
        mockEvent.mockClear();
    });
    it("should allow changing of a Section's Description", function () {
        var uiSchema = {
            definitions: {
                full_names: {
                    'ui:order': ['first_names', 'last_names']
                }
            },
            user_full_names: {
                'ui:order': ['first_names', 'last_names']
            },
            'ui:order': ['user_full_names']
        };
        var jsonSchema = {
            definitions: {
                full_names: {
                    title: 'Full Names',
                    type: 'object',
                    description: 'This is a composite field',
                    properties: {
                        first_names: {
                            title: 'First Names',
                            type: 'string'
                        },
                        last_names: {
                            title: 'Last Names',
                            type: 'string'
                        }
                    },
                    dependencies: {},
                    required: []
                }
            },
            properties: {
                user_full_names: {
                    $ref: '#/definitions/full_names',
                    title: 'User Full Names',
                    description: 'Full names description'
                }
            },
            dependencies: {},
            required: [],
            type: 'object'
        };
        var innerProps = __assign(__assign({}, props), { schema: JSON.stringify(jsonSchema), uiSchema: JSON.stringify(uiSchema) });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, innerProps)), {
            attachTo: div
        });
        var sectionHeadInputs = wrapper.find('.section-container').first().find('.section-head').first().find('input');
        var titleInput = sectionHeadInputs.at(3);
        titleInput.simulate('change', {
            target: {
                value: 'new description change'
            }
        });
        var updatedSchema = JSON.parse(mockEvent.mock.calls[0][0]);
        expect(updatedSchema.properties.user_full_names.description).toEqual('new description change');
        mockEvent.mockClear();
    });
    it('should edit card slug and override ui:schema with updated slug', function () {
        var jsonSchema = {
            properties: {
                newInput1: {
                    title: 'New Input 1',
                    type: 'string'
                }
            }
        };
        var uiSchema = {
            'ui:order': ['newInput1'],
            newInput1: {
                'ui:column': '3'
            }
        };
        var innerProps = __assign(__assign({}, props), { schema: JSON.stringify(jsonSchema), uischema: JSON.stringify(uiSchema), onChange: function (newSchema, newUiSchema) {
                jsonSchema = newSchema;
                uiSchema = newUiSchema;
            } });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, __assign({}, innerProps)), {
            attachTo: div
        });
        var cardInputs = wrapper.find('.card-container').first().find('input');
        cardInputs.at(0).simulate('blur', {
            target: {
                value: 'nameA'
            }
        });
        var expected = {
            'ui:order': ['nameA'],
            nameA: {
                'ui:column': '3'
            }
        };
        expect(JSON.parse(uiSchema)).toEqual(expected);
        mockEvent.mockClear();
    });
});
//# sourceMappingURL=FormBuilder.test.js.map