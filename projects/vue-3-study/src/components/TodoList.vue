<template>
  <div v-for="(item, index) in todoList" :key="item.id" class="card mt-2">
    <div
      @click="moveToPage(item.id)"
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
    >
      <div class="form-check flex-grow-1">
        <input
          type="checkbox"
          class="form-check-input"
          :checked="item.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
        />
        <label class="form-check-label" :class="{ done: item.completed }">{{ item.subject }}</label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    todoList: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const router = useRouter();

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };
    const deleteTodo = (index) => {
      emit('delete-todo', index);
    };
    const moveToPage = (todoId) => {
      console.log('todoId', todoId);
      // router.push(`/todoList/${todoId}`);
      router.push({
        name: 'Todo',
        params: {
          id: todoId,
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
    };
  },
};
</script>

<style></style>
