import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FBCheckbox from "./checkbox/FBCheckbox";
import Collapse from "./Collapse/Collapse";
import CardModal from "./CardModal";
import { CardDefaultParameterInputs } from "./defaults/defaultInputs";
import FBTooltip from "./Tooltip";
import Add from "./Add";
import Card from "./Card";
import { checkForUnsupportedFeatures, generateElementComponentsFromSchemas, countElementsFromSchema, addCardObj, addSectionObj, onDragEnd } from "./utils";
import { getRandomId } from "./utils";
import { FormInput, Mods } from "./types";
import Tooltip from '@material-ui/core/Tooltip';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardInteractions: {
    margin: '.5em 1.5em',
    display: 'flex'
  }
});
export default function Section({
  name,
  required,
  schema,
  uischema,
  onChange,
  onNameChange,
  onRequireToggle,
  onDependentsChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  path,
  definitionData,
  definitionUi,
  hideKey,
  reference,
  dependents,
  dependent,
  parent,
  neighborNames,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  categoryHash
}: {
  name: string;
  required: boolean;
  schema: Record<string, any>;
  uischema: Record<string, any>;
  onChange: (schema: Record<string, any>, uischema: Record<string, any>, ref?: string) => void;
  onNameChange: (arg0: string) => void;
  onDependentsChange: (arg0: Array<{
    children: Array<string>;
    value?: any;
  }>) => void;
  onRequireToggle: () => any;
  onDelete: () => any;
  onMoveUp?: () => any;
  onMoveDown?: () => any;
  path: string;
  definitionData: Record<string, any>;
  definitionUi: Record<string, any>;
  hideKey?: boolean;
  reference?: string;
  dependents?: Array<{
    children: Array<string>;
    value?: any;
  }>;
  dependent?: boolean;
  parent?: string;
  neighborNames?: Array<string>;
  addElem?: (choice: string) => void;
  cardOpen: boolean;
  setCardOpen: (newState: boolean) => void;
  allFormInputs: Record<string, FormInput>;
  mods?: Mods;
  categoryHash: Record<string, string>;
}) {
  const classes = useStyles();
  const unsupportedFeatures = checkForUnsupportedFeatures(schema || {}, uischema || {}, allFormInputs);
  const schemaData = schema || {};
  const elementNum = countElementsFromSchema(schemaData);
  const defaultCollapseStates = [...Array(elementNum)].map(() => false);
  const [cardOpenArray, setCardOpenArray] = React.useState(defaultCollapseStates);
  // keep name in state to avoid losing focus
  const [keyName, setKeyName] = React.useState(name);
  const [keyError, setKeyError] = React.useState(null);
  // keep requirements in state to avoid rapid updates
  const [modalOpen, setModalOpen] = React.useState(false);
  const [elementId] = React.useState(getRandomId());
  const objectNameHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionObjectName === 'string' ? mods.tooltipDescriptions.cardSectionObjectName : 'The key to the object that will represent this form section.';
  const displayNameHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDisplayName === 'string' ? mods.tooltipDescriptions.cardSectionDisplayName : 'The name of the form section that will be shown to users of the form.';
  const sectionDescriptionHelperText = mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDescription === 'string' ? mods.tooltipDescriptions.cardSectionDescription : 'A description of the section which will be visible on the form.';
  return <React.Fragment>
    <Collapse isOpen={cardOpen} toggleCollapse={() => setCardOpen(!cardOpen)} title={<React.Fragment>
      <span>
        <Tooltip placement='top' title="Move form element up">
          <span>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onMoveUp?.();
              }}
            >
              <ArrowUpward />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip placement='top' title="Move form element down">
          <span>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onMoveDown?.();
              }}
            >
              <ArrowDownward />
            </IconButton>
          </span>
        </Tooltip>
      </span>
      <Divider orientation="vertical" flexItem />
      <span style={{ marginLeft: '.5em' }} onClick={() => setCardOpen(!cardOpen)}>
        <Typography variant="subtitle1" component="h4">
          {schemaData.title || keyName}{' '}
          {parent ? <FBTooltip text={`Depends on ${parent}`} type='alert' /> : ''}
        </Typography>
      </span>
    </React.Fragment>} className={`section-container ${/* classes.sectionContainer*/ ''} ${dependent ? 'section-dependent' : ''} ${reference ? 'section-reference' : ''}`}>
      <div /* className={`section-entries ${reference ? 'section-reference' : ''}`} */>
        <div>
          {reference ? <div className='section-entry section-reference'>
            <FormControl>
              <InputLabel shrink id={elementId + "-select-label"}>Reference Section</InputLabel>
              <Select
                labelId={elementId + "-select-label"}
                id={elementId + "-select"}
                value={reference}
                label="Reference Section"
                onChange={(e: React.ChangeEvent<{ name: string, value: string }>) => {
                  onChange(schema, uischema, e.target.value);
                }}
              >
                {Object.keys(definitionData).map(key => {
                  const value = `#/definitions/${key}`
                  return (
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div> : ''}
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '.5em' }} data-test='section-object-name'>
              <TextField
                label="Section Object Name"
                error={keyError !== null}
                value={keyName || ''}
                placeholder='Key'
                type='text'
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setKeyName((ev.target as any).value)}
                onBlur={(ev: React.FocusEvent<HTMLInputElement>) => {
                  const {
                    value
                  } = (ev.target as any);

                  if (value === name || !(neighborNames && neighborNames.includes(value))) {
                    setKeyError(null);
                    onNameChange(value);
                  } else {
                    setKeyName(name);
                    setKeyError(`"${value}" is already in use.`);
                    onNameChange(name);
                  }
                }}
                disabled={hideKey}
                helperText={keyError ?? objectNameHelperText}
              />
            </div>
            <div style={{ margin: '.5em' }} data-test='section-display-name'>
              <TextField
                label="Section Display Name"
                helperText={displayNameHelperText}
                value={schemaData.title || ''}
                placeholder='Title'
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange({
                  ...schema,
                  title: (ev.target as any).value
                }, uischema)}
              />
            </div>
            <div style={{ margin: '.5em' }} data-test='section-description'>
              <TextField
                label="Section Description"
                value={schemaData.description || ''}
                placeholder='Description'
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange({
                  ...schema,
                  description: (ev.target as any).value
                }, uischema)}
                helperText={sectionDescriptionHelperText}
              />
            </div>
            <Alert style={{
              display: unsupportedFeatures.length === 0 ? 'none' : 'block'
            }} severity="warning">
              <AlertTitle>Unsupported Features</AlertTitle>
              {unsupportedFeatures.map(message => <li key={`${elementId}_${message}`}>{message}</li>)}
            </Alert>
          </div>
        </div>
        <div className='section-body'>
          <DragDropContext onDragEnd={result => onDragEnd(result, {
            schema,
            uischema,
            onChange,
            definitionData,
            definitionUi,
            categoryHash
          })} className='section-body'>
            <Droppable droppableId='droppable'>
              {providedDroppable => <div ref={providedDroppable.innerRef} {...providedDroppable.droppableProps}>
                {generateElementComponentsFromSchemas({
                  schemaData: schema,
                  uiSchemaData: uischema,
                  onChange,
                  path,
                  definitionData,
                  definitionUi,
                  cardOpenArray,
                  setCardOpenArray,
                  allFormInputs,
                  mods,
                  categoryHash,
                  Card,
                  Section
                }).map((element: any, index) => <Draggable key={element.key} draggableId={element.key} index={index}>
                  {providedDraggable => <div ref={providedDraggable.innerRef} {...providedDraggable.draggableProps} {...providedDraggable.dragHandleProps}>
                    {element}
                  </div>}
                </Draggable>)}
                {providedDroppable.placeholder}
              </div>}
            </Droppable>
          </DragDropContext>
        </div>
        <div className='section-footer'>
          <Add addElem={(choice: string) => {
            if (choice === 'card') {
              addCardObj({
                schema,
                uischema,
                mods,
                onChange,
                definitionData,
                definitionUi,
                categoryHash
              });
            } else if (choice === 'section') {
              addSectionObj({
                schema,
                uischema,
                onChange,
                definitionData,
                definitionUi,
                categoryHash
              });
            }
          }} hidden={schemaData.properties && Object.keys(schemaData.properties).length !== 0} />
        </div>
        <div className={classes.cardInteractions}>
          <Tooltip placement="top" title="Additional configurations for this form element">
            <IconButton
              color="primary"
              onClick={() => setModalOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement='top' title="Delete form element">
            <IconButton
              onClick={onDelete}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FBCheckbox onChangeValue={() => onRequireToggle()} isChecked={required} label='Required' id={`${elementId}_required`} />
          </div>
        </div>
      </div>
      <CardModal componentProps={{
        dependents,
        neighborNames,
        name: keyName,
        schema,
        type: 'object',
        'ui:column': uischema['ui:column'] ?? ''
      }} isOpen={modalOpen} onClose={() => setModalOpen(false)} onChange={(newComponentProps: Record<string, any>) => {
        onDependentsChange(newComponentProps.dependents);
        onChange(schema, {
          ...uischema,
          'ui:column': newComponentProps['ui:column']
        });
      }} TypeSpecificParameters={CardDefaultParameterInputs} />
    </Collapse>
    {addElem ? <Add addElem={(choice: string) => addElem(choice)} /> : ''}
  </React.Fragment>;
}