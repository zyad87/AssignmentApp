<template>
  <Navbar />
  <HomePersonList />
  <Footer />
</template>

<script>
import Navbar from "../components/Layout/Navbar.vue";
import HomePersonList from '../components/PersonList.vue';
import Footer from "../components/Layout/Footer.vue";

export default {
  components: {
    Navbar,
    HomePersonList,
    Footer,
  },
  methods: {
    addPerson(data) {
      console.log('Person Added:', data);
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
