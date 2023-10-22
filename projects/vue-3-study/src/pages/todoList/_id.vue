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
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const todoId = route.params.id;

    const getTodo = async () => {
      try {
        const res = await axios.get(`
              http://localhost:3000/todos/${todoId}
            `);

        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        console.log(error);
        tiggerToast('다시 시도해 주세요.', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos',
      });
    };

    getTodo();

    const tiggerToast = (message, type = 'success') => {
      toastMessage.value = message;
      toastAlertType.value = type;
      showToast.value = true;
      setTimeout(() => {
        toastMessage.value = '';
        toastAlertType.value = '';
        showToast.value = false;
      }, 3000);
    };

    const onSave = async () => {
      try {
        const res = await axios.put(
          `
              http://localhost:3000/todos/${todoId}
            `,
          {
            subject: todo.value.subject,
            completed: todo.value.completed,
          },
        );

        originalTodo.value = { ...res.data };
        tiggerToast('저장되었습니다.');
      } catch (error) {
        console.log(error);
        tiggerToast('저장 실패', 'danger');
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
    };
  },
};
</script>

<style></style>
