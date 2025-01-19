import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: {
        template: '<div>Home Page</div>',
      },
    },
  ],
});

describe('App.vue', () => {
  it('renders properly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router], 
      },
    });

    await router.isReady();

    expect(wrapper.text()).toContain('Home Page');
  });
});
