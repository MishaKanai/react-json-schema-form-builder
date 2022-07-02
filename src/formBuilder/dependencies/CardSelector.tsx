import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import { getRandomId } from "../utils";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

      <FormControl fullWidth>
          <InputLabel shrink id={elementId + "-label"}>{placeholder}</InputLabel>
          <Select
            fullWidth
            labelId={elementId + "-label"}
            id={elementId}
            value={''}
            label={placeholder}
            onChange={(e: React.ChangeEvent<{ value: string, name: string }>) => {
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