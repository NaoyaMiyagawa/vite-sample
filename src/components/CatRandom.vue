<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useApi } from '../composables/useApi';
import { loadNextImage } from '../services/catService';

import LoadingSpinner from './LoadingSpinner.vue';

//--------------------------------------------------
// get and set new image

const { result, error, loading, callApi } = useApi(loadNextImage);
const imageUrl = ref<string>('');
onMounted(callApi);
watchEffect(() => {
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
(() => {
  let intervalId: number | null = null;
  const clearAutoChange = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  };
  watchEffect(() => {
    clearAutoChange();
    if (!isAutoChangeEnable.value) return;
    intervalId = setInterval(callApi, 8000);
  });
  onUnmounted(clearAutoChange);
})();
</script>

<template>
  <div class="font-bold p-6">🐱 Hello, Cat Page 🐱</div>
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
