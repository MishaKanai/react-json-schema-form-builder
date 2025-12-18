import * as React from "react";
import { Parameters } from "./types";
export default function CardModal({ componentProps, onChange, isOpen, onClose, TypeSpecificParameters }: {
    componentProps: Record<string, any>;
    onChange: (arg0: any) => void;
    isOpen: boolean;
    onClose: () => void;
    TypeSpecificParameters: React.FunctionComponent<{
        parameters: Parameters;
        onChange: (newParams: Parameters) => void;
    }>;
}): React.JSX.Element;
