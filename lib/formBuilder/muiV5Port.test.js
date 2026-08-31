"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Pins the v4 -> v5 render deltas this library had to compensate for. Each assertion here is a
 * v5 default that would silently change the rendered form if a future edit dropped the pin:
 * TextField/Select/FormControl default variant (standard -> outlined), Button default color
 * (default -> primary), and Tooltip's interactive default (off -> on).
 */
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var FormBuilder_1 = __importDefault(require("./FormBuilder"));
var CardModal_1 = __importDefault(require("./CardModal"));
var CardSelector_1 = __importDefault(require("./dependencies/CardSelector"));
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
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        var html = wrapper.html();
        expect(html).toContain('MuiInput-root');
        expect(html).not.toContain('MuiOutlinedInput-root');
    });
    it('applies the root sx (emotion class + the former JSS text-align)', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        expect(wrapper.find('div').first().getDOMNode().getAttribute('class')).toMatch(/css-/);
        expect(wrapper.html()).toMatch(/text-align:\s*center/);
    });
    it('renders Selects in the standard variant, with v5\'s role=combobox trigger', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        // expand the first card so its "Input Type" Select mounts
        wrapper.find('.card-container').first().find('[role="button"]').first().simulate('click');
        var html = wrapper.html();
        expect(html).toContain('MuiSelect-standard');
        expect(html).not.toContain('MuiSelect-outlined');
        expect(wrapper.find('[role="combobox"]').length).toBeGreaterThan(0);
    });
    it('keeps CardModal\'s Cancel button neutral grey and Save primary', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardModal_1.default, { componentProps: { name: 'n' }, onChange: function () { }, isOpen: true, onClose: function () { }, TypeSpecificParameters: function () { return react_1.default.createElement("div", null); } }));
        var classes = wrapper.find('button.MuiButton-root').map(function (b) { return b.getDOMNode().className; });
        expect(classes.some(function (c) { return c.includes('MuiButton-containedInherit'); })).toBe(true);
        expect(classes.some(function (c) { return c.includes('MuiButton-containedPrimary'); })).toBe(true);
    });
    it('keeps CardSelector\'s FormControl standard and fullWidth', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(CardSelector_1.default, { possibleChoices: ['a', 'b'], chosenChoices: [], onChange: function () { }, placeholder: "p", path: "root" }));
        var html = wrapper.html();
        expect(html).toContain('MuiInputBase-fullWidth');
        expect(html).not.toContain('MuiOutlinedInput');
    });
    it('leaves every Tooltip non-interactive, as v4 was', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, { schema: schema, uischema: uischema, onChange: function () { } }), attached());
        var tooltips = wrapper.find('ForwardRef(Tooltip)');
        expect(tooltips.length).toBeGreaterThan(0);
        tooltips.forEach(function (t) {
            expect(t.props().disableInteractive).toBe(true);
        });
    });
    it('renders Alert/AlertTitle (moved from @material-ui/lab to @mui/material)', function () {
        var wrapper = (0, enzyme_1.mount)(react_1.default.createElement(FormBuilder_1.default, { schema: JSON.stringify({ type: 'object', properties: {}, oneOf: [] }), uischema: '{}', onChange: function () { } }), attached());
        expect(wrapper.find('.MuiAlert-root').length).toBeGreaterThan(0);
        expect(wrapper.find('.MuiAlertTitle-root').length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=muiV5Port.test.js.map