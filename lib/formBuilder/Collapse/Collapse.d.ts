import React from "react";
type Props = {
    isOpen: boolean;
    toggleCollapse: () => void;
    title: React.ReactNode;
    children: any;
    disableToggle?: boolean;
    className?: string;
};
export default function Collapse(props: Props): React.JSX.Element;
export {};
