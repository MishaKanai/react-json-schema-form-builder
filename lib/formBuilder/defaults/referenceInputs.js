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
exports.CardReferenceParameterInputs = void 0;
var react_1 = __importDefault(require("react"));
var PlaceholderInput_1 = require("../inputs/PlaceholderInput");
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
function CardReferenceParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    return react_1.default.createElement("div", null,
        react_1.default.createElement(PlaceholderInput_1.PlaceholderInput, { parameters: parameters, onChange: onChange }));
}
exports.CardReferenceParameterInputs = CardReferenceParameterInputs;
function RefChoice(_a) {
    var parameters = _a.parameters, onChange = _a.onChange;
    var pathArr = (parameters.$ref || '').split('/');
    // const currentValueLabel = pathArr.length === 3 && pathArr[0] === '#' && pathArr[1] === 'definitions' && (parameters.definitionData || {})[pathArr[2]] ? parameters.definitionData[pathArr[2]].title || parameters.$ref : parameters.$ref;
    return react_1.default.createElement("div", { className: 'card-select' },
        react_1.default.createElement(FormControl_1.default, null,
            react_1.default.createElement(InputLabel_1.default, { shrink: true, id: "refchoice-select-label" }, "Reference"),
            react_1.default.createElement(Select_1.default, { labelId: "refchoice-select-label", id: "refchoice-select", value: parameters.$ref, label: "Reference", onChange: function (e) {
                    onChange(__assign(__assign({}, parameters), { $ref: e.target.value }));
                } }, Object.keys(parameters.definitionData || {}).map(function (key) {
                var value = "#/definitions/".concat(key);
                var label = parameters.definitionData[key].title || value;
                return react_1.default.createElement(MenuItem_1.default, { key: value, value: value }, label);
            }))));
}
var referenceInputs = {
    ref: {
        displayName: 'Reference',
        matchIf: [{
                types: ['null'],
                $ref: true
            }],
        defaultDataSchema: {
            $ref: '',
            title: '',
            description: ''
        },
        defaultUiSchema: {},
        type: 'string',
        cardBody: RefChoice,
        modalBody: CardReferenceParameterInputs
    }
};
exports.default = referenceInputs;
//# sourceMappingURL=referenceInputs.js.map