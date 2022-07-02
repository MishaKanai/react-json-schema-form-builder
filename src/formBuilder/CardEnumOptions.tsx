import * as React from "react";
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

export default function CardEnumOptions({
  initialValues,
  names,
  showNames,
  onChange,
  type
}: {
  initialValues: Array<any>;
  names?: Array<string>;
  showNames: boolean;
  onChange: (newEnums: Array<any>, newEnumNames?: Array<string>) => void;
  type: string;
}) {
  const possibleValues = [];

  for (let index = 0; index < initialValues.length; index += 1) {
    const value = initialValues[index];
    let name = `${value}`;
    if (names && index < names.length) name = names[index];
    possibleValues.push(<div key={index} style={{ display: 'flex' }}>
      <div style={{ margin: '.5em' }}>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Possible Value"
          value={value === undefined || value === null ? '' : value}
          key={`val-${index}`}
          type={type === 'string' ? 'text' : 'number'}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            let newVal;

            switch (type) {
              case 'string':
                newVal = ev.target.value;
                break;
              case 'number':
              case 'integer':
                newVal = parseFloat(ev.target.value);
                if (Number.isInteger(newVal)) newVal = parseInt(ev.target.value, 10);
                if (Number.isNaN(newVal)) newVal = (type as any) === 'string' ? '' : 0;
                break;

              default:
                throw new Error(`Enum called with unknown type ${type}`);
            }

            onChange([...initialValues.slice(0, index), newVal, ...initialValues.slice(index + 1)], names);
          }}
        />
      </div>
      <div style={{ margin: '.5em' }}>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Label"
          value={name || ''}
          key={`name-${index}`}
          type='text'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            if (names) onChange(initialValues, [...names.slice(0, index), ev.target.value, ...names.slice(index + 1)]);
          }}
          style={{
            display: showNames ? undefined : 'none'
          }}
        />
      </div>
      <div style={{ margin: 'auto 0' }}>
        <div style={{ verticalAlign: 'middle' }}>
          <IconButton
            size="small"
            onClick={() => {
              // remove this value
              onChange([...initialValues.slice(0, index), ...initialValues.slice(index + 1)], names ? [...names.slice(0, index), ...names.slice(index + 1)] : undefined);
            }}
          >
            <Clear />
          </IconButton>
        </div>
      </div>
    </div>);
  }

  return <div>
    {possibleValues}
    <div style={{ textAlign: 'center' }}>
      <IconButton
        size="small"
        onClick={() => {
          // add a new dropdown option
          onChange([...initialValues, type === 'string' ? '' : 0], names ? [...names, ''] : undefined);
        }}>
        <Add />
      </IconButton>
    </div>
  </div>;
}