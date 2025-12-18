import React from "react";
type Props = {
    onChangeValue: (...args: Array<any>) => any;
    isChecked: boolean;
    id?: string;
    label?: string;
    use?: string;
    value?: string;
    disabled?: boolean;
    dataTest?: string;
    labelClassName?: string;
};
export default function FBCheckbox({ onChangeValue, value, isChecked, label, use, disabled, id, dataTest, labelClassName }: Props): React.JSX.Element;
export {};
