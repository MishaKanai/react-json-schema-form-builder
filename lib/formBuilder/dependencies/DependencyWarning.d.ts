import React from "react";
export default function DependencyWarning({ parameters }: {
    parameters: {
        name?: string;
        dependents?: Array<{
            children: Array<string>;
            value?: any;
        }>;
        type?: string;
        enum?: Array<string | number>;
        neighborNames?: Array<string>;
        schema?: string;
        [key: string]: any;
    };
}): React.JSX.Element;
