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
var CardModal_1 = __importDefault(require("./CardModal"));
// mocks to record events
var mockEvent = jest.fn(function () { });
var params = {
    name: 'test'
};
var props = {
    componentProps: params,
    onChange: function (newParams) { return mockEvent(JSON.stringify(newParams)); },
    isOpen: true,
    onClose: function () { return mockEvent('close'); },
    TypeSpecificParameters: function (_a) {
        var parameters = _a.parameters, onChange = _a.onChange;
        return react_1.default.createElement("input", { className: 'inputVal', value: parameters.inputVal || '', onChange: function (val) {
                onChange(__assign(__assign({}, parameters), { inputVal: val.target.value }));
            } });
    }
};
describe('CardModal', function () {
    it('renders without error', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardModal_1.default, __assign({}, props)));
        expect(wrapper.exists('div[data-test="card-modal"]')).toBeTruthy();
    });
    it('calls the close function on cancel', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardModal_1.default, __assign({}, props)));
        expect(wrapper.exists('div[data-test="card-modal"]')).toBeTruthy();
        var cancelButton = wrapper.find('div[data-test="card-modal"]').find('.btn-secondary').first();
        cancelButton.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(1);
        expect(mockEvent).toHaveBeenCalledWith('close');
        mockEvent.mockClear();
    });
    it('calls the change and close functions on save', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardModal_1.default, __assign({}, props)));
        expect(wrapper.exists('div[data-test="card-modal"]')).toBeTruthy();
        var saveButton = wrapper.find('div[data-test="card-modal"]').find('.btn-primary').first();
        saveButton.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(2);
        expect(mockEvent.mock.calls).toEqual([['close'], ['{"name":"test"}']]);
        mockEvent.mockClear();
    });
    it('calls the onChange with a new minimum length when minimum length is altered', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardModal_1.default, __assign({}, props)));
        expect(wrapper.exists('div[data-test="card-modal"]')).toBeTruthy();
        var specificField = wrapper.find('div[data-test="card-modal"]').first().find('.inputVal').first();
        specificField.simulate('change', {
            target: {
                value: 'wow many change'
            }
        });
        var saveButton = wrapper.find('div[data-test="card-modal"]').find('.btn-primary').first();
        saveButton.simulate('click');
        expect(mockEvent).toHaveBeenCalledTimes(2);
        expect(mockEvent.mock.calls).toEqual([['close'], ['{"name":"test","inputVal":"wow many change"}']]);
        mockEvent.mockClear();
    });
});
//# sourceMappingURL=CardModal.test.js.map