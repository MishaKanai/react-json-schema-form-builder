// @flow

import React, { useState } from 'react';
import { Parameters } from '../types';
import { getRandomId } from '../utils';
import TextField from '@material-ui/core/TextField';

export function PlaceholderInput({
  parameters,
  onChange,
}: {
  parameters: Parameters,
  onChange: (Parameters) => void,
}) {
  const [elementId] = useState(getRandomId());
  return (
    <TextField
      label="Placeholder"
      value={parameters['ui:placeholder']}
      placeholder='Placeholder'
      key='placeholder'
      type='text'
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          ...parameters,
          'ui:placeholder': ev.target.value,
        });
      }}
      helperText={<a
        href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder'
        target='_blank'
        rel='noopener noreferrer'
      >
        Hint to the user as to what kind of information is expected in the field
      </a>}
    />
  )
}
