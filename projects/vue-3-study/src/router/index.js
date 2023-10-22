import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/index.vue';
import TodoList from '../pages/todoList/index.vue';
import Todo from '../pages/todoList/_id.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/todoList',
      name: 'To do list',
      component: TodoList,
    },
    {
      path: '/todoList/:id',
      name: 'Todo',
      component: Todo,
    },
  ],
});

export default router;
