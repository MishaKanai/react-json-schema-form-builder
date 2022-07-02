import React, { useContext, useMemo } from 'react';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
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
    return <MuiTextField {...mergedProps} />
}

export default TextField;