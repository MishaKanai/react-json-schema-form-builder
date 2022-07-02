import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import Section from "./Section";
import Add from "./Add";
import { arrows as arrowsStyle } from "./styles";
import { parse, stringify, checkForUnsupportedFeatures, generateElementComponentsFromSchemas, addCardObj, addSectionObj, onDragEnd, countElementsFromSchema, generateCategoryHash, excludeKeys } from "./utils";
import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs";
import { Mods } from "./types";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import TextField from '../textFieldContext/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formBuilder: {
    'text-align': 'center',
    ...arrowsStyle,
  },
  formHead: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '10px auto',
    'background-color': '#EBEBEB',
    border: '1px solid #858F96',
    'border-radius': '4px',
    width: '90%',
    padding: '20px',
  },
  formBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  formFooter: {
    marginTop: '1em',
    textAlign: 'center',
  }
});
export default function FormBuilder({
  schema,
  uischema,
  onChange,
  mods,
  className
}: {
  schema: string;
  uischema: string;
  onChange: (arg0: string, arg1: string) => any;
  mods?: Mods;
  className?: string;
}) {
  const classes = useStyles();
  const schemaData = (parse(schema) as Record<string, any>) || {};
  schemaData.type = 'object';
  const uiSchemaData = (parse(uischema) as Record<string, any>) || {};
  const allFormInputs = excludeKeys(Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
  const unsupportedFeatures = checkForUnsupportedFeatures(schemaData, uiSchemaData, allFormInputs);
  const elementNum = countElementsFromSchema(schemaData);
  const defaultCollapseStates = [...Array(elementNum)].map(() => false);
  const [cardOpenArray, setCardOpenArray] = React.useState(defaultCollapseStates);
  const categoryHash = generateCategoryHash(allFormInputs);

  return <div className={`${classes.formBuilder} ${className || ''}`}>
    <Alert style={{
      display: unsupportedFeatures.length === 0 ? 'none' : 'block'
    }} severity="warning">
      <AlertTitle>Unsupported Features</AlertTitle>
      {unsupportedFeatures.map((message, index) => <li key={index}>{message}</li>)}
    </Alert>
    {(!mods || mods.showFormHead !== false) && <div className={classes.formHead} data-test='form-head'>
      <div style={{ margin: '0em .5em' }}>
        <TextField
          label={mods && mods.labels && typeof mods.labels.formNameLabel === 'string' ? mods.labels.formNameLabel : 'Form Name'}
          value={schemaData.title || ''}
          placeholder='Title'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            onChange(stringify({
              ...schemaData,
              title: (ev.target as any).value
            }), uischema);
          }}
        />
      </div>
      <div style={{ margin: '0em .5em' }}>
        <TextField
          label={mods && mods.labels && typeof mods.labels.formDescriptionLabel === 'string' ? mods.labels.formDescriptionLabel : 'Form Description'}
          value={schemaData.description || ''}
          placeholder='Description'
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange(stringify({
            ...schemaData,
            description: (ev.target as any).value
          }), uischema)}
        />
      </div>
    </div>}
    <div className={classes.formBody}>
      <DragDropContext onDragEnd={result => onDragEnd(result, {
        schema: schemaData,
        uischema: uiSchemaData,
        onChange: (newSchema, newUiSchema) => onChange(stringify(newSchema), stringify(newUiSchema)),
        definitionData: schemaData.definitions,
        definitionUi: uiSchemaData.definitions,
        categoryHash
      })}>
        <Droppable droppableId='droppable'>
          {providedDroppable => <div ref={providedDroppable.innerRef} {...providedDroppable.droppableProps}>
            {generateElementComponentsFromSchemas({
              schemaData,
              uiSchemaData,
              onChange: (newSchema, newUiSchema) => onChange(stringify(newSchema), stringify(newUiSchema)),
              definitionData: schemaData.definitions,
              definitionUi: uiSchemaData.definitions,
              path: 'root',
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
    <div className={classes.formFooter}>
      <Add addElem={(choice: string) => {
        if (choice === 'card') {
          addCardObj({
            schema: schemaData,
            uischema: uiSchemaData,
            mods: mods,
            onChange: (newSchema, newUiSchema) => onChange(stringify(newSchema), stringify(newUiSchema)),
            definitionData: schemaData.definitions,
            definitionUi: uiSchemaData.definitions,
            categoryHash
          });
        } else if (choice === 'section') {
          addSectionObj({
            schema: schemaData,
            uischema: uiSchemaData,
            onChange: (newSchema, newUiSchema) => onChange(stringify(newSchema), stringify(newUiSchema)),
            definitionData: schemaData.definitions,
            definitionUi: uiSchemaData.definitions,
            categoryHash
          });
        }
      }} hidden={schemaData.properties && Object.keys(schemaData.properties).length !== 0} />
    </div>
  </div>;
}