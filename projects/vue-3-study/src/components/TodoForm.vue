<template>
  <form type="submit" @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input type="text" v-model="todo" placeholder="할 일을 입력하세요." class="form-control" />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">추가</button>
      </div>
    </div>
    <div v-show="hasError" class="mt-2" style="color: red">입력된 글자가 없습니다!</div>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['add-todo'],
  setup(props, { emit }) {
    const todo = ref('');
    const hasError = ref(false);
    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true;
      } else {
        hasError.value = false;

        // 부모 컴포넌트에 전달
        emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });

        todo.value = '';
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>

<style></style>
