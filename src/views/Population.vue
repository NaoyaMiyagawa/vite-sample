<script lang="ts">
import { watch, reactive, ref, defineComponent, toRefs } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const result = ref<null | []>(null);
    const status = ref<null | Number>(null);
    const message = ref<String>('');
    interface population {
      year: Number;
      people: Number;
      category: String | null;
      unit: String;
    }
    const populations = ref<Array<population | null>>([]);

    const apiCall = () => {
      const appId = 'f929b439cb68b826d0defb719bb4bb8694b29fdc';
      const apiBaseUrl =
        'http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData';
      const query = `cdArea=00000&cdCat01=A1101&lang=J&statsDataId=0000010101&metaGetFlg=Y&cntGetFlg=N&explanationGetFlg=Y&annotationGetFlg=Y&sectionHeaderFlg=1&replaceSpChars=0`;
      const queryAppId = `&appId=${appId}`;
      const api = `${apiBaseUrl}?${query}${queryAppId}`;
      axios
        .get(api)
        .then((response) => {
          const data = response.data.GET_STATS_DATA;
          status.value = data.RESULT.STATUS;
          message.value = data.RESULT.STATUS.ERROR_MSG;
          result.value = data.STATISTICAL_DATA.DATA_INF.VALUE;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    watch(result, () => {
      if (result.value === null) {
        return [];
      }

      populations.value = result.value.map((data) => {
        return {
          year: data['@time'].slice(0, 4),
          category: data['@cat01'],
          unit: data['@unit'],
          people: data.$,
        };
      });
    });

    return {
      result,
      status,
      message,
      populations,
      apiCall,
      num2ja,
    };
  },
});

const num2ja = (num) => {
  const keta = ['', '千', '万', '億', '兆'];

  let jaNum = '';
  let count = 0;

  num = String(num).replace(',', '');

  // 千
  if (num.length <= 3) {
    return num;
  } else {
    const n = num.slice(-3) - 0 + '';
    jaNum = [n !== '0' ? `${n}${keta[count]}` : '', jaNum].join('');
    num = ((num / 1000) | 0) + '';
    count++;
  }
  // 万
  if (num.length > 1) {
    const n = num.slice(-1) - 0 + '';
    jaNum = [n !== '0' ? `${n}${keta[count]}` : '', jaNum].join('');
    num = ((num / 10) | 0) + '';
    count++;
  }
  // それ以降
  while (num.length > 4) {
    const n = num.slice(-4) - 0 + '';
    jaNum = [n !== '0' ? `${n}${keta[count]}` : '', jaNum].join('');
    num = ((num / 10000) | 0) + '';
    count++;
  }
  jaNum = [num !== '0' ? `${num}${keta[count]}` : '', jaNum].join('');
  return jaNum;
};
</script>

<template>
  <div class="p-4">Population Statistics</div>
  <div>
    <div>
      <button class="p-4 bg-yellow-500" @click="apiCall">API CALL</button>
    </div>

    <div>
      <div>
        {{ status === 0 ? message : '' }}
      </div>
      <div>
        <ul>
          <template v-for="population in populations" :key="population.year">
            <li>
              {{ population.year }}:
              {{ `${num2ja(population.people)} ${population.unit}` }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
