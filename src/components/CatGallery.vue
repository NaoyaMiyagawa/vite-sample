<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useApi } from '../composables/useApi';
import { getBreedList, getCategoryList, getImageList } from '../services/catService';
import Multiselect from '@vueform/multiselect';

export default defineComponent({
  name: 'CatGallery',
  components: {
    Multiselect,
  },
  setup() {
    type SelectOption = { label: string; value: number };

    //--------------------------------------------------
    // get cat breed list

    const {
      // query: breedQuery,
      result: breedResult,
      error: breedError,
      loading: breedLoading,
      callApi: breedCallApi,
    } = useApi(getBreedList);

    onMounted(() => breedCallApi());
    const selectedBreed = ref('');
    const breedOptions = computed<SelectOption[]>(() => {
      if (!breedResult.value) return [];
      return Object.values(breedResult.value).map((record) => ({ label: record.name, value: record.id }));
    });

    //--------------------------------------------------
    // get category list

    const {
      // query: categoryQuery,
      result: categoryResult,
      error: categoryError,
      loading: categoryLoading,
      callApi: categoryCallApi,
    } = useApi(getCategoryList);

    onMounted(() => categoryCallApi());
    const selectedCategories = ref<[]>();
    const categoryOptions = computed<SelectOption[]>(() => {
      if (!categoryResult.value) return [];
      return Object.values(categoryResult.value).map((record) => ({ label: record.name, value: record.id }));
    });

    //--------------------------------------------------
    // get images by search

    const {
      query: imageQuery,
      result: imageResult,
      error: imageError,
      loading: imageLoading,
      callApi: imageCallApi,
    } = useApi(getImageList);
    imageQuery.value = {
      size: 'small',
      limit: 24,
    };
    watch(selectedBreed, () => {
      imageQuery.value['breed_ids'] = selectedBreed.value;
    });
    watch(selectedCategories, () => {
      imageQuery.value['category_ids'] = selectedCategories.value?.join(',');
    });
    watch(imageQuery, imageCallApi, { deep: true });
    onMounted(imageCallApi);

    return {
      // Breed
      breedOptions,
      breedLoading,
      selectedBreed,
      // Category
      categoryOptions,
      selectedCategories,
      categoryLoading,
      // Image
      imageResult,
    };
  },
});
</script>

<template>
  <div class="font-bold p-6">🐱 Hello, Cat Gallery 🐱</div>

  <div class="flex mb-6 gap-10 justify-center">
    <div class="flex-inline text-left w-100 gap-4 justify-start">
      <label for=""> Breed </label>
      <Multiselect
        v-model="selectedBreed"
        placeholder="Select Breed"
        :searchable="true"
        :classes="{ search: 'multiselect-search h-full focus:outline-transparent' }"
        :options="breedOptions"
        :loading="breedLoading"
      />
    </div>

    <div class="flex-inline text-left mb-10 w-100 gap-4 justify-start">
      <label for=""> Category </label>
      <Multiselect
        v-model="selectedCategories"
        mode="tags"
        placeholder="Select Categories"
        :searchable="true"
        :classes="{ tagsSearch: 'multiselect-tags-search h-full focus:outline-transparent' }"
        :options="categoryOptions"
        :loading="categoryLoading"
      />
    </div>
  </div>

  <div class="flex flex-wrap gap-10 justify-center">
    <template v-for="data in imageResult" :key="data.id">
      <div>
        <img :src="data.url" alt="" class="h-auto shadow-lg shadow-dark-400 w-300px" />
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@import '@vueform/multiselect/themes/default.css';
</style>
