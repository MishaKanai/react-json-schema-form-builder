import { FormInput, Parameters } from "../types";
import React from "react";
export declare function CardReferenceParameterInputs({ parameters, onChange }: {
    parameters: Parameters;
    onChange: (arg0: Parameters) => void;
}): React.JSX.Element;
declare const referenceInputs: Record<string, FormInput>;
export default referenceInputs;
