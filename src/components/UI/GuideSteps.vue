<template>
  <div class="flex flex-col items-center justify-center  w-full mt-6 bg-gray-50 p-6">
    <h1 class="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-700 mb-3 sm:mb-4 leading-tight">
      Easy Steps to Add a Person
    </h1>

    <p class="text-gray-700 text-sm sm:text-base lg:text-lg mb-6 px-3 sm:px-0 leading-relaxed">
      Follow these simple steps and add a person effortlessly
    </p>

    <div class="relative w-full my-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col items-center text-center relative">
          <div class="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full shadow-lg mb-4">
            <i class="fas fa-user-plus text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Fill Basic Info</h3>
        </div>

        <div class="flex flex-col items-center text-center relative">
          <div
            class="w-16 h-16 flex items-center justify-center bg-green-100 text-green-500 rounded-full shadow-lg mb-4">
            <i class="fas fa-calendar-alt text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Add Personal Details</h3>
        </div>

        <div class="flex flex-col items-center text-center relative">
          <div
            class="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-500 rounded-full shadow-lg mb-4">
            <i class="fas fa-image text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Upload an Avatar</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped></style>