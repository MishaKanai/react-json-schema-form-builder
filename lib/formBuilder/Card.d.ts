import * as React from "react";
import { Parameters, Mods, FormInput } from "./types";
export default function Card({ componentProps, onChange, onDelete, onMoveUp, onMoveDown, TypeSpecificParameters, addElem, cardOpen, setCardOpen, allFormInputs, mods, showObjectNameInput }: {
    componentProps: {
        path: string;
        [key: string]: string | number | boolean | Array<string | number>;
    };
    onChange: (arg0: Record<string, any>) => void;
    onDelete?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    TypeSpecificParameters: React.FunctionComponent<{
        parameters: Parameters;
        onChange: (newParams: Parameters) => void;
    }>;
    addElem?: (choice: string) => void;
    cardOpen: boolean;
    setCardOpen: (newState: boolean) => void;
    mods?: Mods;
    allFormInputs: Record<string, FormInput>;
    showObjectNameInput?: boolean;
}): React.JSX.Element;
