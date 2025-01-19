<template>
  <nav
    class="relative bg-gray-200 text-gray-800 backdrop-blur-md  rounded-lg max-w-screen-2xl mx-auto mt-0 px-6 lg:mt-4 z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="text-lg font-bold">
        Assignment
      </div>
      <div class="flex items-center space-x-4 md:hidden">
        <button @click="toggleMenu" class="text-gray-800 hover:text-gray-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <router-link to="/add-person" class="bg-blue-700 text-blue-100 p-2 rounded-md hover:bg-blue-900 transition">
          <span class="hidden md:block">Add Person</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:hidden" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </router-link>
      </div>

      <div :class="{
        hidden: !isMenuOpen,
        'absolute flex flex-col bg-gray-200 top-full left-0 w-full md:w-auto md:static md:flex-row md:items-center md:space-x-4 md:flex': true
      }">
        <router-link to="/" class="block hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          active-class="bg-gray-100">
          Home
        </router-link>
        <router-link to="/persons" class="block hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          active-class="bg-gray-100">
          Persons List
        </router-link>
        <div class="flex items-center">
          <router-link to="/add-person"
            class="bg-blue-700 text-blue-100 py-2 px-4 rounded-md hover:bg-blue-900 transition hidden md:block">
            Add Person
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
nav a {
  transition: background-color 0.3s ease-in-out;
}
</style>