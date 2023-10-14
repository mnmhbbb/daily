<script>
import { computed, ref } from 'vue'

import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios'

export default {
  setup() {
    const todoList = ref([])
    const searchText = ref('')
    const errorText = ref('')

    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos')
        todoList.value = res.data
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
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        })
        todoList.value.push(res.data)
      } catch (err) {
        console.error(err)
        errorText.value = '에러 발생!'
      }
    }

    const doneStyle = {
      textDecoration: 'line-through',
      color: 'gray'
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
        todoList.value.splice(index, 1)
      } catch (err) {
        console.error(err)
        errorText.value = '에러 발생!'
      }
    }

    const filteredTodoList = computed(() => {
      if (searchText.value) {
        return todoList.value.filter((item) => {
          return item.subject.includes(searchText.value)
        })
      }
      return todoList.value
    })

    return {
      todoList,
      errorText,
      doneStyle,
      getTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      filteredTodoList
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

    <div v-if="!filteredTodoList.length">해당하는 할 일이 없습니다.</div>

    <TodoList :todoList="filteredTodoList" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
