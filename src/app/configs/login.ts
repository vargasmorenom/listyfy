export const login = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validations: [{ type: 'required' }, { type: 'minlength', value: 8 }],
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    validations: [{ type: 'required' }, { type: 'minlength', value: 8 }],
  },
];
