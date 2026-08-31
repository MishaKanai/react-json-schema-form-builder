/**
 * Pins the v4 -> v5 render deltas this library had to compensate for. Each assertion here is a
 * v5 default that would silently change the rendered form if a future edit dropped the pin:
 * TextField/Select/FormControl default variant (standard -> outlined), Button default color
 * (default -> primary), and Tooltip's interactive default (off -> on).
 */
import React from "react";
import { mount } from "enzyme";
import FormBuilder from "./FormBuilder";
import CardModal from "./CardModal";
import CardSelector from "./dependencies/CardSelector";

const schema = JSON.stringify({
  title: 'T',
  description: 'D',
  type: 'object',
  properties: {
    a: { title: 'A', type: 'string' },
    b: { title: 'B', type: 'string', enum: ['x', 'y'] },
  },
});
const uischema = JSON.stringify({ 'ui:order': ['a', 'b'] });

// react-beautiful-dnd only finds its drag handles when the tree is in the document.
const attached = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return { attachTo: div };
};

describe('MUI v5 port', () => {
  it('renders TextFields in the standard variant, not v5\'s outlined default', () => {
    const wrapper = mount(<FormBuilder schema={schema} uischema={uischema} onChange={() => {}} />, attached());
    const html = wrapper.html();
    expect(html).toContain('MuiInput-root');
    expect(html).not.toContain('MuiOutlinedInput-root');
  });
  it('applies the root sx (emotion class + the former JSS text-align)', () => {
    const wrapper = mount(<FormBuilder schema={schema} uischema={uischema} onChange={() => {}} />, attached());
    expect(wrapper.find('div').first().getDOMNode().getAttribute('class')).toMatch(/css-/);
    expect(wrapper.html()).toMatch(/text-align:\s*center/);
  });
  it('renders Selects in the standard variant, with v5\'s role=combobox trigger', () => {
    const wrapper = mount(<FormBuilder schema={schema} uischema={uischema} onChange={() => {}} />, attached());
    // expand the first card so its "Input Type" Select mounts
    wrapper.find('.card-container').first().find('[role="button"]').first().simulate('click');
    const html = wrapper.html();
    expect(html).toContain('MuiSelect-standard');
    expect(html).not.toContain('MuiSelect-outlined');
    expect(wrapper.find('[role="combobox"]').length).toBeGreaterThan(0);
  });
  it('keeps CardModal\'s Cancel button neutral grey and Save primary', () => {
    const wrapper = mount(
      <CardModal
        componentProps={{ name: 'n' }}
        onChange={() => {}}
        isOpen
        onClose={() => {}}
        TypeSpecificParameters={() => <div />}
      />,
    );
    const classes = wrapper.find('button.MuiButton-root').map((b) => b.getDOMNode().className);
    expect(classes.some((c) => c.includes('MuiButton-containedInherit'))).toBe(true);
    expect(classes.some((c) => c.includes('MuiButton-containedPrimary'))).toBe(true);
  });
  it('keeps CardSelector\'s FormControl standard and fullWidth', () => {
    const wrapper = mount(
      <CardSelector
        possibleChoices={['a', 'b']}
        chosenChoices={[]}
        onChange={() => {}}
        placeholder="p"
        path="root"
      />,
    );
    const html = wrapper.html();
    expect(html).toContain('MuiInputBase-fullWidth');
    expect(html).not.toContain('MuiOutlinedInput');
  });
  it('leaves every Tooltip non-interactive, as v4 was', () => {
    const wrapper = mount(<FormBuilder schema={schema} uischema={uischema} onChange={() => {}} />, attached());
    const tooltips = wrapper.find('ForwardRef(Tooltip)');
    expect(tooltips.length).toBeGreaterThan(0);
    tooltips.forEach((t) => {
      expect((t.props() as any).disableInteractive).toBe(true);
    });
  });
  it('renders Alert/AlertTitle (moved from @material-ui/lab to @mui/material)', () => {
    const wrapper = mount(
      <FormBuilder
        schema={JSON.stringify({ type: 'object', properties: {}, oneOf: [] })}
        uischema={'{}'}
        onChange={() => {}}
      />,
      attached(),
    );
    expect(wrapper.find('.MuiAlert-root').length).toBeGreaterThan(0);
    expect(wrapper.find('.MuiAlertTitle-root').length).toBeGreaterThan(0);
  });
});
