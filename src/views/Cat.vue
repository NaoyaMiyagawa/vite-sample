<script setup lang="ts">
import { ref } from 'vue';
import CatRandom from '@/components/CatRandom.vue';
import CatGallery from '@/components/CatGallery.vue';

type PageType = 'random' | 'gallery' | null;
type Page = { value: PageType; name: string; text: string };

const pages: Page[] = [
  { value: 'random', name: 'cat-random', text: 'Random' },
  { value: 'gallery', name: 'cat-gallery', text: 'Gallery' },
];
const selected = ref<PageType>('random');
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
    <template v-if="selected === 'gallery'">
      <CatGallery />
    </template>
  </div>
</template>

<style></style>
