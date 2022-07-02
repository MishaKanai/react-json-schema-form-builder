import React, { useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import FBRadioGroup from "./radio/FBRadioGroup";
import { getRandomId } from "./utils";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddBoxRounded';

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
    <Tooltip placement='top' title="Create new form element">
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
        <Button variant="contained" onClick={() => setPopoverOpen(false)}>
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