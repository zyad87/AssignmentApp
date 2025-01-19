<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg  transform hover:scale-103 w-full max-w-xl mx-auto p-4">
    <div class="flex items-center">
      <div class="w-24 h-24 flex-shrink-0">
        <img
          :src="person.avatar"
          alt="Avatar"
          class="w-full h-full object-cover rounded-full border-4 border-blue-200 shadow-md " 
        />
      </div>

      <div class="flex-1 ml-4">
  <h2
  class="text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer truncate"
  @click="$router.push({ name: 'PersonDetails', params: { id: person.id } })"
>
  {{ person.name }}
</h2>
  <p class="text-gray-500 text-sm truncate">{{ person.email }}</p>
  <p class="text-gray-400 text-sm mt-1">
    <span class="font-semibold text-gray-600">Age:</span> {{ calculateAge(person.dob) }}
  </p>
  <p class="mt-3">
  <span 
    class="inline-block bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-lg  ">
    {{ person.country }}
  </span>
</p>

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
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
};
</script>

<style scoped>
.bg-white {
  transition: all 0.3s ease-in-out;
}


</style>
