import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/index.vue';
import TodoList from '../pages/todoList/index.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'HOME',
      component: Home,
    },
    {
      path: '/todoList',
      name: 'Todo List',
      component: TodoList,
    },
  ],
});

export default router;
