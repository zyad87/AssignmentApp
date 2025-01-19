<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 animate-pulse">
      <div class="flex items-start gap-6">
        <div class="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div class="flex-1 space-y-4">
          <div class="h-6 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          <div class="h-4 bg-gray-300 rounded w-1/3"></div>
          <div class="mt-4">
            <div class="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonCard",
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    background-color: #e5e7eb;
  }
  50% {
    background-color: #f3f4f6;
  }
}
</style>
