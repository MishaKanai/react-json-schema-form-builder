"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var FBRadioGroup_1 = __importDefault(require("./radio/FBRadioGroup"));
var utils_1 = require("./utils");
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var AddBoxRounded_1 = __importDefault(require("@material-ui/icons/AddBoxRounded"));
function Add(_a) {
    var addElem = _a.addElem, hidden = _a.hidden;
    var _b = (0, react_1.useState)(false), popoverOpen = _b[0], setPopoverOpen = _b[1];
    var _c = (0, react_1.useState)('card'), createChoice = _c[0], setCreateChoice = _c[1];
    var elementId = (0, react_1.useState)((0, utils_1.getRandomId)())[0];
    return react_1.default.createElement("div", { style: {
            display: hidden ? 'none' : 'initial'
        } },
        react_1.default.createElement(Tooltip_1.default, { placement: 'top', title: "Create new form element" },
            react_1.default.createElement(IconButton_1.default, { color: "primary", size: "small", onClick: function () { return setPopoverOpen(true); } },
                react_1.default.createElement(AddBoxRounded_1.default, null))),
        react_1.default.createElement(Dialog_1.default, { open: popoverOpen, onClose: function () { return setPopoverOpen(false); } },
            react_1.default.createElement(DialogTitle_1.default, null, "Create New"),
            react_1.default.createElement(DialogContent_1.default, { style: { minWidth: '280px' } },
                react_1.default.createElement(FBRadioGroup_1.default, { defaultValue: createChoice, horizontal: false, options: [{
                            value: 'card',
                            label: 'Form element'
                        }, {
                            value: 'section',
                            label: 'Form section'
                        }], onChange: function (selection) {
                        setCreateChoice(selection);
                    } })),
            react_1.default.createElement(DialogActions_1.default, { style: { display: 'flex', justifyContent: 'space-between' } },
                react_1.default.createElement(Button_1.default, { variant: "contained", onClick: function () { return setPopoverOpen(false); } }, "Cancel"),
                react_1.default.createElement(Button_1.default, { variant: "contained", onClick: function () {
                        addElem(createChoice);
                        setPopoverOpen(false);
                    }, color: 'primary' }, "Create"))));
}
exports.default = Add;
//# sourceMappingURL=Add.js.map