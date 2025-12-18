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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var Card_1 = __importDefault(require("./Card"));
var Section_1 = __importDefault(require("./Section"));
var Add_1 = __importDefault(require("./Add"));
var styles_1 = require("./styles");
var utils_1 = require("./utils");
var defaultFormInputs_1 = __importDefault(require("./defaults/defaultFormInputs"));
var Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
var AlertTitle_1 = __importDefault(require("@material-ui/lab/AlertTitle"));
var TextField_1 = __importDefault(require("../textFieldContext/TextField"));
var styles_2 = require("@material-ui/core/styles");
var useStyles = (0, styles_2.makeStyles)({
    formBuilder: __assign({ 'text-align': 'center' }, styles_1.arrows),
    formHead: {
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '10px auto',
        'background-color': '#EBEBEB',
        border: '1px solid #858F96',
        'border-radius': '4px',
        width: '90%',
        padding: '20px',
    },
    formBody: {
        display: 'flex',
        flexDirection: 'column',
    },
    formFooter: {
        marginTop: '1em',
        textAlign: 'center',
    }
});
function FormBuilder(_a) {
    var schema = _a.schema, uischema = _a.uischema, onChange = _a.onChange, mods = _a.mods, className = _a.className;
    var classes = useStyles();
    var schemaData = (0, utils_1.parse)(schema) || {};
    schemaData.type = 'object';
    var uiSchemaData = (0, utils_1.parse)(uischema) || {};
    var allFormInputs = (0, utils_1.excludeKeys)(Object.assign({}, defaultFormInputs_1.default, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
    var unsupportedFeatures = (0, utils_1.checkForUnsupportedFeatures)(schemaData, uiSchemaData, allFormInputs);
    var elementNum = (0, utils_1.countElementsFromSchema)(schemaData);
    var defaultCollapseStates = __spreadArray([], Array(elementNum), true).map(function () { return false; });
    var _b = React.useState(defaultCollapseStates), cardOpenArray = _b[0], setCardOpenArray = _b[1];
    var categoryHash = (0, utils_1.generateCategoryHash)(allFormInputs);
    return React.createElement("div", { className: "".concat(classes.formBuilder, " ").concat(className || '') },
        React.createElement(Alert_1.default, { style: {
                display: unsupportedFeatures.length === 0 ? 'none' : 'block'
            }, severity: "warning" },
            React.createElement(AlertTitle_1.default, null, "Unsupported Features"),
            unsupportedFeatures.map(function (message, index) { return React.createElement("li", { key: index }, message); })),
        (!mods || mods.showFormHead !== false) && React.createElement("div", { className: classes.formHead, "data-test": 'form-head' },
            React.createElement("div", { style: { margin: '0em .5em' } },
                React.createElement(TextField_1.default, { label: mods && mods.labels && typeof mods.labels.formNameLabel === 'string' ? mods.labels.formNameLabel : 'Form Name', value: schemaData.title || '', placeholder: 'Title', onChange: function (ev) {
                        onChange((0, utils_1.stringify)(__assign(__assign({}, schemaData), { title: ev.target.value })), uischema);
                    } })),
            React.createElement("div", { style: { margin: '0em .5em' } },
                React.createElement(TextField_1.default, { label: mods && mods.labels && typeof mods.labels.formDescriptionLabel === 'string' ? mods.labels.formDescriptionLabel : 'Form Description', value: schemaData.description || '', placeholder: 'Description', onChange: function (ev) { return onChange((0, utils_1.stringify)(__assign(__assign({}, schemaData), { description: ev.target.value })), uischema); } }))),
        React.createElement("div", { className: classes.formBody },
            React.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: function (result) { return (0, utils_1.onDragEnd)(result, {
                    schema: schemaData,
                    uischema: uiSchemaData,
                    onChange: function (newSchema, newUiSchema) { return onChange((0, utils_1.stringify)(newSchema), (0, utils_1.stringify)(newUiSchema)); },
                    definitionData: schemaData.definitions,
                    definitionUi: uiSchemaData.definitions,
                    categoryHash: categoryHash
                }); } },
                React.createElement(react_beautiful_dnd_1.Droppable, { droppableId: 'droppable' }, function (providedDroppable) { return React.createElement("div", __assign({ ref: providedDroppable.innerRef }, providedDroppable.droppableProps),
                    (0, utils_1.generateElementComponentsFromSchemas)({
                        schemaData: schemaData,
                        uiSchemaData: uiSchemaData,
                        onChange: function (newSchema, newUiSchema) { return onChange((0, utils_1.stringify)(newSchema), (0, utils_1.stringify)(newUiSchema)); },
                        definitionData: schemaData.definitions,
                        definitionUi: uiSchemaData.definitions,
                        path: 'root',
                        cardOpenArray: cardOpenArray,
                        setCardOpenArray: setCardOpenArray,
                        allFormInputs: allFormInputs,
                        mods: mods,
                        categoryHash: categoryHash,
                        Card: Card_1.default,
                        Section: Section_1.default
                    }).map(function (element, index) { return React.createElement(react_beautiful_dnd_1.Draggable, { key: element.key, draggableId: element.key, index: index }, function (providedDraggable) { return React.createElement("div", __assign({ ref: providedDraggable.innerRef }, providedDraggable.draggableProps, providedDraggable.dragHandleProps), element); }); }),
                    providedDroppable.placeholder); }))),
        React.createElement("div", { className: classes.formFooter },
            React.createElement(Add_1.default, { addElem: function (choice) {
                    if (choice === 'card') {
                        (0, utils_1.addCardObj)({
                            schema: schemaData,
                            uischema: uiSchemaData,
                            mods: mods,
                            onChange: function (newSchema, newUiSchema) { return onChange((0, utils_1.stringify)(newSchema), (0, utils_1.stringify)(newUiSchema)); },
                            definitionData: schemaData.definitions,
                            definitionUi: uiSchemaData.definitions,
                            categoryHash: categoryHash
                        });
                    }
                    else if (choice === 'section') {
                        (0, utils_1.addSectionObj)({
                            schema: schemaData,
                            uischema: uiSchemaData,
                            onChange: function (newSchema, newUiSchema) { return onChange((0, utils_1.stringify)(newSchema), (0, utils_1.stringify)(newUiSchema)); },
                            definitionData: schemaData.definitions,
                            definitionUi: uiSchemaData.definitions,
                            categoryHash: categoryHash
                        });
                    }
                }, hidden: schemaData.properties && Object.keys(schemaData.properties).length !== 0 })));
}
exports.default = FormBuilder;
//# sourceMappingURL=FormBuilder.js.map