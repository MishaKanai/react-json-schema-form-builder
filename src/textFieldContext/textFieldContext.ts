import { createContext } from "react";
import { TextFieldProps } from '@mui/material/TextField';

const textFieldContext = createContext<Partial<TextFieldProps>>(undefined);
export default textFieldContext;