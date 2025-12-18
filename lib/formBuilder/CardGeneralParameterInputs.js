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
var TextField_1 = __importDefault(require("../textFieldContext/TextField"));
var classnames_1 = __importDefault(require("classnames"));
var GeneralParameterInputs_1 = __importDefault(require("./GeneralParameterInputs"));
var utils_1 = require("./utils");
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
var styles_1 = require("@material-ui/core/styles");
var useStyles = (0, styles_1.makeStyles)(function (theme) { return ({
    row: {
        display: 'flex'
    },
    entry: {
        margin: 0,
        width: '50%',
        'text-align': 'left',
        padding: '0.5em',
    }
}); });
function CardGeneralParameterInputs(_a) {
    var parameters = _a.parameters, onChange = _a.onChange, allFormInputs = _a.allFormInputs, mods = _a.mods, _b = _a.showObjectNameInput, showObjectNameInput = _b === void 0 ? true : _b;
    var classes = useStyles();
    var _c = react_1.default.useState(parameters.name), keyState = _c[0], setKeyState = _c[1];
    var _d = react_1.default.useState(null), keyError = _d[0], setKeyError = _d[1];
    var _e = react_1.default.useState(parameters.title), titleState = _e[0], setTitleState = _e[1];
    var _f = react_1.default.useState(parameters.description), descriptionState = _f[0], setDescriptionState = _f[1];
    var elementId = react_1.default.useState((0, utils_1.getRandomId)())[0];
    var categoryMap = (0, utils_1.categoryToNameMap)(parameters.category, allFormInputs);
    var fetchLabel = function (labelName, defaultLabel) {
        return mods && mods.labels && typeof mods.labels[labelName] === 'string' ? mods.labels[labelName] : defaultLabel;
    };
    var objectNameLabel = fetchLabel('objectNameLabel', 'Object Name');
    var displayNameLabel = fetchLabel('displayNameLabel', 'Display Name');
    var descriptionLabel = fetchLabel('descriptionLabel', 'Description');
    var inputTypeLabel = fetchLabel('inputTypeLabel', 'Input Type');
    var availableInputTypes = function () {
        var definitionsInSchema = parameters.definitionData && Object.keys(parameters.definitionData).length !== 0;
        // Hide the "Reference" option if there are no definitions in the schema
        var inputKeys = Object.keys(categoryMap).filter(function (key) { return key !== 'ref' || definitionsInSchema; });
        // Exclude hidden inputs based on mods
        if (mods)
            inputKeys = (0, utils_1.subtractArray)(inputKeys, mods.deactivatedFormInputs);
        return inputKeys.map(function (key) { return ({
            value: key,
            label: categoryMap[key]
        }); }).sort(function (a, b) { return a.label.localeCompare(b.label); });
    };
    var objectNameHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardObjectName === 'string' ? mods.tooltipDescriptions.cardObjectName : 'The back-end name of the object';
    var displayNameHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDisplayName === 'string' ? mods.tooltipDescriptions.cardDisplayName : 'The user-facing name of this object';
    var descriptionHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDescription === 'string' ? mods.tooltipDescriptions.cardDescription : 'This will appear as help text on the form';
    var inputTypeHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardInputType === 'string' ? mods.tooltipDescriptions.cardInputType : 'The type of form input displayed on the form';
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.row },
            showObjectNameInput && react_1.default.createElement("div", { className: classes.entry },
                react_1.default.createElement(TextField_1.default, { helperText: keyError !== null && keyError !== void 0 ? keyError : objectNameHelperText, label: objectNameLabel, error: keyError !== null, value: keyState || '', placeholder: 'Key', type: 'text', onChange: function (ev) { return setKeyState(ev.target.value); }, onBlur: function (ev) {
                        var value = ev.target.value;
                        if (value === parameters.name || !(parameters.neighborNames && parameters.neighborNames.includes(value))) {
                            setKeyError(null);
                            onChange(__assign(__assign({}, parameters), { name: value }));
                        }
                        else {
                            setKeyState(parameters.name);
                            setKeyError("\"".concat(value, "\" is already in use."));
                            onChange(__assign({}, parameters));
                        }
                    } })),
            react_1.default.createElement("div", { className: "".concat(classes.entry, " ").concat(parameters.$ref === undefined ? '' : 'disabled-input') },
                react_1.default.createElement(TextField_1.default, { helperText: displayNameHelperText, label: displayNameLabel, value: titleState || '', placeholder: 'Title', type: 'text', onChange: function (ev) { return setTitleState(ev.target.value); }, onBlur: function (ev) {
                        onChange(__assign(__assign({}, parameters), { title: ev.target.value }));
                    } }))),
        react_1.default.createElement("div", { className: classes.row },
            react_1.default.createElement("div", { className: "".concat(classes.entry, " ").concat(parameters.$ref ? 'disabled-input' : '') },
                react_1.default.createElement(TextField_1.default, { helperText: descriptionHelperText, label: descriptionLabel, value: descriptionState || '', placeholder: 'Description', type: 'text', onChange: function (ev) { return setDescriptionState(ev.target.value); }, onBlur: function (ev) {
                        onChange(__assign(__assign({}, parameters), { description: ev.target.value }));
                    } })),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(classes.entry, {
                    'wide-card-entry': !showObjectNameInput
                }) },
                react_1.default.createElement(FormControl_1.default, null,
                    react_1.default.createElement(InputLabel_1.default, { id: "inputtype-select-label" }, inputTypeLabel),
                    react_1.default.createElement(Select_1.default, { labelId: "inputtype-select-label", id: "inputtype-select", value: parameters.category, label: inputTypeLabel, placeholder: inputTypeLabel, onChange: function (e) {
                            // figure out the new 'type'
                            var newCategory = e.target.value;
                            var newProps = __assign(__assign(__assign({}, (0, utils_1.defaultUiProps)(newCategory, allFormInputs)), (0, utils_1.defaultDataProps)(newCategory, allFormInputs)), { name: parameters.name, required: parameters.required });
                            if (newProps.$ref !== undefined && !newProps.$ref) {
                                // assign an initial reference
                                var firstDefinition = Object.keys(parameters.definitionData)[0];
                                newProps.$ref = "#/definitions/".concat(firstDefinition || 'empty');
                            }
                            onChange(__assign(__assign({}, newProps), { title: newProps.title || parameters.title, default: newProps.default || '', type: newProps.type || (0, utils_1.categoryType)(newCategory, allFormInputs), category: newProps.category || newCategory }));
                        } }, availableInputTypes().map(function (_a) {
                        var value = _a.value, label = _a.label;
                        return (react_1.default.createElement(MenuItem_1.default, { key: value, value: value }, label));
                    })),
                    react_1.default.createElement(FormHelperText_1.default, null, inputTypeHelperText)))),
        react_1.default.createElement("div", { style: { padding: '.5em' } },
            react_1.default.createElement(GeneralParameterInputs_1.default, { category: parameters.category, parameters: parameters, onChange: onChange, mods: mods, allFormInputs: allFormInputs })));
}
exports.default = CardGeneralParameterInputs;
//# sourceMappingURL=CardGeneralParameterInputs.js.map