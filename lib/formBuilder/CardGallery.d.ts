import React from "react";
import { Mods } from "./types";
export default function CardGallery({ definitionSchema, definitionUiSchema, onChange, mods, categoryHash }: {
    definitionSchema: Record<string, any>;
    definitionUiSchema: Record<string, any>;
    onChange: (arg0: Record<string, any>, arg1: Record<string, any>) => void;
    mods?: Mods;
    categoryHash: Record<string, string>;
}): React.JSX.Element;
