<template>
  <footer class="bg-gray-900 text-white py-4">
    <div class="container mx-auto text-center">
      <p class="text-sm">
        Made with
        <i class="fas fa-heart text-red-500"></i>
        by
        <a href="https://github.com/zyad87" target="_blank" class="text-blue-200 hover:text-blue-400 transition">
          Zyad
        </a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>