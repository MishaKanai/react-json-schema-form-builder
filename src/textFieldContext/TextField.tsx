import React, { useContext, useMemo } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import textFieldContext from './textFieldContext';

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  
function mergeDeep(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
            if (!(key in target))
            Object.assign(output, { [key]: source[key] });
            else
            output[key] = mergeDeep(target[key], source[key]);
        } else {
            Object.assign(output, { [key]: source[key] });
        }
        });
    }
    return output;
}

const TextField = (props: TextFieldProps) => {
    const extraProps = useContext(textFieldContext);
    const mergedProps = useMemo(() => {
        if (!extraProps) {
            return props;
        }
        return mergeDeep(props, extraProps)
    }, [extraProps, props])
    // 'standard' is what v4 rendered by default; v5's TextField default is 'outlined'. Callers
    // (props, or the textFieldContext bag) still decide — this only fills the unset case.
    const { variant = 'standard', ...rest } = mergedProps as TextFieldProps;
    return <MuiTextField variant={variant} {...rest} />
}

export default TextField;