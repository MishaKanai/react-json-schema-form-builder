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
var utils_1 = require("./utils");
var defaultFormInputs_1 = __importDefault(require("./defaults/defaultFormInputs"));
var CardGallery_1 = __importDefault(require("./CardGallery"));
// mocks to record events
var mockEvent = jest.fn(function () { });
var props = {
    definitionSchema: {},
    definitionUiSchema: {},
    onChange: function (newDef, newUiDef) { return mockEvent(newDef, newUiDef); },
    categoryHash: (0, utils_1.generateCategoryHash)(defaultFormInputs_1.default)
};
describe('CardGallery', function () {
    it('renders without error', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardGallery_1.default, __assign({}, props)), {
            attachTo: div
        });
        expect(wrapper.exists('.form_gallery')).toBeTruthy();
    });
    it('renders appropriate number of cards with a give definition', function () {
        var modProps = __assign(__assign({}, props), { definitionSchema: {
                obj1: {
                    type: 'string'
                },
                obj2: {
                    type: 'string'
                },
                obj3: {
                    type: 'string'
                }
            } });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardGallery_1.default, __assign({}, modProps)), {
            attachTo: div
        });
        expect(wrapper.find('.form_gallery_container').length).toEqual(3);
    });
    it('adds a new object to the schema when clicking the plus button', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardGallery_1.default, __assign({}, props)), {
            attachTo: div
        });
        var plusButton = wrapper.find('.fa-square-plus').first();
        plusButton.simulate('click');
        var createButton = wrapper.find('button').at(1);
        expect(mockEvent).toHaveBeenCalledTimes(0);
        createButton.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(1);
        mockEvent.mockClear();
    });
    it('calls the onChange method when editing a card', function () {
        var modProps = __assign(__assign({}, props), { definitionSchema: {
                obj1: {
                    type: 'string'
                },
                obj2: {
                    type: 'string'
                },
                obj3: {
                    type: 'string'
                }
            } });
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardGallery_1.default, __assign({}, modProps)), {
            attachTo: div
        });
        var titleField1 = wrapper.find('.form_gallery_container').first().find('.card-text').at(2);
        titleField1.simulate('change', {
            target: {
                value: 'wow many change'
            }
        });
        titleField1.simulate('blur');
        expect(mockEvent.mock.calls[0][0].obj1.title).toEqual('wow many change');
        mockEvent.mockClear();
    });
});
//# sourceMappingURL=CardGallery.test.js.map