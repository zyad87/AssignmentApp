<template>
  <Navbar />
  <HomePersonList />
  <GuideSteps />
  <Footer />
</template>

<script>
import Footer from "../components/Layout/Footer.vue";
import Navbar from "../components/Layout/Navbar.vue";
import GuideSteps from "../components/UI/GuideSteps.vue";
import HomePersonList from "../components/HomePersonList.vue";

export default {
  components: {
    Navbar,
    HomePersonList,
    GuideSteps,
    Footer,
  },
};
</script>
