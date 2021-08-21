<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useApi } from '../composables/useApi';
import { loadNextImage } from '../services/catService';

export default defineComponent({
  name: 'Cat',
  setup() {
    //--------------------------------------------------
    // get and set new image

    const { result, error, loading, callApi } = useApi(loadNextImage);
    onMounted(() => callApi());
    const imageUrl = ref<string>('');
    watch(result, () => {
      if (result.value && 'url' in result.value) {
        imageUrl.value = result.value.url;
      }
    });

    //--------------------------------------------------
    // auto-changing image

    const isAutoChangeEnable = ref(false);
    const toggleIsAutoChangeEnable = () => {
      isAutoChangeEnable.value = !isAutoChangeEnable.value;
    };
    let intervalId: number | null = null;
    watch(isAutoChangeEnable, (newVal) => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (newVal) {
        intervalId = setInterval(callApi, 8000);
      }
    });

    return { imageUrl, error, loading, callApi, isAutoChangeEnable, toggleIsAutoChangeEnable };
  },
});
</script>

<template>
  <div class="font-bolds p-6">🐱 Hello, Cat Page 🐱</div>
  <div class="flex mb-6 gap-8 justify-center">
    <button class="rounded-full bg-blue-300 shadow-lg py-2 px-10 shadow-dark-900" @click="callApi">Change Cat</button>

    <button
      class="rounded-full shadow-lg px-4 shadow-dark-800 focus:border-none"
      :class="[isAutoChangeEnable ? 'bg-green-100' : 'bg-light-600']"
      @click="toggleIsAutoChangeEnable"
    >
      {{ isAutoChangeEnable ? 'Turn off Auto-Change' : 'Turn on Auto-Change' }}
    </button>
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
