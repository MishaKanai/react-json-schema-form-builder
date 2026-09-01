import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getRandomId } from "../utils";

type Props = {
  // Determines if the Collapse component is open
  isOpen: boolean;
  // Toggles the isOpen boolean between true and false
  toggleCollapse: () => void;
  // The title to display in the collapse header
  title: React.ReactNode;
  // Anything to be rendered within the collapse
  children: any;
  // If true will gray out and disable */
  disableToggle?: boolean;
  className?: string;
};
export default function Collapse(props: Props) {
  const id = React.useMemo(getRandomId, []);
  return (
    <Accordion disabled={props.disableToggle} expanded={props.isOpen} onChange={props.disableToggle ? undefined : props.toggleCollapse}>
        <AccordionSummary
          /* v6 changed AccordionSummary's root from `div role="button"` to a real `<button>`.
             The `title` we render into it carries IconButtons (move up/down), so the v7 default
             would nest buttons inside a button: invalid DOM, and React warns about it.
             `component="div"` restores the v4/v5 element and its role/tabIndex/keyboard handling. */
          component="div"
          style={{ paddingLeft: '.5em' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id + "-content"}
          id={id + "-header"}
        >
          {props.title}
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>{props.children}</div>
        </AccordionDetails>
      </Accordion>
  )
}