<template>
  <div class="container mx-auto ">
    <Header @search="handleSearch" />
    <h1 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 ml-3 text-left">Persons List</h1>

    <p class="text-gray-700 text-sm sm:text-base lg:text-lg ml-3 mb-6 sm:leading-relaxed">
      To view more people, click <span class="font-bold">View More</span>
    </p>



    <SkeletonLoader v-if="isLoading" :count="9" />

    <div v-if="!isLoading && limitedPersons.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-xl  p-2 ">
      <PersonCard v-for="person in limitedPersons" :key="person.id" :person="person" @edit="editPerson" />
    </div>

    <div v-if="!isLoading && filteredPersons.length > 9" class="text-center my-6 ">
      <button @click="navigateToAllPersons"
        class="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition">
        View More
      </button>
    </div>

    <div v-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <div v-if="!isLoading && !filteredPersons.length" class="text-center text-gray-500">
      <p>No persons available.</p>
    </div>
  </div>
</template>

<script>
import Header from "./Layout/Header.vue";
import PersonCard from "./UI/Cards/PersonCard.vue";
import SkeletonLoader from "./UI/Loaders/SkeletonLoader.vue";
import { getPersons } from "../services/api";

export default {
  components: {
    Header,
    PersonCard,
    SkeletonLoader,
  },
  data() {
    return {
      persons: [],
      filteredPersons: [],
      searchQuery: "",
      isLoading: true,
      error: null,
    };
  },
  computed: {
    limitedPersons() {
      return this.filteredPersons.slice(0, 6);
    },
  },
  mounted() {
    this.fetchPersons();
  },
  methods: {
    async fetchPersons() {
      try {
        const response = await getPersons();
        this.persons = response.data;

        const shuffledPersons = this.shuffleArray([...this.persons]);

        if (!this.searchQuery) {
          this.filteredPersons = shuffledPersons;
        }
      } catch (err) {
        this.error = "Failed to fetch persons. Please try again later.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.filteredPersons = this.persons.filter((person) =>
        person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    navigateToAllPersons() {
      this.$router.push({ name: "PersonListPage" }).then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    editPerson(person) {
      this.$router.push({
        name: "EditPerson",
        params: { id: person.id },
      });
    },
  },
};
</script>
