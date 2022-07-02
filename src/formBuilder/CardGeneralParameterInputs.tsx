import React from "react";
import TextField from '@material-ui/core/TextField';
import classnames from "classnames";
import GeneralParameterInputs from "./GeneralParameterInputs";
import { defaultUiProps, defaultDataProps, categoryToNameMap, categoryType, subtractArray, getRandomId } from "./utils";
import { Parameters, Mods, FormInput } from "./types";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex'
  },
  entry: {
     margin: 0,
    width: '50%',
    'text-align': 'left',
    padding: '0.5em',
  }
}))

export default function CardGeneralParameterInputs({
  parameters,
  onChange,
  allFormInputs,
  mods,
  showObjectNameInput = true
}: {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
  mods?: Mods;
  allFormInputs: Record<string, FormInput>;
  showObjectNameInput?: boolean;
}) {
  const classes = useStyles();
  const [keyState, setKeyState] = React.useState(parameters.name);
  const [keyError, setKeyError] = React.useState(null);
  const [titleState, setTitleState] = React.useState(parameters.title);
  const [descriptionState, setDescriptionState] = React.useState(parameters.description);
  const [elementId] = React.useState(getRandomId());
  const categoryMap = categoryToNameMap(parameters.category, allFormInputs);

  const fetchLabel = (labelName: string, defaultLabel: string): string => {
    return mods && mods.labels && typeof mods.labels[labelName] === 'string' ? mods.labels[labelName] : defaultLabel;
  };

  const objectNameLabel = fetchLabel('objectNameLabel', 'Object Name');
  const displayNameLabel = fetchLabel('displayNameLabel', 'Display Name');
  const descriptionLabel = fetchLabel('descriptionLabel', 'Description');
  const inputTypeLabel = fetchLabel('inputTypeLabel', 'Input Type');

  const availableInputTypes = () => {
    const definitionsInSchema = parameters.definitionData && Object.keys(parameters.definitionData).length !== 0;
    // Hide the "Reference" option if there are no definitions in the schema
    let inputKeys = Object.keys(categoryMap).filter(key => key !== 'ref' || definitionsInSchema);
    // Exclude hidden inputs based on mods
    if (mods) inputKeys = subtractArray(inputKeys, mods.deactivatedFormInputs);
    return inputKeys.map(key => ({
      value: key,
      label: categoryMap[key]
    })).sort((a, b) => a.label.localeCompare(b.label));
  };
  const objectNameHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardObjectName === 'string' ? mods.tooltipDescriptions.cardObjectName : 'The back-end name of the object';
  const displayNameHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDisplayName === 'string' ? mods.tooltipDescriptions.cardDisplayName : 'The user-facing name of this object';
  const descriptionHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDescription === 'string' ? mods.tooltipDescriptions.cardDescription : 'This will appear as help text on the form';
  const inputTypeHelperText = mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardInputType === 'string' ? mods.tooltipDescriptions.cardInputType : 'The type of form input displayed on the form';
  return <React.Fragment>
    <div className={classes.row}>
      {showObjectNameInput && <div className={classes.entry}>
        <TextField
          helperText={keyError ?? objectNameHelperText}
          label={objectNameLabel}
          error={keyError !== null}
          value={keyState || ''}
          placeholder='Key'
          type='text'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setKeyState((ev.target as any).value)}
          onBlur={(ev: React.FocusEvent<HTMLInputElement>) => {
            const {
              value
            } = (ev.target as any);

            if (value === parameters.name || !(parameters.neighborNames && parameters.neighborNames.includes(value))) {
              setKeyError(null);
              onChange({
                ...parameters,
                name: value
              });
            } else {
              setKeyState(parameters.name);
              setKeyError(`"${value}" is already in use.`);
              onChange({
                ...parameters
              });
            }
          }}
        />
      </div>}
      <div className={`${classes.entry} ${parameters.$ref === undefined ? '' : 'disabled-input'}`}>
        <TextField
          helperText={displayNameHelperText}
          label={displayNameLabel}
          value={titleState || ''}
          placeholder='Title'
          type='text'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTitleState((ev.target as any).value)}
          onBlur={(ev: React.FocusEvent<HTMLInputElement>) => {
            onChange({
              ...parameters,
              title: (ev.target as any).value
            });
          }}
        />
      </div>
    </div>
    <div className={classes.row}>
      <div className={`${classes.entry} ${parameters.$ref ? 'disabled-input' : ''}`}>
        <TextField
          helperText={descriptionHelperText}
          label={descriptionLabel}
          value={descriptionState || ''}
          placeholder='Description'
          type='text'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setDescriptionState((ev.target as any).value)}
          onBlur={(ev: React.FocusEvent<HTMLInputElement>) => {
            onChange({
              ...parameters,
              description: (ev.target as any).value
            });
          }}
        />
      </div>
      <div className={classnames(classes.entry, {
        'wide-card-entry': !showObjectNameInput
      })}>
        <FormControl>
          <InputLabel id="inputtype-select-label">{inputTypeLabel}</InputLabel>
          <Select
            labelId="inputtype-select-label"
            id="inputtype-select"
            value={parameters.category}
            label={inputTypeLabel}
            placeholder={inputTypeLabel}
            onChange={(e) => {
              // figure out the new 'type'
              const newCategory = e.target.value as string;
              const newProps: any = {
                ...defaultUiProps(newCategory, allFormInputs),
                ...defaultDataProps(newCategory, allFormInputs),
                name: parameters.name,
                required: parameters.required
              };
    
              if (newProps.$ref !== undefined && !newProps.$ref) {
                // assign an initial reference
                const firstDefinition = Object.keys(parameters.definitionData)[0];
                newProps.$ref = `#/definitions/${firstDefinition || 'empty'}`;
              }
    
              onChange({
                ...newProps,
                title: newProps.title || parameters.title,
                default: newProps.default || '',
                type: newProps.type || categoryType(newCategory, allFormInputs),
                category: newProps.category || newCategory
              });
            }}
          >
            {availableInputTypes().map(({ value, label }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{inputTypeHelperText}</FormHelperText>
        </FormControl>
      </div>
    </div>

    <div style={{ padding: '.5em' }}>
      <GeneralParameterInputs category={parameters.category} parameters={parameters} onChange={onChange} mods={mods} allFormInputs={allFormInputs} />
    </div>
  </React.Fragment>;
}