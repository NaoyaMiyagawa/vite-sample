<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useApi } from '../composables/useApi';
import catService from '../services/catService';

export default defineComponent({
  name: 'Cat',
  setup() {
    const imageUrl = ref<string>('');
    const { result, error, loading, callApi } = useApi(catService.loadNextImage);
    onMounted(() => callApi());

    watch(result, () => {
      imageUrl.value = result.value.url;
    });

    return { imageUrl, error, loading, callApi };
  },
});
</script>

<template>
  <div class="mb-4 font-bolds">🐱 Hello, Cat Page 🐱</div>
  <div class="mb-4">
    <button class="bg-blue-300 px-4 py-2 shadow-lg shadow-dark-800 rounded-full" @click="callApi">Change Cat</button>
  </div>

  <template v-if="loading">
    <p class="p-8">Looking for the best cat for you...</p>
  </template>
  <template v-else-if="!error">
    <div class="flex justify-center">
      <img :src="imageUrl" alt="randome cat" class="w-130" />
    </div>
  </template>
</template>

<style></style>
