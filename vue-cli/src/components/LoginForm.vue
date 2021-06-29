<template>
  <form v-on:submit.prevent="submitForm">
    <label for="username">ID: </label>
    <input for="username" type="text" v-model="id" />
    <label for="password">PW: </label>
    <input for="password" type="password" v-model="pw" />
    <label for="check">check</label>
    <input for="check" type="checkbox" v-model="check" />
    <button>Login</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: '',
      pw: '',
      check: '',
    };
  },
  methods: {
    submitForm: function() {
      console.log(this.id, this.pw);
      const url = 'https://jsonplaceholder.typicode.com/users';
      const data = {
        username: this.id,
        password: this.pw,
        check: this.check,
      };

      axios
        .post(url, data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
