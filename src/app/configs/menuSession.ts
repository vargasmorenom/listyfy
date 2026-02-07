export type MenuVisibility = 'public' | 'auth' | 'guest';

export const menuactivo = [
  {
    name: 'Home',
    url: '/',
    icon: 'home-outline',
    visibility: 'public' // 👈 siempre visible
  },
  {
    name: 'Buscar',
    url: '/search',
    icon: 'search-outline',
    visibility: 'auth'
  },
  {
    name: 'Nueva Lista',
    url: '/newlist',
    icon: 'add-circle',
    visibility: 'auth'
  },
  {
    name: 'Tendencias',
    url: '/tendencies',
    icon: 'analytics-outline',
    visibility: 'auth'
  },
  {
    name: 'Perfil',
    url: '/perfil',
    icon: 'person-circle-outline',
    visibility: 'auth'
  },
  {
    name: 'Inscripcion',
    url: '/register',
    icon: 'person-add-outline',
    visibility: 'guest'
  },
  {
    name: 'Login',
    url: '/login',
    icon: 'log-in-outline',
    visibility: 'guest'
  }
];
