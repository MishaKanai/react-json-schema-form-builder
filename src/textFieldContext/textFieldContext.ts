import { createContext } from "react";
import { TextFieldProps } from '@material-ui/core/TextField';

const textFieldContext = createContext<Partial<TextFieldProps>>(undefined);
export default textFieldContext;