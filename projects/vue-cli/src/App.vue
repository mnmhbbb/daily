<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
export default {
  data: function() {
    return {
      str: 'Header!',
    };
  },
  components: {
    LoginForm,
  },
};
</script>

<style></style>
