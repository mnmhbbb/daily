<script>
export default {};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">HOME</router-link>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{ name: 'To do list' }"
            >ToDoList</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style></style>
