import React, { useState } from "react";
import FBCheckbox from "../checkbox/FBCheckbox";
import Tooltip from "../Tooltip";
import { getRandomId } from "../utils";
import { Parameters, FormInput } from "../types";
import { PlaceholderInput } from "../inputs/PlaceholderInput";
import TextField from '@material-ui/core/TextField';

// specify the inputs required for a string type object
function CardLongAnswerParameterInputs({
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
        label="Minimum Length"
        value={parameters.minLength ? parameters.minLength : ''}
        placeholder='Minimum Length'
        key='minLength'
        type='number'
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          onChange({ ...parameters,
            minLength: parseInt((ev.target as any).value, 10)
          });
        }} 
      />
      </div>
      <div style={{ marginTop: '1em '}}>
      <TextField
        label="Maximum Length"
        value={parameters.maxLength ? parameters.maxLength : ''}
        placeholder='Maximum Length'
        key='maxLength'
        type='number'
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          onChange({ ...parameters,
            maxLength: parseInt((ev.target as any).value, 10)
          });
        }} 
      />
      </div>
      <div style={{ marginTop: '1em '}}>
        <TextField
          label={<>RegExp Pattern{' '}
          <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'>
            <Tooltip type='help' text='Regular expression pattern that this must satisfy' />
          </a></>}
           value={parameters.pattern ? parameters.pattern : ''}
           placeholder='Regular Expression Pattern'
           key='pattern'
           type='text'
           onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            onChange({ ...parameters,
              pattern: (ev.target as any).value
            });
          }} 
        />
      </div>
      <PlaceholderInput parameters={parameters} onChange={onChange} />
      <div className='card-modal-boolean'>
        <FBCheckbox onChangeValue={() => {
        onChange({ ...parameters,
          'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true
        });
      }} isChecked={parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false} label='Auto Focus' />
      </div>
    </div>;
}

function LongAnswer({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}) {
  return (
    <TextField
      label="Default value"
      multiline
      value={parameters.default}
      placeholder='Default'
      type='textarea'
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange({ ...parameters,
        default: (ev.target as any).value
      })}
    />
  )
}

const longAnswerInput: Record<string, FormInput> = {
  longAnswer: {
    displayName: 'Long Answer',
    matchIf: [{
      types: ['string'],
      widget: 'textarea'
    }],
    defaultDataSchema: {},
    defaultUiSchema: {
      'ui:widget': 'textarea'
    },
    type: 'string',
    cardBody: LongAnswer,
    modalBody: CardLongAnswerParameterInputs
  }
};
export default longAnswerInput;