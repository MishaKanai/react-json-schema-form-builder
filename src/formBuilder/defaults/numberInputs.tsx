import React, { useState } from "react";
import FBCheckbox from "../checkbox/FBCheckbox";
import { getRandomId } from "../utils";
import { Parameters, FormInput } from "../types";
import TextField from '@material-ui/core/TextField';

// specify the inputs required for a number type object
function CardNumberParameterInputs({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}) {
  const [elementId] = useState(getRandomId());
  return <div>
      <div>
        <TextField
          label="Multiple of"
          helperText="Require number to be a multiple of this number"
          value={parameters.multipleOf ? parameters.multipleOf : ''}
          placeholder='ex: 2'
          key='multipleOf'
          type='number'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            let newVal = parseFloat((ev.target as any).value);
            if (Number.isNaN(newVal)) newVal = null;
            onChange({ ...parameters,
              multipleOf: newVal
            });
          }} 
        />
      </div>
      <div style={{ marginTop: '1em'}}>
        <TextField
          label="Minimum"
          value={parameters.minimum || parameters.exclusiveMinimum || ''}
          placeholder='ex: 3'
          key='minimum'
          type='number'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            let newVal = parseFloat((ev.target as any).value);
            if (Number.isNaN(newVal)) newVal = null;
      
            // change either min or exclusiveMin depending on which one is active
            if (parameters.exclusiveMinimum) {
              onChange({ ...parameters,
                exclusiveMinimum: newVal,
                minimum: null
              });
            } else {
              onChange({ ...parameters,
                minimum: newVal,
                exclusiveMinimum: null
              });
            }
          }} 
        />
      </div>
      <div className='card-modal-boolean'>
        <FBCheckbox key='exclusiveMinimum' onChangeValue={() => {
        const newMin = parameters.minimum || parameters.exclusiveMinimum;

        if (parameters.exclusiveMinimum) {
          onChange({ ...parameters,
            exclusiveMinimum: null,
            minimum: newMin
          });
        } else {
          onChange({ ...parameters,
            exclusiveMinimum: newMin,
            minimum: null
          });
        }
      }} isChecked={!!parameters.exclusiveMinimum} disabled={!parameters.minimum && !parameters.exclusiveMinimum} label='Exclusive Minimum' />
      </div>
      <div style={{ marginTop: '1em'}}>
        <TextField
          label="Maximum"
          value={parameters.maximum || parameters.exclusiveMaximum || ''}
          placeholder='ex: 8'
          key='maximum'
          type='number'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            let newVal = parseFloat((ev.target as any).value);
            if (Number.isNaN(newVal)) newVal = null;
      
            // change either max or exclusiveMax depending on which one is active
            if (parameters.exclusiveMinimum) {
              onChange({ ...parameters,
                exclusiveMaximum: newVal,
                maximum: null
              });
            } else {
              onChange({ ...parameters,
                maximum: newVal,
                exclusiveMaximum: null
              });
            }
          }}
        />
      </div>
      <div className='card-modal-boolean'>
        <FBCheckbox key='exclusiveMaximum' onChangeValue={() => {
        const newMax = parameters.maximum || parameters.exclusiveMaximum;

        if (parameters.exclusiveMaximum) {
          onChange({ ...parameters,
            exclusiveMaximum: null,
            maximum: newMax
          });
        } else {
          onChange({ ...parameters,
            exclusiveMaximum: newMax,
            maximum: null
          });
        }
      }} isChecked={!!parameters.exclusiveMaximum} disabled={!parameters.maximum && !parameters.exclusiveMaximum} label='Exclusive Maximum' />
      </div>
    </div>;
}

function NumberField({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}) {
  return (
    <TextField
      label="Default Number"
      type="number"
      value={parameters.default}
      placeholder='Default'
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange({ ...parameters,
        default: parseFloat((ev.target as any).value)
      })}
    />
  )
}

const numberInputs: Record<string, FormInput> = {
  integer: {
    displayName: 'Integer',
    matchIf: [{
      types: ['integer']
    }, {
      types: ['integer'],
      widget: 'number'
    }],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'integer',
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs
  },
  number: {
    displayName: 'Number',
    matchIf: [{
      types: ['number']
    }],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'number',
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs
  }
};
export default numberInputs;