import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/ClientesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: { titulo: 'Lista de Clientes' }
    },
    {
      path: '/novo-cliente',
      name: 'novo-cliente',
      component: () => import('@/views/NovoClienteView.vue'),
      props: { titulo: 'Cadastrar Cliente' }
    },
    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: () => import('@/views/EditarClienteView.vue'),
      props: { titulo: 'Editar Cliente' }
    }
  ]
});

export default router;
