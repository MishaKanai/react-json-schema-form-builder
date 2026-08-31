import React, { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import FBRadioGroup from "./radio/FBRadioGroup";
import { getRandomId } from "./utils";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddBoxRounded';

export default function Add({
  addElem,
  hidden
}: {
  addElem: (choice: string) => void;
  hidden?: boolean;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [createChoice, setCreateChoice] = useState('card');
  const [elementId] = useState(getRandomId());
  return <div style={{
    display: hidden ? 'none' : 'initial'
  }}>
    <Tooltip disableInteractive placement='top' title="Create new form element">
      <IconButton
        color="primary"
        size="small"
        onClick={() => setPopoverOpen(true)} 
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
    <Dialog open={popoverOpen} onClose={() => setPopoverOpen(false)}>
      <DialogTitle>
        Create New
      </DialogTitle>
      <DialogContent style={{ minWidth: '280px'}}>
        <FBRadioGroup defaultValue={createChoice} horizontal={false} options={[{
          value: 'card',
          label: 'Form element'
        }, {
          value: 'section',
          label: 'Form section'
        }]} onChange={selection => {
          setCreateChoice(selection);
        }} />
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between'}}>
        {/* color="inherit" keeps v4's neutral grey contained button: v5's default color is
            'primary', where v4's was 'default'. */}
        <Button variant="contained" color="inherit" onClick={() => setPopoverOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => {
          addElem(createChoice);
          setPopoverOpen(false);
        }} color='primary'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  </div>;
}