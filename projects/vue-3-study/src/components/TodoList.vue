<template>
  <div v-for="(item, index) in todoList" :key="item.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <input
          type="checkbox"
          class="form-check-input"
          :checked="item.completed"
          @change="toggleTodo(index)"
        />
        <label class="form-check-label" :class="{ done: item.completed }">{{ item.subject }}</label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoList: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const toggleTodo = (index) => {
      emit('toggle-todo', index);
    };
    const deleteTodo = (index) => {
      emit('delete-todo', index);
    };
    return {
      toggleTodo,
      deleteTodo,
    };
  },
};
</script>

<style></style>
