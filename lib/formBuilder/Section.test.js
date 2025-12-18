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
var enzyme_1 = require("enzyme");
var react_1 = __importDefault(require("react"));
var defaultFormInputs_1 = __importDefault(require("./defaults/defaultFormInputs"));
var Section_1 = __importDefault(require("./Section"));
// mocks to record events
var mockEvent = jest.fn(function () { });
var defaultSchema = {};
var defaultUiSchema = {};
var props = {
    name: 'test',
    required: false,
    schema: defaultSchema,
    uischema: defaultUiSchema,
    onChange: function (schema, uischema) { return mockEvent(schema, uischema); },
    onNameChange: function (newName) { return mockEvent(newName); },
    onRequireToggle: function () { return mockEvent('toggledRequire'); },
    onDelete: function () { return mockEvent('delete'); },
    path: 'section',
    definitionData: {},
    definitionUi: {},
    allFormInputs: defaultFormInputs_1.default
};
describe('Section', function () {
    it('renders without error', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Section_1.default, __assign({}, props)), {
            attachTo: div
        });
        expect(wrapper.exists('.section-container')).toBeTruthy();
    });
    it('uses mods.tooltipDescriptions', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Section_1.default, __assign({}, props, { mods: {
                tooltipDescriptions: {
                    cardSectionObjectName: 'test object name',
                    cardSectionDisplayName: 'test display name',
                    cardSectionDescription: 'test description'
                }
            } })), {
            attachTo: div
        });
        expect(wrapper.find('[data-test="section-object-name"] Tooltip').props().children).toEqual('test object name');
        expect(wrapper.find('[data-test="section-display-name"] Tooltip').props().children).toEqual('test display name');
        expect(wrapper.find('[data-test="section-description"] Tooltip').props().children).toEqual('test description');
    });
    it('calls the delete function on delete', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Section_1.default, __assign({}, props)), {
            attachTo: div
        });
        var deleteButton = wrapper.find('.fa-trash').first();
        deleteButton.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(1);
        expect(mockEvent).toHaveBeenCalledWith('delete');
        mockEvent.mockClear();
    });
    it('changes the key name of the section', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Section_1.default, __assign({}, props)), {
            attachTo: div
        });
        var keyInput = wrapper.find('.card-text').first();
        keyInput.simulate('focus');
        keyInput.simulate('change', {
            target: {
                value: 'wow_key_change'
            }
        });
        keyInput.simulate('blur');
        keyInput.simulate('focus');
        keyInput.simulate('change', {
            target: {
                value: 'test'
            }
        });
        keyInput.simulate('blur');
        expect(mockEvent.mock.calls).toEqual([['wow_key_change'], ['test']]);
        mockEvent.mockClear();
    });
    it('changes the section title', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Section_1.default, __assign({}, props)), {
            attachTo: div
        });
        var titleInput = wrapper.find('.card-text').at(2);
        titleInput.simulate('change', {
            target: {
                value: 'wow title change'
            }
        });
        expect(mockEvent.mock.calls).toEqual([[{
                    title: 'wow title change'
                }, {}]]);
        mockEvent.mockClear();
    });
    it('changes the section description', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Section_1.default, __assign({}, props)), {
            attachTo: div
        });
        var descriptionInput = wrapper.find('.card-text').at(3);
        descriptionInput.simulate('change', {
            target: {
                value: 'wow description change'
            }
        });
        expect(mockEvent.mock.calls).toEqual([[{
                    title: 'wow description change'
                }, {}]]);
        mockEvent.mockClear();
    });
    it('adds components to the internal schema', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Section_1.default, __assign({}, props)), {
            attachTo: div
        });
        var plusButton = wrapper.find('.fa-square-plus').first();
        plusButton.simulate('click');
        var createButton = wrapper.find('button').at(1);
        createButton.simulate('click');
        expect(mockEvent.mock.calls).toEqual([[{
                    properties: {
                        newInput1: {
                            title: 'New Input 1',
                            type: 'string'
                        }
                    },
                    dependencies: {},
                    required: [],
                    type: 'object'
                }, {
                    'ui:order': ['newInput1']
                }]]);
        mockEvent.mockClear();
    });
});
//# sourceMappingURL=Section.test.js.map