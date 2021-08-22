import { mount } from '@vue/test-utils';
import LoadingSnipper from '@/components/LoadingSpinner.vue';

describe('LoadingSnipper.vue', () => {
  const wrapper = mount(LoadingSnipper);

  it('visible (default)', () => {
    expect(wrapper.html().includes('Loading...')).toBe(true);
  });

  it('invisible when passing props `isVisible` false', async () => {
    await wrapper.setProps({ isVisible: false });
    expect(wrapper.html().includes('Loading...')).toBe(false);
  });
});
