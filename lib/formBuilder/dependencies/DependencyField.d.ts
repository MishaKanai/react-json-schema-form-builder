import React from "react";
type DependencyParams = {
    name?: string;
    dependents?: Array<{
        children: Array<string>;
        value?: any;
    }>;
    type?: string;
    enum?: Array<string | number>;
    neighborNames?: Array<string>;
    schema?: any;
    [key: string]: any;
};
export default function DependencyField({ parameters, onChange }: {
    parameters: DependencyParams;
    onChange: (newParams: DependencyParams) => void;
}): React.JSX.Element;
export {};
