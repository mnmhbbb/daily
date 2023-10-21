<script>
import { computed, ref, watch } from 'vue'

import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios'

export default {
  setup() {
    const todoList = ref([])
    const searchText = ref('')
    const errorText = ref('')
    const numberOfTodos = ref(0)
    const limit = 5
    const currentPage = ref(1)
    const numberOfPages = computed(() => Math.ceil(numberOfTodos.value / limit))

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&_page=${page}&subject_like=${searchText.value}&_limit=${limit}`
        )
        todoList.value = res.data
        numberOfTodos.value = res.headers['x-total-count']
      } catch (err) {
        console.error(err)
        errorText.value = '에러 발생!'
      }
    }

    // 데이터베이스에서 목록 불러오기
    getTodos()

    const addTodo = async (todo) => {
      errorText.value = ''

      // 자식 컴포넌트에서 받아온 todo
      // 데이터베이스에 저장
      try {
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        })
        getTodos(1)
      } catch (err) {
        console.error(err)
        errorText.value = '에러 발생!'
      }
    }

    const toggleTodo = async (index) => {
      errorText.value = ''

      // 자식 컴포넌트에서 받아온 index로 삭제할 아이템의 id 선언
      const id = todoList.value[index].id

      try {
        await axios.patch(`http://localhost:3000/todos/${id}`, {
          completed: !todoList.value[index].completed
        })
        todoList.value[index].completed = !todoList.value[index].completed
      } catch (err) {
        console.error(err)
        errorText.value = '에러 발생!'
      }
    }

    const deleteTodo = async (index) => {
      errorText.value = ''

      // 자식 컴포넌트에서 받아온 index로 삭제할 아이템의 id 선언
      const id = todoList.value[index].id

      try {
        await axios.delete(`http://localhost:3000/todos/${id}`)
        getTodos(1)
      } catch (err) {
        console.error(err)
        errorText.value = '에러 발생!'
      }
    }

    watch(searchText, () => {
      // 검색 결과를 1페이지부터 다시 나타내기 위함
      getTodos(1)
    })

    return {
      todoList,
      errorText,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      numberOfPages,
      currentPage,
      getTodos
    }
  },
  components: { TodoForm, TodoList }
}
</script>

<template>
  <div class="container">
    <h1>To Do List</h1>

    <input type="text" v-model="searchText" placeholder="검색" class="form-control mb-2" />

    <TodoForm @add-todo="addTodo" />
    <span style="color: red">{{ errorText }}</span>

    <div v-if="!todoList.length">해당하는 할 일이 없습니다.</div>

    <TodoList :todoList="todoList" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />

    <hr />
    <!-- TODO: 컴포넌트로 빼기 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a class="page-link" href="#" @click="getTodos(Number(currentPage) - 1)">이전</a>
        </li>
        <li
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
          v-for="page in numberOfPages"
          :key="page"
          @click="getTodos(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" v-if="currentPage !== numberOfPages">
          <a class="page-link" href="#" @click="getTodos(Number(currentPage) + 1)">다음</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
