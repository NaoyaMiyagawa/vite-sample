import { mount } from '@vue/test-utils';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

const wrapper = mount(LoadingSpinner);

describe('LoadingSpinner.vue', () => {
  it('visible (default)', () => {
    expect(wrapper.html()).toContain('Loading...');
  });

  it('invisible when passing props `isVisible` false', async () => {
    await wrapper.setProps({ isVisible: false });
    expect(wrapper.html()).not.toContain('Loading...');
  });
});
