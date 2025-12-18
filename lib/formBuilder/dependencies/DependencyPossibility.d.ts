import React from "react";
export default function DependencyPossibility({ possibility, neighborNames, path, onChange, onDelete, parentEnums, parentType, parentName, parentSchema }: {
    possibility: {
        children: Array<string>;
        value?: any;
    };
    neighborNames: Array<string>;
    path: string;
    onChange: (newPossibility: {
        children: Array<string>;
        value?: any;
    }) => void;
    onDelete: () => void;
    parentEnums?: Array<string | number>;
    parentType?: string;
    parentName?: string;
    parentSchema?: any;
}): React.JSX.Element;
