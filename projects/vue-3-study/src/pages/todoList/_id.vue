<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">Loading..</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>할 일</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>상태</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? '완료' : '미완료' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">저장</button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">취소</button>
  </form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;

    const getTodo = async () => {
      const res = await axios.get(`
            http://localhost:3000/todos/${todoId}
          `);

      todo.value = { ...res.data };
      originalTodo.value = { ...res.data };

      loading.value = false;
    };

    // 이전 값과 현재 입력 받은 값을 비교하여 업데이트 여부를 판단
    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'To do list',
      });
    };

    getTodo();

    const onSave = async () => {
      const res = await axios.put(
        `
            http://localhost:3000/todos/${todoId}
          `,
        {
          subject: todo.value.subject,
          completed: todo.value.completed,
        },
      );

      try {
        originalTodo.value = { ...res.data };
        alert('저장되었습니다.');
      } catch (err) {
        console.log(err);
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
    };
  },
};
</script>

<style></style>
