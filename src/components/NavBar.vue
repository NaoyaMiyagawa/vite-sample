<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

type Route = { to: string; name: string };

const routes = ref<Route[]>([
  { to: '/', name: 'Home' },
  { to: '/population', name: 'Population' },
  { to: '/cat', name: 'Cat' },
]);

const isCurrent = (to: string): boolean => {
  return route.path === to;
};
</script>

<template>
  <nav class="flex bg-blue-400 mb-5 p-3 text-teal-50 justify-center">
    <div class="max-w-screen-sm">
      <template v-for="route in routes">
        <router-link
          :to="route.to"
          class="py-3 px-10 hover:(text-blue-700 bg-light-blue-400) "
          :class="{ 'text-light-blue-300 font-bold': isCurrent(route.to) }"
        >
          {{ route.name }}
        </router-link>
      </template>
    </div>
  </nav>
</template>
