<template>
  <div
    class="relative bg-gradient-to-r from-blue-200 via-blue-100 to-blue-300 rounded-xl p-8 py-14 max-w-screen-2xl mx-3 my-5 z-10 md:mx-auto animate-slideUp opacity-0"
    v-scroll-reveal>
    <div class="absolute inset-0 bg-white/30 backdrop-blur-md rounded-xl"></div>
    <div class="relative z-20 text-center">
      <h1
        class="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-700 mb-3 sm:mb-4 leading-tight animate-slideUp opacity-0"
        v-scroll-reveal>
        Manage People Easily
      </h1>
      <p class="text-gray-700 text-sm sm:text-base lg:text-lg mb-6 px-3 sm:px-0 leading-relaxed animate-slideUp opacity-0 delay-150"
        v-scroll-reveal>
        Find and manage people effortlessly Tap on any name to view details or use the search bar below to quickly find
        someone.
      </p>

      <div class="flex justify-center animate-slideUp opacity-0 delay-300" v-scroll-reveal>
        <div class="relative w-full max-w-lg">
          <input type="text" placeholder="Search for a person..." v-model="searchQuery" @input="onSearchInput"
            class="w-full py-3 px-4 pr-12 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent" />
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-400 text-lg"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute -top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-50"></div>
    <div class="absolute -bottom-10 right-10 w-48 h-48 bg-purple-300 rounded-full blur-3xl opacity-50"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    onSearchInput() {
      this.$emit("search", this.searchQuery);
    },
  },
  directives: {
    scrollReveal: {
      inserted: (el) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.classList.add("opacity-100", "animate-slideUp");
              observer.unobserve(el);
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      },
    },
  },
};
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out forwards;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

.delay-150 {
  animation-delay: 0.15s;
}

.delay-300 {
  animation-delay: 0.3s;
}
</style>
