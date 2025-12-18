import React from "react";
import { FormInput, Mods } from "./types";
export default function Section({ name, required, schema, uischema, onChange, onNameChange, onRequireToggle, onDependentsChange, onDelete, onMoveUp, onMoveDown, path, definitionData, definitionUi, hideKey, reference, dependents, dependent, parent, neighborNames, addElem, cardOpen, setCardOpen, allFormInputs, mods, categoryHash }: {
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
}): React.JSX.Element;
