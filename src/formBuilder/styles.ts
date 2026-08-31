// Consumed as an `sx` fragment (see FormBuilder), so keys are camelCase and the
// object is `as const` to keep `float` typed as a CSS keyword rather than string.
export const arrows = {
  '& .arrows': {
    float: 'right',
    '& .fa-arrow-up, & .fa-arrow-down': {
      borderRadius: '4px',
      padding: '.25em',
      margin: '0 .5em 0 0',
      border: '1px solid #1d71ad',
      color: '#1d71ad',
      height: '28px',
      width: '28px'
    }
  }
} as const;
