import React, { useState } from "react";
import { excludeKeys, generateElementComponentsFromSchemas, generateCategoryHash } from "../utils";
import Card from "../Card";
import Section from "../Section";
import FBCheckbox from "../checkbox/FBCheckbox";
import shortAnswerInputs from "./shortAnswerInputs";
import longAnswerInputs from "./longAnswerInputs";
import numberInputs from "./numberInputs";
import defaultInputs from "./defaultInputs";
import { getRandomId } from "../utils";
import { CardBody, Parameters, Mods, FormInput } from "../types";
import TextField from '../../textFieldContext/TextField';

// specify the inputs required for a string type object
function CardArrayParameterInputs({
  parameters,
  onChange
}: {
  parameters: Parameters;
  onChange: (arg0: Record<string, any>) => void;
}) {
  return <div>
      <TextField
        label="Minimum Items"
        value={parameters.minItems || ''}
        placeholder='ex: 2'
        key='minimum'
        type='number'
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          onChange({ ...parameters,
            minItems: parseInt((ev.target as any).value, 10)
          });
        }} 
      />
      <TextField
        label="Maximum Items"
        value={parameters.maxItems || ''}
        placeholder='ex: 2'
        key='maximum'
        type='number'
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          onChange({ ...parameters,
            maxItems: parseInt((ev.target as any).value, 10)
          });
        }} 
      />
    </div>;
}

function getInnerCardComponent({
  defaultFormInputs
}: {
  defaultFormInputs: Record<string, FormInput>;
}): CardBody {
  return function InnerCard({
    parameters,
    onChange,
    mods
  }: {
    parameters: Parameters;
    onChange: (newParams: Parameters) => void;
    mods?: Mods;
  }) {
    const [elementId] = useState(getRandomId);
    const newDataProps: any = {};
    const newUiProps: any = {};
    const allFormInputs = excludeKeys(Object.assign({}, defaultFormInputs, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
    // parse components into data and ui relevant pieces
    Object.keys(parameters).forEach(propName => {
      if (propName.startsWith('ui:*')) {
        newUiProps[propName.substring(4)] = parameters[propName];
      } else if (propName.startsWith('ui:')) {
        newUiProps[propName] = parameters[propName];
      } else if (!['name', 'required'].includes(propName)) {
        newDataProps[propName] = parameters[propName];
      }
    });
    const definitionData = parameters.definitionData ? parameters.definitionData : {};
    const definitionUi = parameters.definitionUi ? parameters.definitionUi : {};
    const [cardOpen, setCardOpen] = React.useState(false);

    if (parameters.type !== 'array') {
      return <h4>Not an array </h4>;
    }

    return <div className='card-array'>
        <FBCheckbox onChangeValue={() => {
        if (newDataProps.items.type === 'object') {
          onChange({ ...parameters,
            items: { ...newDataProps.items,
              type: 'string'
            }
          });
        } else {
          onChange({ ...parameters,
            items: { ...newDataProps.items,
              type: 'object'
            }
          });
        }
      }} isChecked={newDataProps.items.type === 'object'} label='Section' id={`${elementId}_issection`} />
        {generateElementComponentsFromSchemas({
        schemaData: {
          properties: {
            item: newDataProps.items
          }
        },
        uiSchemaData: {
          item: newUiProps.items
        },
        onChange: (schema, uischema) => {
          onChange({ ...parameters,
            items: schema.properties.item,
            'ui:*items': uischema.item || {}
          });
        },
        path: elementId,
        definitionData,
        definitionUi,
        hideKey: true,
        cardOpenArray: [cardOpen],
        setCardOpenArray: newArr => setCardOpen(newArr[0]),
        allFormInputs,
        mods,
        categoryHash: generateCategoryHash(allFormInputs),
        Card: (props: any) => <Card {...props} showObjectNameInput={false} />,
        Section
      })}
      </div>;
  };
}

const defaultFormInputs = ({ ...defaultInputs,
  ...shortAnswerInputs,
  ...longAnswerInputs,
  ...numberInputs
} as Record<string, FormInput>);
defaultFormInputs.array = {
  displayName: 'Array',
  matchIf: [{
    types: ['array']
  }],
  defaultDataSchema: {
    items: {
      type: 'string'
    }
  },
  defaultUiSchema: {},
  type: 'array',
  cardBody: getInnerCardComponent({
    defaultFormInputs
  }),
  modalBody: CardArrayParameterInputs
};
const ArrayInputs: Record<string, FormInput> = {
  array: {
    displayName: 'Array',
    matchIf: [{
      types: ['array']
    }],
    defaultDataSchema: {
      items: {
        type: 'string'
      }
    },
    defaultUiSchema: {},
    type: 'array',
    cardBody: getInnerCardComponent({
      defaultFormInputs
    }),
    modalBody: CardArrayParameterInputs
  }
};
export default ArrayInputs;