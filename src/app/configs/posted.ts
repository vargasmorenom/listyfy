export const posted = [
  { name: 'name',
    label: 'Titulo',
    type: 'text',
    validations: [
      { type: 'required' },
      { type: 'pattern', value: /^[A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\s]{2,100}$/ }
    ]
  },
  { name: 'description',
    label: 'descripcion',
    type: 'textarea',
    validations: [
      { type: 'required' },
      { type: 'pattern', value: /^[A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\s]{2,300}$/ }]
  },
  { name: 'tipopost',
    label: 'Tipo de Contenido',
    type: 'select',
    content:[
      {id: '1', dato: 'Twitter or X'},
      {id:'2',dato:'Facebook'},
      {id:'3',dato:'Instagram'},
      {id:'4',dato:'TikTok'},
      {id:'5',dato:'Youtube'},
      {id:'6',dato:'Linkedin'},],
    validations: [
      { type: 'required' }]
  },
  { name: 'tags',
    label: 'Tags',
    type: 'text',
    validations: [
      { type: 'pattern', value: /^[A-Za-z-ZñÑáéíóúÁÉÍÓÚ0,@#-9\s]{2,300}$/}]
  },
  { name: 'access',
    label: 'Nivel de Acceso',
    type: 'select',
    content:[{id: '1', dato: 'publico'},{id:'2',dato:'privado'}],
    validations: [
      { type: 'required' }]

  }
];
