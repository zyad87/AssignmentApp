<template>
  <PersonForm @submit="addPerson" />
</template>

<script>
import PersonForm from '../components/PersonForm.vue';

export default {
  components: {
    PersonForm,
  },
  methods: {
    addPerson(data) {
      console.log('Person Added:', data);
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
