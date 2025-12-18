import * as React from "react";
export default function CardEnumOptions({ initialValues, names, showNames, onChange, type }: {
    initialValues: Array<any>;
    names?: Array<string>;
    showNames: boolean;
    onChange: (newEnums: Array<any>, newEnumNames?: Array<string>) => void;
    type: string;
}): React.JSX.Element;
