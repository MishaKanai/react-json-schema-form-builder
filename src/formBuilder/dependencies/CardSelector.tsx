import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import { getRandomId } from "../utils";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// a field that lets you choose adjacent blocks

export default function CardSelector({
  possibleChoices,
  chosenChoices,
  onChange,
  placeholder,
  path,
}: {
  possibleChoices: Array<string>;
  chosenChoices: Array<string>;
  onChange: (chosenChoices: Array<string>) => void;
  placeholder: string;
  path: string;
  label?: string;
}) {
  const [elementId] = useState(getRandomId());
  return <React.Fragment>
      <ul>
        {chosenChoices.map((chosenChoice, index) => <li key={`${elementId}_neighbor_${index}`}>
            {chosenChoice}{' '}
            <IconButton
              onClick={() => onChange([...chosenChoices.slice(0, index), ...chosenChoices.slice(index + 1)])} 
              size="small"
            >
              <Clear />
            </IconButton>
          </li>)}
      </ul>

      {/* variant="standard" pinned: v5's FormControl/Select default flipped to 'outlined'. */}
      <FormControl fullWidth variant="standard">
          <InputLabel shrink id={elementId + "-label"}>{placeholder}</InputLabel>
          <Select
            fullWidth
            labelId={elementId + "-label"}
            id={elementId}
            value={''}
            label={placeholder}
            onChange={(e: SelectChangeEvent<string>) => {
              onChange([...chosenChoices, e.target.value]);
            }}
          >
            {possibleChoices.filter(choice => !chosenChoices.includes(choice)).map(choice => 
              <MenuItem key={choice} value={choice}>{choice}</MenuItem>
            )}
          </Select>
        </FormControl>
    </React.Fragment>;
}