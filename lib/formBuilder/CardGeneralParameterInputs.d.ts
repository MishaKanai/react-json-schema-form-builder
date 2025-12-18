import React from "react";
import { Parameters, Mods, FormInput } from "./types";
export default function CardGeneralParameterInputs({ parameters, onChange, allFormInputs, mods, showObjectNameInput }: {
    parameters: Parameters;
    onChange: (newParams: Parameters) => void;
    mods?: Mods;
    allFormInputs: Record<string, FormInput>;
    showObjectNameInput?: boolean;
}): React.JSX.Element;
