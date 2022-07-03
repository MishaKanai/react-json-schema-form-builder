import * as React from "react";
import DependencyField from "./dependencies/DependencyField";
import { Parameters } from "./types";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '../textFieldContext/TextField';
import includeValidationsContext from "../includeValidationsContext/includeValidationsContext";

export default function CardModal({
  componentProps,
  onChange,
  isOpen,
  onClose,
  TypeSpecificParameters
}: {
  componentProps: Record<string, any>;
  onChange: (arg0: any) => void;
  isOpen: boolean;
  onClose: () => void;
  TypeSpecificParameters: React.FunctionComponent<{
    parameters: Parameters;
    onChange: (newParams: Parameters) => void;
  }>;
}) {
  // assign state values for parameters that should only change on hitting "Save"
  const [componentPropsState, setComponentProps] = React.useState<any>(componentProps);
  React.useEffect(() => {
    setComponentProps(componentProps);
  }, [componentProps]);
  const includeValidations = React.useContext(includeValidationsContext);
  return <Dialog open={isOpen} data-test='card-modal'>
    <DialogTitle>
      <div style={{
          display: componentProps.hideKey ? 'none' : 'initial'
        }}>
          <h3>Additional Settings</h3>
        </div>
    </DialogTitle>

    <DialogContent>
      {includeValidations && <TypeSpecificParameters parameters={componentPropsState} onChange={(newState: any) => {
        setComponentProps({
          ...componentPropsState,
          ...newState
        });
      }} />}
      <div>
        <TextField
          label="Column Size"
          helperText={<a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout' target='_blank' rel='noopener noreferrer'>
            Set the column size of the input
          </a>}
           value={componentPropsState['ui:column'] ? componentPropsState['ui:column'] : ''}
           placeholder='Column size'
           key='ui:column'
           type='number'
           inputProps={{ min: 0 }}
           onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
           setComponentProps({
             ...componentPropsState,
             'ui:column': (ev.target as any).value
           });
          }}
        />
      </div>
      <DependencyField parameters={(componentPropsState as Record<string, any>)} onChange={(newState: any) => {
        setComponentProps({
          ...componentPropsState,
          ...newState
        });
      }} />
    </DialogContent>
    <DialogActions style={{ display: 'flex', justifyContent: 'space-between'}}>      
      <Button
        variant="contained"
        onClick={() => {
          onClose();
          setComponentProps(componentProps);
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          onClose();
          onChange(componentPropsState);
        }}
        color='primary'
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>;
}