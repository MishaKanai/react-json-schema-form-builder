import React from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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