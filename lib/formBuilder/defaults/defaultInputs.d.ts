import * as React from "react";
import { Parameters, FormInput } from "../types";
export declare function CardDefaultParameterInputs({ parameters, onChange }: {
    parameters: Parameters;
    onChange: (arg0: Parameters) => void;
}): React.JSX.Element;
declare const defaultInputs: Record<string, FormInput>;
export default defaultInputs;
