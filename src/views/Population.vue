<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue';
import { useApi } from '../composables/useApi';
import eStatService from '../services/eStatService';

import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);

export default defineComponent({
  name: 'Population',
  components: {
    LineChart,
  },
  setup() {
    const { result, error, loading, callApi } = useApi(eStatService.getPopulation);

    onMounted(() => callApi());

    const years = computed(() => {
      if (!result.value) return [];
      const timeId: number = 3;
      return result.value.CLASS_INF.CLASS_OBJ[timeId].CLASS.map((data: any) => data['@name']);
    });

    type All = 'A1101';
    type Man = 'A110101';
    type Woman = 'A110102';
    type Category = All | Man | Woman;
    const populations = reactive({
      all: [],
      man: [],
      woman: [],
    });

    watch(result, () => {
      for (const value of result.value.DATA_INF.VALUE) {
        const index: Category = value['@cat01'];
        switch (index) {
          case 'A1101':
            populations.all.push(value.$);
            break;
          case 'A110101':
            populations.man.push(value.$);
            break;
          case 'A110102':
            populations.woman.push(value.$);
            break;
        }
      }
    });

    const chartData = computed(
      (): ChartData<'line'> => ({
        labels: years.value,
        datasets: [
          {
            label: 'All',
            data: populations.all,
            backgroundColor: '#b5dd8f',
          },
          {
            label: 'Man',
            data: populations.man,
            backgroundColor: '#77CEFF',
          },
          {
            label: 'Woman',
            data: populations.woman,
            backgroundColor: '#eb887b',
          },
        ],
      })
    );

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData,
    });

    return {
      lineChartProps,
      result,
      loading,
    };
  },
});
</script>

<template>
  <div class="p-2 mb-4 text-green-400 text-2xl font-bold">Population Transition in Japan</div>

  <div>
    <template v-if="loading">
      <p>Loading...</p>
    </template>
    <template v-else-if="result">
      <div class="flex justify-center">
        <div style="width: 800px">
          <LineChart v-bind="lineChartProps"></LineChart>
        </div>
      </div>
    </template>
  </div>
</template>
