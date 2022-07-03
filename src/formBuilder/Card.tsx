import * as React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import FBCheckbox from "./checkbox/FBCheckbox";
import Collapse from "./Collapse/Collapse";
import CardModal from "./CardModal";
import CardGeneralParameterInputs from "./CardGeneralParameterInputs";
import Add from "./Add";
import FBTooltip from "./Tooltip";
import { getRandomId } from "./utils";
import { Parameters, Mods, FormInput } from "./types";
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import includeValidationsContext from "../includeValidationsContext/includeValidationsContext";

const useStyles = makeStyles({
  cardInteractions: {
    margin: '.5em 1.5em',
    display: 'flex',
  }
});
export default function Card({
  componentProps,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  TypeSpecificParameters,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  showObjectNameInput = true
}: {
  componentProps: {
    path: string;
    [key: string]: string | number | boolean | Array<string | number>;
  };
  onChange: (arg0: Record<string, any>) => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  TypeSpecificParameters: React.FunctionComponent<{
    parameters: Parameters;
    onChange: (newParams: Parameters) => void;
  }>;
  addElem?: (choice: string) => void;
  cardOpen: boolean;
  setCardOpen: (newState: boolean) => void;
  mods?: Mods;
  allFormInputs: Record<string, FormInput>;
  showObjectNameInput?: boolean;
}) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const elementId = React.useMemo(getRandomId, []);
  const includeValidations = React.useContext(includeValidationsContext);
  return <React.Fragment>
    <Collapse isOpen={cardOpen} toggleCollapse={() => setCardOpen(!cardOpen)} title={<React.Fragment>
      <span>
        <Tooltip placement='top' title="Move form element up">
          <span>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onMoveUp?.();
              }}
            >
              <ArrowUpward />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip placement='top' title="Move form element down">
          <span>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onMoveDown?.();
              }}
            >
              <ArrowDownward />
            </IconButton>
          </span>
        </Tooltip>
      </span>
      <Divider orientation="vertical" flexItem />
      <span style={{ marginLeft: '.5em' }} onClick={() => setCardOpen(!cardOpen)}>
        <Typography variant="subtitle1" component="h4">{componentProps.title || componentProps.name}{' '}</Typography>
        {componentProps.parent ? <FBTooltip text={`Depends on ${(componentProps.parent as any)}`} type='alert' /> : ''}
        {componentProps.$ref !== undefined ? <FBTooltip text={`Is an instance of pre-configured component ${(componentProps.$ref as any)}`} type='alert' /> : ''}
      </span>
    </React.Fragment>} className={`card-container ${componentProps.dependent ? 'card-dependent' : ''} ${componentProps.$ref === undefined ? '' : 'card-reference'}`}>
      <div /* className={classes.cardEntries}*/ style={{
        borderBottom: '1px solid gray',
        margin: '.5em 1.5em 0 1.5em',
      }}>
        <CardGeneralParameterInputs parameters={(componentProps as any)} onChange={onChange} allFormInputs={allFormInputs} mods={mods} showObjectNameInput={showObjectNameInput} />
      </div>
      <div className={classes.cardInteractions}>
        <Tooltip placement="top" title="Additional configurations for this form element">
          <IconButton
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip placement='top' title="Delete form element">
          <IconButton
            onClick={onDelete}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {includeValidations && <FBCheckbox onChangeValue={() => onChange({
            ...componentProps,
            required: !componentProps.required
          })} isChecked={!!componentProps.required} label='Required' id={`${elementId}_required`} />}
        </div>
      </div>
      <CardModal componentProps={componentProps} isOpen={modalOpen} onClose={() => setModalOpen(false)} onChange={(newComponentProps: Record<string, string | number | boolean | Array<string | number>>) => {
        onChange(newComponentProps);
      }} TypeSpecificParameters={TypeSpecificParameters} />
    </Collapse>
    {addElem ? <Add addElem={(choice: string) => addElem(choice)} /> : ''}
  </React.Fragment>;
}