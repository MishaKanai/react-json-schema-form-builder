import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getRandomId } from "../utils.js";
export default function Collapse(props) {
    var id = React.useMemo(getRandomId, []);
    return (React.createElement(Accordion, { disabled: props.disableToggle, expanded: props.isOpen, onChange: props.disableToggle ? undefined : props.toggleCollapse },
        React.createElement(AccordionSummary
        /* v6 changed AccordionSummary's root from `div role="button"` to a real `<button>`.
           The `title` we render into it carries IconButtons (move up/down), so the v7 default
           would nest buttons inside a button: invalid DOM, and React warns about it.
           `component="div"` restores the v4/v5 element and its role/tabIndex/keyboard handling. */
        , { 
            /* v6 changed AccordionSummary's root from `div role="button"` to a real `<button>`.
               The `title` we render into it carries IconButtons (move up/down), so the v7 default
               would nest buttons inside a button: invalid DOM, and React warns about it.
               `component="div"` restores the v4/v5 element and its role/tabIndex/keyboard handling. */
            component: "div", style: { paddingLeft: '.5em' }, expandIcon: React.createElement(ExpandMoreIcon, null), "aria-controls": id + "-content", id: id + "-header" }, props.title),
        React.createElement(AccordionDetails, null,
            React.createElement("div", { style: { width: '100%' } }, props.children))));
}
//# sourceMappingURL=Collapse.js.map