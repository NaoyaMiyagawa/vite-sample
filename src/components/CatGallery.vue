<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useApi } from '../composables/useApi';
// import { getBreedList } from '../services/catService';
import { getBreedList } from '../services/catService';

export default defineComponent({
  name: 'CatGallery',
  setup() {
    //--------------------------------------------------
    // get cat breed list

    const { result, error, loading, callApi } = useApi(getBreedList);
    onMounted(() => callApi());
    return { result };
  },
});
</script>

<template>
  <div class="font-bold p-6">🐱 Hello, Cat Gallery 🐱</div>
  <div class="flex mb-6 gap-8 justify-center">
    <p>
      {{ result }}
    </p>
  </div>
</template>

<style></style>
