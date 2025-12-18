import * as React from "react";
import { CardBody, CardProps, ElementProps, FormInput, Mods, ModalBody, DataOptions, DataType } from "./types";
export declare function parse(text: string): any;
export declare function stringify(obj: any): string;
export declare function defaultDataProps(category: string, allFormInputs: Record<string, FormInput>): Record<string, any>;
export declare function defaultUiProps(category: string, allFormInputs: Record<string, FormInput>): Record<string, any>;
export declare function categoryType(category: string, allFormInputs: Record<string, FormInput>): DataType;
export declare function getCardBody(category: string, allFormInputs: Record<string, FormInput>): CardBody;
export declare function categoryToNameMap(category: string, allFormInputs: Record<string, FormInput>): Record<string, string>;
export declare function generateCategoryHash(allFormInputs: Record<string, FormInput>): Record<string, string>;
export declare function getCardCategory(cardProps: CardProps, categoryHash: Record<string, string>): string;
export declare function checkForUnsupportedFeatures(schema: Record<string, any>, uischema: Record<string, any>, allFormInputs: Record<string, FormInput>): string[];
export declare function generateElementPropsFromSchemas(parameters: {
    schema: Record<string, any>;
    uischema: Record<string, any>;
    definitionData?: Record<string, any>;
    definitionUi?: Record<string, any>;
    categoryHash: Record<string, string>;
}): Array<ElementProps>;
export declare function countElementsFromSchema(schemaData: any): number;
export declare function generateSchemaFromElementProps(elementArr: Array<ElementProps>): {
    definitions?: Record<string, any>;
    [key: string]: any;
};
export declare function generateUiSchemaFromElementProps(elementArr: Array<ElementProps>, definitionUi: any): {
    definitions?: Record<string, any>;
    [key: string]: any;
};
export declare function getCardParameterInputComponentForType(category: string, allFormInputs: Record<string, FormInput>): ModalBody;
export declare function updateSchemas(elementArr: Array<ElementProps>, parameters: {
    schema: {
        definitions?: Record<string, any>;
        [key: string]: any;
    };
    uischema: {
        definitions?: Record<string, any>;
        [key: string]: any;
    };
    onChange: (arg0: Record<string, any>, arg1: Record<string, any>) => any;
    definitionData?: Record<string, any>;
    definitionUi?: Record<string, any>;
}): void;
export declare const DEFAULT_INPUT_NAME = "newInput";
export declare function addCardObj(parameters: {
    schema: Record<string, any>;
    uischema: Record<string, any>;
    mods?: Mods;
    onChange: (arg0: Record<string, any>, arg1: Record<string, any>) => any;
    definitionData: Record<string, any>;
    definitionUi: Record<string, any>;
    index?: number;
    categoryHash: Record<string, string>;
}): void;
export declare function addSectionObj(parameters: {
    schema: Record<string, any>;
    uischema: Record<string, any>;
    onChange: (arg0: Record<string, any>, arg1: Record<string, any>) => any;
    definitionData: Record<string, any>;
    definitionUi: Record<string, any>;
    index?: number;
    categoryHash: Record<string, string>;
}): void;
export declare function generateElementComponentsFromSchemas(parameters: {
    schemaData: Record<string, any>;
    uiSchemaData: Record<string, any>;
    onChange: (arg0: Record<string, any>, arg1: Record<string, any>) => any;
    definitionData?: Record<string, any>;
    definitionUi?: Record<string, any>;
    hideKey?: boolean;
    path: string;
    cardOpenArray: Array<boolean>;
    setCardOpenArray: (newArr: Array<boolean>) => void;
    allFormInputs: Record<string, FormInput>;
    mods?: Mods;
    categoryHash: Record<string, string>;
    Card: React.FunctionComponent<Record<string, any>>;
    Section: React.FunctionComponent<Record<string, any>>;
}): JSX.Element[];
export declare function onDragEnd(result: any, details: {
    schema: Record<string, any>;
    uischema: Record<string, any>;
    onChange: (arg0: Record<string, any>, arg1: Record<string, any>) => any;
    definitionData?: Record<string, any>;
    definitionUi?: Record<string, any>;
    categoryHash: Record<string, string>;
}): void;
export declare function propagateDefinitionChanges(schema: Record<string, any>, uischema: Record<string, any>, onChange: (arg0: Record<string, any>, arg1: Record<string, any>) => void, categoryHash: Record<string, string>): void;
export declare function subtractArray(array1: Array<string>, array2?: Array<string>): Array<string>;
export declare function excludeKeys(obj: Record<string, any>, keys: string[] | null | undefined): Record<string, any>;
export declare function getNewElementDefaultDataOptions(i: number, mods?: Mods): DataOptions;
export declare function getRandomId(): string;
