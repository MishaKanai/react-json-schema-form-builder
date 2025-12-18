import React from "react";
type Props = {
    options: Array<{
        label: React.ReactNode;
        value: string | number;
    }>;
    defaultValue?: any;
    horizontal?: boolean;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    onChange: (arg0: any) => void;
};
export default function FBRadioGroup(props: Props): React.JSX.Element;
export {};
