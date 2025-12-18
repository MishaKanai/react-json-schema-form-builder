import React from "react";
type Props = {
    label: React.ReactNode;
    value?: any;
    name?: string;
    checked?: boolean;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    onChange: (arg0: any) => void;
};
export default function FBRadioButton(props: Props): React.JSX.Element;
export {};
