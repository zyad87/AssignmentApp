<template>
    <p v-if="message" class="text-red-500 text-sm mt-1">{{ message }}</p>
  </template>
  
  <script>
  export default {
    name: "ErrorMessage",
    props: {
      message: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  