export type Node = any;
// any non object type is a card
export type CardProps = {
  name: string;
  required: boolean;
  dataOptions: Record<string, any>;
  uiOptions: Record<string, any>;
  // only defined if a reference
  $ref?: string;
  // only defined if a dependency parent
  dependents?: Array<{
    children: Array<string>;
    value?: any;
  }>;
  // true if dependent on another card
  dependent?: boolean;
  parent?: string;
  // either 'section' or 'card'
  propType: string;
  neighborNames: Array<string>;
};
// object type elements are sections
export type SectionProps = {
  name: string;
  required: boolean;
  schema: Record<string, any>;
  uischema: Record<string, any>;
  // only defined if a reference
  $ref?: string;
  // only defined if a dependency parent
  dependents?: Array<{
    children: Array<string>;
    value?: any;
  }>;
  // true if dependent on another card
  dependent?: boolean;
  // either 'section' or 'card'
  propType: string;
  neighborNames: Array<string>;
};
// the most generic form element
export type ElementProps = CardProps & SectionProps;
// parameters passed between card instances
export type Parameters = {
  name: string;
  path: string;
  definitionData: Record<string, any>;
  definitionUi: Record<string, any>;
  category: string;
  'ui:options': Record<string, any>;
  [key: string]: any;
};
export type DataType = "string" | "number" | "boolean" | "integer" | "array" | "object" | "null";
type MatchType = {
  types: Array<DataType>;
  widget?: string;
  field?: string;
  format?: string;
  $ref?: boolean;
  enum?: boolean;
};
type CardBodyProps<ModsType> = {
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
  mods: ModsType;
};
type CardBodyType<ModsType> = React.FunctionComponent<CardBodyProps<ModsType>>;
export type ModalBody = React.FunctionComponent<{
  parameters: Parameters;
  onChange: (newParams: Parameters) => void;
}>;
// an abstract input type
type FormInputType<ModsType> = {
  displayName: string;
  // given a data and ui schema, determine if the object is of this input type
  matchIf: Array<MatchType>;
  // allowed keys for ui:options
  possibleOptions?: Array<string>;
  defaultDataSchema: Record<string, any>;
  defaultUiSchema: Record<string, any>;
  // the data schema type
  type: DataType;
  // inputs on the preview card
  cardBody: CardBodyType<ModsType>;
  // inputs for the modal
  modalBody?: ModalBody;
};
export type DataOptions = {
  title: string;
  type?: string;
  description?: string;
  $ref?: string;
  default?: string;
};
// optional properties that can add custom features to the form builder
export type Mods = {
  customFormInputs?: Record<string, FormInputType<Mods>>;
  tooltipDescriptions?: {
    add?: string;
    cardObjectName?: string;
    cardDisplayName?: string;
    cardDescription?: string;
    cardInputType?: string;
    cardSectionObjectName?: string;
    cardSectionDisplayName?: string;
    cardSectionDescription?: string;
  };
  labels?: {
    formNameLabel?: string;
    formDescriptionLabel?: string;
    objectNameLabel?: string;
    displayNameLabel?: string;
    descriptionLabel?: string;
    inputTypeLabel?: string;
  };
  showFormHead?: boolean;
  deactivatedFormInputs?: Array<string>;
  newElementDefaultDataOptions?: DataOptions;
  newElementDefaultUiSchema?: Record<string, any>;
};
export type CardBody = CardBodyType<Mods>;
export type FormInput = FormInputType<Mods>;