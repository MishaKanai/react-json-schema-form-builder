import * as React from "react";
import { Mods } from "./types";
export default function PredefinedGallery({ schema, uischema, onChange, mods }: {
    schema: string;
    uischema: string;
    onChange: (arg0: string, arg1: string) => any;
    mods?: Mods;
}): React.JSX.Element;
