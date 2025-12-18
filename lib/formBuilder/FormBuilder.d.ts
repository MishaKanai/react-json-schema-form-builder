import * as React from "react";
import { Mods } from "./types";
export default function FormBuilder({ schema, uischema, onChange, mods, className }: {
    schema: string;
    uischema: string;
    onChange: (arg0: string, arg1: string) => any;
    mods?: Mods;
    className?: string;
}): React.JSX.Element;
