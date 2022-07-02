import * as React from "react";
import CardGallery from "./CardGallery";
import { parse, stringify, propagateDefinitionChanges, generateCategoryHash, excludeKeys } from "./utils";
import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs";
import { Mods } from "./types";

export default function PredefinedGallery({
  schema,
  uischema,
  onChange,
  mods
}: {
  schema: string;
  uischema: string;
  onChange: (arg0: string, arg1: string) => any;
  mods?: Mods;
}) {
  const schemaData = React.useMemo(() => (parse(schema) as Record<string, any>) || {}, [schema]);
  const uiSchemaData = React.useMemo(() => (parse(uischema) as Record<string, any>) || {}, [uischema]);
  const allFormInputs = excludeKeys(Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
  const categoryHash = generateCategoryHash(allFormInputs);
  React.useEffect(() => {
    if (!uiSchemaData.definitions) {
      // eslint-disable-next-line no-console
      console.log('Parsing UI schema to assign UI for definitions');
      // need to create definitions from scratch
      const references = [];

      // recursively search for all $refs in the schemaData
      const findRefs = (name, schemaObject) => {
        if (!schemaObject) return;
        if (typeof schemaObject === 'object') Object.keys(schemaObject).forEach(key => {
          if (typeof key === 'string') {
            if (key === '$ref') references.push(name);
            findRefs(key, schemaObject[key]);
          }
        });
        if (Array.isArray(schemaObject)) schemaObject.forEach(innerObj => {
          findRefs(name, innerObj);
        });
      };

      findRefs('root', schemaData);
      uiSchemaData.definitions = {};
      const referenceSet = new Set(references);
      Object.keys(uiSchemaData).forEach(uiProp => {
        if (referenceSet.has(uiProp)) uiSchemaData.definitions[uiProp] = uiSchemaData[uiProp];
      });

      if (!Object.keys(uiSchemaData.definitions).length) {
        uiSchemaData.definitions = undefined;
      }

      onChange(stringify(schemaData), stringify(uiSchemaData));
    }
  }, [uiSchemaData, schemaData]);
  return <div>
      <CardGallery definitionSchema={schemaData.definitions || {}} definitionUiSchema={uiSchemaData.definitions || {}} onChange={(newDefinitions: Record<string, any>, newDefinitionsUi: Record<string, any>) => {
      // propagate changes in ui definitions to all relavant parties in main schema
      propagateDefinitionChanges({ ...schemaData,
        definitions: newDefinitions
      }, { ...uiSchemaData,
        definitions: newDefinitionsUi
      }, (newSchema, newUiSchema) => onChange(stringify(newSchema), stringify(newUiSchema)), categoryHash);
    }} mods={mods} categoryHash={categoryHash} />
    </div>;
}