import { FormInput, Parameters } from "../types";
import React from "react";
import { PlaceholderInput } from "../inputs/PlaceholderInput";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export function CardReferenceParameterInputs({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (arg0: Parameters) => void;
}) {
  return <div>
      <PlaceholderInput parameters={parameters} onChange={onChange} />
    </div>;
}

function RefChoice({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}) {
  const pathArr = (parameters.$ref || '').split('/');
  // const currentValueLabel = pathArr.length === 3 && pathArr[0] === '#' && pathArr[1] === 'definitions' && (parameters.definitionData || {})[pathArr[2]] ? parameters.definitionData[pathArr[2]].title || parameters.$ref : parameters.$ref;
  return <div className='card-select'>
      <FormControl>
        <InputLabel shrink id={"refchoice-select-label"}>Reference</InputLabel>
        <Select
          labelId={"refchoice-select-label"}
          id={"refchoice-select"}
          value={parameters.$ref}
          label="Reference"
          onChange={(e: React.ChangeEvent<{ name: string, value: string }>) => {
            onChange({ ...parameters,
              $ref: e.target.value
            });
          }}
        >
          {Object.keys(parameters.definitionData || {}).map(key => {
            const value = `#/definitions/${key}`;
            const label = parameters.definitionData[key].title || value;
            return <MenuItem key={value} value={value}>{label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>;
}

const referenceInputs: Record<string, FormInput> = {
  ref: {
    displayName: 'Reference',
    matchIf: [{
      types: ['null'],
      $ref: true
    }],
    defaultDataSchema: {
      $ref: '',
      title: '',
      description: ''
    },
    defaultUiSchema: {},
    type: 'string',
    cardBody: RefChoice,
    modalBody: CardReferenceParameterInputs
  }
};
export default referenceInputs;