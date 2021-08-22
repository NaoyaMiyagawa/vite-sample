import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import NavBar from '@/components/NavBar.vue';
const { wrapper, router } = (() => {
  const dummyComponent: { template: string } = { template: `<div></div>` };
  const routes = [
    { path: '/', name: 'Home', component: dummyComponent },
    { path: '/population', name: 'Population', component: dummyComponent },
    { path: '/cat', name: 'Cat', component: dummyComponent },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  const wrapper = mount(NavBar, {
    global: {
      plugins: [router],
    },
  });

  return { wrapper, router };
})();

describe('NavBar.vue', () => {
  it('current page link is styled bold', async () => {
    await router.push('/');
    await router.isReady();

    const homeLinkWrapper = wrapper.find('a[href="/"]');
    expect(homeLinkWrapper.html()).toContain('Home');
    expect(homeLinkWrapper.classes()).toContain('font-bold');

    const populationLinkWrapper = wrapper.find('a[href="/population"]');
    expect(populationLinkWrapper.html()).toContain('Population');
    expect(populationLinkWrapper.classes()).not.toContain('font-bold');

    const catLinkWrapper = wrapper.find('a[href="/cat"]');
    expect(catLinkWrapper.html()).toContain('Cat');
    expect(catLinkWrapper.classes()).not.toContain('font-bold');
  });
});
