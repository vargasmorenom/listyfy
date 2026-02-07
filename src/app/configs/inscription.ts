export const inscription = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validations: [
      { type: 'required' },
      { type: 'minlength', value: 8 },
      { type: 'pattern', value: /^[a-zA-Z-0-9_]{8,25}$/ },
    ],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    validations: [
      { type: 'required' },
      { type: 'pattern', value: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/ },
    ],
  },
  {
    name: 'pais',
    label: 'Pais',
    type: 'custom',
    htmlType: '(ionInput)="onSearchChange($event)"',
    validations: [{ type: 'required' }],
  },
  { name: 'telefono', label: 'Telefono', type: 'text', validations: [{ type: 'required' }] },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validations: [
      { type: 'required' },
      { type: 'pattern', value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^_/()&*-]).{8,}$/ },
    ],
  },
  { name: 'confirmPassword', label: 'Confirmar Password', type: 'password', validations: [{ type: 'required' }] },
  {
    name: 'checkdatos',
    label: 'Terminos y Condiciones',
    type: 'checkbox',
    content: [],
    link: 'http://terminosycondiciones',
    validations: [{ type: 'required' }],
  },
];
