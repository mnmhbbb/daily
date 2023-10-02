<script>
import { ref } from 'vue'

export default {
  setup() {
    const todo = ref('')
    const todoList = ref([])
    const hasError = ref(false)
    const doneStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true
      } else {
        hasError.value = false
        todoList.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false
        })
        todo.value = ''
      }
    }
    const deleteTodo = (index) => {
      todoList.value.splice(index, 1)
    }
    return {
      todo,
      todoList,
      onSubmit,
      hasError,
      doneStyle,
      deleteTodo
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>To Do List</h1>

    <form type="submit" @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input
            type="text"
            v-model="todo"
            placeholder="할 일을 입력하세요."
            class="form-control"
          />
        </div>
        <div>
          <button class="btn btn-primary" type="submit">추가</button>
        </div>
      </div>
      <div v-show="hasError" class="mt-2" style="color: red">입력된 글자가 없습니다!</div>
    </form>

    <div v-if="!todoList.length">추가된 할 일이 없습니다.</div>

    <div v-for="(item, index) in todoList" :key="item.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input type="checkbox" class="form-check-input" v-model="item.completed" />
          <label class="form-check-label" :class="{ done: item.completed }">{{
            item.subject
          }}</label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
