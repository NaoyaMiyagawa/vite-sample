<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    type Route = { to: string; name: string };
    const routes = ref<Route[]>([
      { to: '/', name: 'Home' },
      { to: '/population', name: 'Population' },
      { to: '/cat', name: 'Cat' },
    ]);
    const isCurrent = (path: string) => {
      return route.path === path;
    };

    return { route, routes, isCurrent };
  },
});
</script>

<template>
  <nav class="p-3 mb-5 bg-blue-400 text-teal-50 flex justify-center">
    <div class="max-w-screen-sm">
      <template v-for="route in routes">
        <router-link
          :to="route.to"
          class="px-10 py-3 hover:(text-blue-700 bg-light-blue-400)"
          :class="{ 'text-light-blue-300 font-bold': isCurrent(route.to) }"
        >
          {{ route.name }}
        </router-link>
      </template>
    </div>
  </nav>
</template>
