import React from "react";
export default function ValueSelector({ possibility, onChange, parentEnums, parentType, parentName, parentSchema, path }: {
    possibility: {
        children: Array<string>;
        value: any;
    };
    onChange: (newPossibility: {
        children: Array<string>;
        value?: any;
    }) => void;
    parentEnums?: Array<string | number>;
    parentType?: string;
    parentName?: string;
    parentSchema?: any;
    path: string;
}): React.JSX.Element;
