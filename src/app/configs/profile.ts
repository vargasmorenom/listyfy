export const profile = [
  { name: 'chanelName',
    label: 'Nombre del Canal',
    type: 'text',
    validations: [
      { type: 'required' },
      { type: 'pattern', value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,:.\/@#\s-]{6,300}$/ }
    ]
  },
  { name: 'description',
    label: 'descripción',
    type: 'textarea',
    validations: [
      { type: 'required' },
      { type: 'pattern', value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,:.\/@#\s-]{6,300}$/ }
    ]
  },
  { name: 'firstname',
    label: 'Nombres',
    type: 'text',
    validations: [
     ]
  },
  { name: 'lastname',
    label: 'Apellidos',
    type: 'text',
    validations: [
     ]
  },
  { name: 'email',
    label: 'Correo Electronico',
    type: 'text',
    validations: [
     ]
  },
  { name: 'phoneNumber',
    label: 'Telefono',
    type: 'text',
    validations: [
     ]
  },
  { name: 'location',
    label: 'Ubicacion',
    type: 'text',
    validations: [
      { type: 'pattern', value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,:.\/@#\s-]{6,300}$/ }
    ]
  },
  { name: 'linksString',
    label: 'links externos',
    type: 'textarea',
    explicacion: "Los links deben ser separados por una coma (,) ejemplo (link,link1,) ",
    validations: [
      { type: 'pattern', value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,:.\/@#\s-]{6,300}$/ }
     ]
  },
  { name: 'socialMediaString',
    label: 'Redes Sociales',
    type: 'textarea',
    explicacion: "Las url deben ser separados por una coma (,) ejemplo (facebook,instagram,) ",
    validations: [
      { type: 'pattern', value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,:.\/@#\s-]{6,300}$/ }
    ]
  },
  { name: 'instantMessagesString',
    label: 'Mensajería Instantánea',
    type: 'textarea',
    explicacion: "Estos numeros se deben ingresar con app: numero y ceparodos por una coma(,) ejemplo('whatsapp:320254558')",
    validations: [
      { type: 'pattern', value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,:.\/@#\s-]{6,300}$/ }
    ]
  },

];
