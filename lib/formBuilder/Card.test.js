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
var defaultFormInputs_1 = __importDefault(require("./defaults/defaultFormInputs"));
var Card_1 = __importDefault(require("./Card"));
// mocks to record events
var mockEvent = jest.fn(function () { });
var params = {
    name: 'test',
    category: 'shortAnswer',
    neighborNames: ['test', 'input2']
};
var props = {
    componentProps: params,
    onChange: function (newVals) { return mockEvent(JSON.stringify(newVals)); },
    onDelete: function () { return mockEvent('delete'); },
    onMoveUp: function () { return mockEvent('moveUp'); },
    onMoveDown: function () { return mockEvent('moveDown'); },
    TypeSpecificParameters: function (_a) {
        var parameters = _a.parameters, onChange = _a.onChange;
        return react_1.default.createElement("input", { className: 'inputVal', value: parameters.inputVal || '', onChange: function (val) {
                onChange(__assign(__assign({}, parameters), { inputVal: val.target.value }));
            } });
    },
    allFormInputs: defaultFormInputs_1.default
};
var mods = {
    labels: {
        objectNameLabel: 'Custom Object Name',
        displayNameLabel: 'Custom Display Name',
        descriptionLabel: 'Custom Description',
        inputTypeLabel: 'Custom Input Type'
    }
};
var getHeadingText = function (wrapper, index) {
    return wrapper.find('.card-container').first().find('h5').at(index).html();
};
describe('Card', function () {
    it('renders without error', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        expect(wrapper.exists('.card-container')).toBeTruthy();
    });
    it('calls the delete function on delete', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        var deleteButton = wrapper.find('.card-container').first().find('.fa-trash').first();
        deleteButton.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(1);
        expect(mockEvent).toHaveBeenCalledWith('delete');
        mockEvent.mockClear();
    });
    it('calls the move up and move down functions on arrow presses', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        var moveUp = wrapper.find('.card-container').first().find('.fa-arrow-up').first();
        moveUp.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(1);
        expect(mockEvent).toHaveBeenCalledWith('moveUp');
        var moveDown = wrapper.find('.card-container').first().find('.fa-arrow-down').first();
        moveDown.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(2);
        expect(mockEvent).toHaveBeenCalledWith('moveDown');
        mockEvent.mockClear();
    });
    it('opens up the modal on pencil press', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        var pencil = wrapper.find('.card-container').first().find('.fa-pencil').first();
        pencil.simulate('click');
        expect(wrapper.exists('div[data-test="card-modal"]')).toBeTruthy();
    });
    it('changes the name when the key is altered', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        var key = wrapper.find('.card-container').first().find('.card-text').at(1);
        key.simulate('focus');
        key.simulate('change', {
            target: {
                value: 'wow_name_change'
            }
        });
        key.simulate('blur');
        key.simulate('focus');
        key.simulate('change', {
            target: {
                value: 'test'
            }
        });
        key.simulate('blur');
        expect(mockEvent.mock.calls).toEqual([['{"name":"wow_name_change","category":"shortAnswer","neighborNames":["test","input2"]}'], ['{"name":"test","category":"shortAnswer","neighborNames":["test","input2"]}']]);
        mockEvent.mockClear();
    });
    it('does not change the name if the name is already in use', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        var key = wrapper.find('.card-container').first().find('.card-text').at(1);
        key.simulate('focus');
        key.simulate('change', {
            target: {
                value: 'input2'
            }
        });
        key.simulate('blur');
        expect(mockEvent.mock.calls).toEqual([['{"name":"test","category":"shortAnswer","neighborNames":["test","input2"]}']]);
        mockEvent.mockClear();
    });
    it('calls the onChange with new values when edited', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        var title = wrapper.find('.card-container').first().find('.card-text').at(2);
        title.simulate('change', {
            target: {
                value: 'wow title change'
            }
        });
        title.simulate('blur');
        var description = wrapper.find('.card-container').first().find('.card-text').at(4);
        description.simulate('change', {
            target: {
                value: 'wow description change'
            }
        });
        description.simulate('blur');
        expect(mockEvent.mock.calls).toEqual([['{"name":"test","category":"shortAnswer","neighborNames":["test","input2"],"title":' + '"wow title change"}'], ['{"name":"test","category":"shortAnswer","neighborNames":["test","input2"],' + '"description":"wow description change"}']]);
        mockEvent.mockClear();
    });
    it('renders with default labels if no mods are passed', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, props)), {
            attachTo: div
        });
        var objectNameLabel = getHeadingText(wrapper, 0);
        expect(objectNameLabel).toContain('Object Name');
        var displayNameLabel = getHeadingText(wrapper, 1);
        expect(displayNameLabel).toContain('Display Name');
        var descriptionLabel = getHeadingText(wrapper, 2);
        expect(descriptionLabel).toContain('Description');
        var inputTypeLabel = getHeadingText(wrapper, 3);
        expect(inputTypeLabel).toContain('Input Type');
    });
    it('renders with passed labels', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        var propsWithMods = __assign(__assign({}, props), { mods: mods });
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(Card_1.default, __assign({}, propsWithMods)), {
            attachTo: div
        });
        var objectNameLabel = getHeadingText(wrapper, 0);
        expect(objectNameLabel).toContain('Custom Object Name');
        var displayNameLabel = getHeadingText(wrapper, 1);
        expect(displayNameLabel).toContain('Custom Display Name');
        var descriptionLabel = getHeadingText(wrapper, 2);
        expect(descriptionLabel).toContain('Custom Description');
        var inputTypeLabel = getHeadingText(wrapper, 3);
        expect(inputTypeLabel).toContain('Custom Input Type');
    });
});
//# sourceMappingURL=Card.test.js.map