import React, { useState } from "react";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FBCheckbox from "../checkbox/FBCheckbox";
import { getRandomId } from "../utils";
import { Parameters, FormInput } from "../types";
import { PlaceholderInput } from "../inputs/PlaceholderInput";
import TextField from '../../textFieldContext/TextField';

const formatDictionary = {
  '': 'None',
  email: 'Email',
  hostname: 'Hostname',
  uri: 'URI',
  regex: 'Regular Expression'
};
const formatTypeDictionary = {
  email: 'email',
  url: 'uri'
};
const autoDictionary = {
  '': 'None',
  email: 'Email',
  username: 'User Name',
  password: 'Password',
  'street-address': 'Street Address',
  country: 'Country'
};

// specify the inputs required for a string type object
function CardShortAnswerParameterInputs({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}) {
  console.log({
    parameters
  })
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
          onChange({
            ...parameters,
            minLength: parseInt((ev.target as any).value, 10)
          });
        }}
      />
    </div>
    <div style={{ marginTop: '1em' }}>
      <TextField
        label="Maximum Length"
        value={parameters.maxLength ? parameters.maxLength : ''}
        placeholder='Maximum Length'
        key='maxLength'
        type='number'
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            maxLength: parseInt((ev.target as any).value, 10)
          });
        }}
      />
    </div>
    <div style={{ marginTop: '1em' }}>
      <TextField
        label="RegExp Pattern"
        value={parameters.pattern ? parameters.pattern : ''}
        placeholder='Regular Expression Pattern'
        key='pattern'
        type='text'
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            pattern: (ev.target as any).value
          });
        }}
        helperText={<a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions' target='_blank' rel='noopener noreferrer'>
          Regular expression pattern that this must satisfy
        </a>}
      />
    </div>
    <div style={{ marginTop: '1em' }}>
      <FormControl>
        <InputLabel shrink id="format-select-label">Format</InputLabel>
        <Select
          labelId="format-select-label"
          id="format-select"
          value={parameters.format ?? ''}
          label="Format"
          placeholder='Format'
          onChange={(e) => {
            onChange({
              ...parameters,
              format: e.target.value
            });
          }}
        >
          {Object.entries(formatDictionary).map(([value, label]) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Require string input to match a certain common format</FormHelperText>
      </FormControl>
    </div>
    <div style={{ marginTop: '1em' }}>
      <FormControl>
        <InputLabel shrink id="auto-select-label">Auto Complete Category</InputLabel>
        <Select
          labelId="auto-select-label"
          id="auto-select"
          value={parameters['ui:autocomplete'] ?? ''}
          label="Auto Complete Category"
          placeholder='Auto Complete Category'
          onChange={(e) => {
            console.log(e)
            onChange({
              ...parameters,
              'ui:autocomplete': e.target.value
            });
          }}
        >
          {Object.entries(autoDictionary).map(([value, label]) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </Select>
        <FormHelperText><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete' target='_blank' rel='noopener noreferrer'>
          Suggest entries based on the user's browser history</a></FormHelperText>
      </FormControl>
    </div>
    <PlaceholderInput parameters={parameters} onChange={onChange} />

    {/* <div style={{ marginTop: '1em' }}>
      <TextField
        label="Column Size"
        value={parameters['ui:column'] ? parameters['ui:column'] : ''}
        placeholder='Column size'
        key='ui:column'
        type='number'
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            'ui:column': (ev.target as any).value
          });
        }}
        helperText={<a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout' target='_blank' rel='noopener noreferrer'>Set the column size of the input</a>}
      />
    </div> */}
    <div className='card-modal-boolean'>
      <FBCheckbox onChangeValue={() => {
        onChange({
          ...parameters,
          'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true
        });
      }} isChecked={parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false} label='Auto Focus' />
    </div>
  </div>;
}

function ShortAnswerField({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}) {
  return (
    <TextField
      label="Default Value"
      value={parameters.default}
      placeholder='Default'
      type={formatTypeDictionary[parameters.format] || 'text'}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange({
        ...parameters,
        default: (ev.target as any).value
      })}
    />
  )
}

function Password({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}) {
  return (
    <TextField
      label="Default Password"
      value={parameters.default}
      placeholder='Default'
      type='password'
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange({
        ...parameters,
        default: (ev.target as any).value
      })} 
    />
  )
}

const shortAnswerInput: Record<string, FormInput> = {
  shortAnswer: {
    displayName: 'Short Answer',
    matchIf: [{
      types: ['string']
    }, ...['email', 'hostname', 'uri', 'regex'].map(format => ({
      types: ['string' as const],
      format
    }))],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'string',
    cardBody: ShortAnswerField,
    modalBody: CardShortAnswerParameterInputs
  },
  password: {
    displayName: 'Password',
    matchIf: [{
      types: ['string'],
      widget: 'password'
    }],
    defaultDataSchema: {},
    defaultUiSchema: {
      'ui:widget': 'password'
    },
    type: 'string',
    cardBody: Password,
    modalBody: CardShortAnswerParameterInputs
  }
};
export default shortAnswerInput;