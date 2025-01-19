import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import AddPerson from '../pages/AddPerson.vue';
import PersonListPage from '../pages/PersonListPage.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/add-person',
    name: 'AddPerson',
    component: AddPerson,
  },
  {
    path: '/persons',
    name: 'PersonListPage',
    component: PersonListPage,
  },
  {
    path: "/person/:id",
    name: "PersonDetails",
    component: () => import("../components/PersonDetails.vue"),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
