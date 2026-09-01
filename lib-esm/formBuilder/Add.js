import React, { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import FBRadioGroup from "./radio/FBRadioGroup.js";
import { getRandomId } from "./utils.js";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddBoxRounded';
export default function Add(_a) {
    var addElem = _a.addElem, hidden = _a.hidden;
    var _b = useState(false), popoverOpen = _b[0], setPopoverOpen = _b[1];
    var _c = useState('card'), createChoice = _c[0], setCreateChoice = _c[1];
    var elementId = useState(getRandomId())[0];
    return React.createElement("div", { style: {
            display: hidden ? 'none' : 'initial'
        } },
        React.createElement(Tooltip, { disableInteractive: true, placement: 'top', title: "Create new form element" },
            React.createElement(IconButton, { color: "primary", size: "small", onClick: function () { return setPopoverOpen(true); } },
                React.createElement(AddIcon, null))),
        React.createElement(Dialog, { open: popoverOpen, onClose: function () { return setPopoverOpen(false); } },
            React.createElement(DialogTitle, null, "Create New"),
            React.createElement(DialogContent, { style: { minWidth: '280px' } },
                React.createElement(FBRadioGroup, { defaultValue: createChoice, horizontal: false, options: [{
                            value: 'card',
                            label: 'Form element'
                        }, {
                            value: 'section',
                            label: 'Form section'
                        }], onChange: function (selection) {
                        setCreateChoice(selection);
                    } })),
            React.createElement(DialogActions, { style: { display: 'flex', justifyContent: 'space-between' } },
                React.createElement(Button, { variant: "contained", color: "inherit", onClick: function () { return setPopoverOpen(false); } }, "Cancel"),
                React.createElement(Button, { variant: "contained", onClick: function () {
                        addElem(createChoice);
                        setPopoverOpen(false);
                    }, color: 'primary' }, "Create"))));
}
//# sourceMappingURL=Add.js.map