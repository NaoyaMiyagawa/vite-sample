import { ref } from 'vue';

export function useApi(getResults: any) {
  const query = ref<string>('');
  const options = ref<object>({});
  const result = ref<object | null>(null);
  const error = ref<boolean>(false);
  const loading = ref<boolean>(false);

  const callApi = async () => {
    error.value = false;
    loading.value = true;

    try {
      result.value = await getResults({ query: query.value, options: options.value });
    } catch {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  return { query, result, error, loading, callApi };
}