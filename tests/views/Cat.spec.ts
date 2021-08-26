import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import Cat from '@/views/Cat.vue';
import CatRandom from '@/components/CatRandom.vue';
import CatGallery from '@/components/CatGallery.vue';

const wrapper = mount(Cat, {
  global: {
    stubs: {
      CatRandom: true,
      CatGallery: true,
    },
  },
});

describe('Cat.vue', () => {
  // await flushPromises();

  it('always true', () => {
    expect(1).toBe(1);
  });

  // it('when "random" is selected, show CatRandom component', () => {
  //   // expect;
  // });

  // it('when "gallery" is selected, show CatGallery component', () => {
  //   expect(1).toBe(1);
  // });
});
