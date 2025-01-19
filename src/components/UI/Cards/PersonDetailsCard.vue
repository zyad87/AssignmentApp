<template>
    <div class="flex items-center justify-center w-full min-h-screen  ">
      <div class="bg-white  rounded-lg p-6 sm:p-8 max-w-5xl w-full">
        <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <img
            :src="person.avatar || 'https://via.placeholder.com/150'"
            alt="Avatar"
            class="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-blue-300 shadow-md"
          />
          <div class="flex-1 text-center lg:text-left">
            <h1 class="text-3xl sm:text-5xl font-bold text-gray-800">{{ person.name }}</h1>
            <p class="text-gray-600 text-base sm:text-xl mt-2">{{ person.email }}</p>
            <p class="text-gray-500 text-sm sm:text-lg mt-2">
              <span class="font-semibold">Date of Birth:</span> {{ formatDate(person.dob) }}
            </p>
            <p class="text-gray-500 text-sm sm:text-lg mt-2">
              <span class="font-semibold">Age:</span> {{ calculateAge(person.dob) }}
            </p>
            <p class="text-gray-500 text-sm sm:text-lg mt-2">
              <span class="font-semibold">Country:</span> {{ person.country }}
            </p>
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
              <button
                class="bg-blue-200 text-blue-700 px-4 py-3 rounded-lg shadow-lg hover:bg-blue-300 transition col-span-12 sm:col-span-8"
                @click="$emit('edit')"
              >
                Edit
              </button>
              <button
                class="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition col-span-12 sm:col-span-4"
                @click="goBack"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      person: {
        type: Object,
        required: true,
      },
    },
    methods: {
      calculateAge(dob) {
        if (!dob) return 0;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },
      formatDate(date) {
        if (!date) return "N/A";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
      },
      goBack() {
        this.$router.push({ name: "PersonListPage" });
      },
    },
  };
  </script>
  