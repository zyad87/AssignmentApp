<template>
  <div class="container mx-auto p-4" @scroll.passive="onScroll">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-2xl font-bold text-gray-700 text-center sm:text-left">
        All Persons
        <span class=" text-gray-700">{{ filteredPersons.length !== 0 ? filteredPersons.length : "" }}</span>
      </h1>

      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div class="relative w-full sm:w-auto">
          <select v-model="ageFilter" @change="applyFilters"
            class="custom-select w-full sm:w-auto py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled selected>Filter by Age</option>
            <option value="ascending">Youngest to Oldest</option>
            <option value="descending">Oldest to Youngest</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <SkeletonLoader v-if="isLoading" :count="21" />
    <div v-if="!isLoading && displayedPersons.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <PersonCard v-for="person in displayedPersons" :key="person.id" :person="person" @edit="editPerson" />
    </div>
    <div v-if="!isLoading && !displayedPersons.length" class="text-center text-gray-500">
      <p>No persons available.</p>
    </div>
    <div class="text-center py-4">
      <SkeletonLoader v-if="isLoadingMore" :count="6" />
    </div>
  </div>
</template>


<script>
import PersonCard from "./UI/Cards/PersonCard.vue";
import SkeletonLoader from "./UI/Loaders/SkeletonLoader.vue";
import { getPersons } from "../services/api";

export default {
  components: {
    PersonCard,
    SkeletonLoader,
  },
  data() {
    return {
      persons: [],
      filteredPersons: [],
      displayedPersons: [],
      ageFilter: "",
      isLoading: true,
      isLoadingMore: false,
      error: null,
      page: 1,
      perPage: 15,
      interval: null,
    };
  },
  mounted() {
    this.fetchPersons();

    this.interval = setInterval(() => {
      this.fetchPersons(true);
    }, 6000);

    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async fetchPersons(update = false) {
      try {
        if (!update) this.isLoading = true;
        const response = await getPersons();
        this.persons = response.data;

        if (this.ageFilter) {
          this.applyFilters();
        } else {
          this.filteredPersons = [...this.persons];
          this.updateDisplayedPersons();
        }
      } catch (err) {
        this.error = "Failed to fetch persons. Please try again later.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    updateDisplayedPersons() {
      this.displayedPersons = this.filteredPersons.slice(0, this.page * this.perPage);
    },
    applyFilters() {
      let filtered = [...this.persons];

      if (this.ageFilter === "ascending") {
        filtered.sort((a, b) => this.calculateAge(a.dob) - this.calculateAge(b.dob));
      } else if (this.ageFilter === "descending") {
        filtered.sort((a, b) => this.calculateAge(b.dob) - this.calculateAge(a.dob));
      }

      this.filteredPersons = filtered;
      this.page = 1;
      this.updateDisplayedPersons();
    },
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
    onScroll() {
      const bottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (bottom && !this.isLoadingMore) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.displayedPersons.length < this.filteredPersons.length) {
        this.isLoadingMore = true;
        setTimeout(() => {
          this.page++;
          this.updateDisplayedPersons();
          this.isLoadingMore = false;
        }, 1000);
      }
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

<style scoped>
.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 1rem;
  color: #374151;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.custom-select:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
}

.custom-select:hover {
  border-color: #3b82f6;
  background-color: #f3f4f6;
}

.custom-select option {
  font-size: 1rem;
  color: #374151;
}

.custom-select:focus-visible {
  box-shadow: none;
}
</style>