<template>
    <div class="flex justify-between items-center mb-6">
      <div
        v-for="step in steps"
        :key="step.id"
        class="flex-1 h-2 rounded-full mx-1"
        :class="{
          'bg-blue-100': currentStep === step.id,
          'bg-green-200': currentStep > step.id,
          'bg-gray-300': currentStep < step.id,
        }"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProgressBar",
    props: {
      steps: { type: Array, required: true },
      currentStep: { type: Number, required: true },
    },
  };
  </script>
  