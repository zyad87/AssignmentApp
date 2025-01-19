<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="n in count"
      :key="n"
      class="flex items-center bg-gray-200/70 p-4 rounded-lg animate-pulse"
    >
      <div class="w-16 h-16 bg-gray-300 rounded-full"></div>

      <div class="flex-1 ml-4 space-y-2">
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: {
    count: {
      type: Number,
      default: 12, 
    },
  },
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    background-color: #eee;
  }
  50% {
    background-color: #a2adb9;
  }
}
</style>
