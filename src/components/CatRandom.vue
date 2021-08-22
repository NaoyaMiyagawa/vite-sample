<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useApi } from '../composables/useApi';
import { loadNextImage } from '../services/catService';

import LoadingSpinner from './LoadingSpinner.vue';

export default defineComponent({
  name: 'CatRandom',
  components: {
    LoadingSpinner,
  },
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
    const clearAutoChange = () => {
      if (!intervalId) return;
      clearInterval(intervalId);
      intervalId = null;
    };
    watch(isAutoChangeEnable, (newVal) => {
      clearAutoChange();
      if (!newVal) return;
      intervalId = setInterval(callApi, 8000);
    });
    onUnmounted(() => {
      clearAutoChange();
    });

    return { imageUrl, error, loading, callApi, isAutoChangeEnable, toggleIsAutoChangeEnable };
  },
});
</script>

<template>
  <div class="p-6 font-bold">🐱 Hello, Cat Page 🐱</div>
  <div class="flex justify-center gap-8 mb-6">
    <button class="px-10 py-2 bg-blue-300 rounded-full shadow-lg shadow-dark-900" @click="callApi">Change Cat</button>

    <button
      class="px-4 rounded-full shadow-lg shadow-dark-800 focus:border-none"
      :class="[isAutoChangeEnable ? 'bg-green-100' : 'bg-light-600']"
      @click="toggleIsAutoChangeEnable"
    >
      {{ isAutoChangeEnable ? 'Turn off Auto-Change' : 'Turn on Auto-Change' }}
    </button>
  </div>

  <transition name="fade" mode="out-in">
    <template v-if="loading">
      <div>
        <p class="p-8">Looking for the best cat for you...</p>
        <LoadingSpinner />
      </div>
    </template>
    <template v-else-if="!error">
      <div class="flex justify-center">
        <img :src="imageUrl" alt="random cat" class="w-130" />
      </div>
    </template>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
