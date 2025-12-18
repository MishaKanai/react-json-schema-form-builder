import * as React from "react";
import { Parameters, Mods, FormInput } from "./types";
export default function GeneralParameterInputs({ category, parameters, onChange, mods, allFormInputs }: {
    category: string;
    parameters: Parameters;
    onChange: (newParams: Parameters) => void;
    mods?: Mods;
    allFormInputs: Record<string, FormInput>;
}): React.JSX.Element;
