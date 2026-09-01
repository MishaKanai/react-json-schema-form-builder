/**
 * Pins the MUI render deltas this library had to compensate for. Each assertion here is an
 * upstream default that would silently change the rendered form if a future edit dropped the pin.
 *
 * v4 -> v5: TextField/Select/FormControl default variant (standard -> outlined), Button default
 * color (default -> primary), and Tooltip's interactive default (off -> on).
 * v6 -> v7: AccordionSummary's root element (div role="button" -> a real <button>).
 */
import React from "react";
import { mount } from "enzyme";
import FormBuilder from "./FormBuilder.js";
import CardModal from "./CardModal.js";
import CardSelector from "./dependencies/CardSelector.js";
var schema = JSON.stringify({
    title: 'T',
    description: 'D',
    type: 'object',
    properties: {
        a: { title: 'A', type: 'string' },
        b: { title: 'B', type: 'string', enum: ['x', 'y'] },
    },
});
var uischema = JSON.stringify({ 'ui:order': ['a', 'b'] });
// react-beautiful-dnd only finds its drag handles when the tree is in the document.
var attached = function () {
    var div = document.createElement('div');
    document.body.appendChild(div);
    return { attachTo: div };
};
describe('MUI v5 port', function () {
    it('renders TextFields in the standard variant, not v5\'s outlined default', function () {
        var wrapper = mount(React.createElement(FormBuilder, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        var html = wrapper.html();
        expect(html).toContain('MuiInput-root');
        expect(html).not.toContain('MuiOutlinedInput-root');
    });
    it('applies the root sx (emotion class + the former JSS text-align)', function () {
        var wrapper = mount(React.createElement(FormBuilder, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        expect(wrapper.find('div').first().getDOMNode().getAttribute('class')).toMatch(/css-/);
        expect(wrapper.html()).toMatch(/text-align:\s*center/);
    });
    it('renders Selects in the standard variant, with v5\'s role=combobox trigger', function () {
        var wrapper = mount(React.createElement(FormBuilder, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        // expand the first card so its "Input Type" Select mounts
        wrapper.find('.card-container').first().find('[role="button"]').first().simulate('click');
        var html = wrapper.html();
        expect(html).toContain('MuiSelect-standard');
        expect(html).not.toContain('MuiSelect-outlined');
        expect(wrapper.find('[role="combobox"]').length).toBeGreaterThan(0);
    });
    it('keeps CardModal\'s Cancel button neutral grey and Save primary', function () {
        var wrapper = mount(React.createElement(CardModal, { componentProps: { name: 'n' }, onChange: function () { }, isOpen: true, onClose: function () { }, TypeSpecificParameters: function () { return React.createElement("div", null); } }));
        var classes = wrapper.find('button.MuiButton-root').map(function (b) { return b.getDOMNode().className; });
        expect(classes.some(function (c) { return c.includes('MuiButton-containedInherit'); })).toBe(true);
        expect(classes.some(function (c) { return c.includes('MuiButton-containedPrimary'); })).toBe(true);
    });
    it('keeps CardSelector\'s FormControl standard and fullWidth', function () {
        var wrapper = mount(React.createElement(CardSelector, { possibleChoices: ['a', 'b'], chosenChoices: [], onChange: function () { }, placeholder: "p", path: "root" }));
        var html = wrapper.html();
        expect(html).toContain('MuiInputBase-fullWidth');
        expect(html).not.toContain('MuiOutlinedInput');
    });
    it('leaves every Tooltip non-interactive, as v4 was', function () {
        var wrapper = mount(React.createElement(FormBuilder, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        var tooltips = wrapper.find('ForwardRef(Tooltip)');
        expect(tooltips.length).toBeGreaterThan(0);
        tooltips.forEach(function (t) {
            expect(t.props().disableInteractive).toBe(true);
        });
    });
    it("keeps the collapse header a div[role=button] so its IconButtons are not nested in a button", function () {
        var wrapper = mount(React.createElement(FormBuilder, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        var summaries = wrapper.find('.MuiAccordionSummary-root').filterWhere(function (n) { return typeof n.type() === 'string'; });
        expect(summaries.length).toBeGreaterThan(0);
        summaries.forEach(function (s) {
            var el = s.getDOMNode();
            expect(el.tagName).toBe('DIV');
            expect(el.getAttribute('role')).toBe('button');
            // v7's default <button> root would make every IconButton in the header a nested button.
            expect(el.querySelectorAll('button').length).toBeGreaterThan(0);
            expect(el.closest('button')).toBe(null);
        });
    });
    it('renders Alert/AlertTitle (moved from @material-ui/lab to @mui/material)', function () {
        var wrapper = mount(React.createElement(FormBuilder, { schema: JSON.stringify({ type: 'object', properties: {}, oneOf: [] }), uischema: '{}', onChange: function () { } }), attached());
        expect(wrapper.find('.MuiAlert-root').length).toBeGreaterThan(0);
        expect(wrapper.find('.MuiAlertTitle-root').length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=muiV5Port.test.js.map