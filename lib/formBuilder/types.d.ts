/// <reference types="react" />
export type Node = any;
export type CardProps = {
    name: string;
    required: boolean;
    dataOptions: Record<string, any>;
    uiOptions: Record<string, any>;
    $ref?: string;
    dependents?: Array<{
        children: Array<string>;
        value?: any;
    }>;
    dependent?: boolean;
    parent?: string;
    propType: string;
    neighborNames: Array<string>;
};
export type SectionProps = {
    name: string;
    required: boolean;
    schema: Record<string, any>;
    uischema: Record<string, any>;
    $ref?: string;
    dependents?: Array<{
        children: Array<string>;
        value?: any;
    }>;
    dependent?: boolean;
    propType: string;
    neighborNames: Array<string>;
};
export type ElementProps = CardProps & SectionProps;
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
type FormInputType<ModsType> = {
    displayName: string;
    matchIf: Array<MatchType>;
    possibleOptions?: Array<string>;
    defaultDataSchema: Record<string, any>;
    defaultUiSchema: Record<string, any>;
    type: DataType;
    cardBody: CardBodyType<ModsType>;
    modalBody?: ModalBody;
};
export type DataOptions = {
    title: string;
    type?: string;
    description?: string;
    $ref?: string;
    default?: string;
};
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
export {};
