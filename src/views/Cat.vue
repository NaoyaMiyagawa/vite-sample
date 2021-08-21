<script lang="ts">
import { defineComponent, ref } from 'vue';
import CatRandom from '../components/CatRandom.vue';

export default defineComponent({
  name: 'Cat',
  components: {
    CatRandom,
  },
  setup() {
    type PageType = 'random' | 'search' | null;
    const pages: { value: PageType; name: string; text: string }[] = [
      { value: 'random', name: 'cat-random', text: 'Random' },
      { value: 'search', name: 'cat-search', text: 'Search' },
    ];
    const selected = ref<PageType>('random');

    return { selected, pages };
  },
});
</script>

<template>
  <div class="rounded-full flex m-auto bg-light-blue-200 py-4 px-10 w-3/4 gap-10 justify-center">
    <template v-for="page in pages" :key="page.value">
      <label :for="page.name">
        {{ page.text }}
        <input type="radio" :name="page.name" :id="page.name" :value="page.value" v-model="selected" />
      </label>
    </template>
  </div>

  <div>
    <template v-if="selected === 'random'">
      <CatRandom />
    </template>
  </div>
</template>

<style></style>
