import axios from 'axios';
import { Root, StatisticalData } from '../e-stat';

const APP_ID = 'f929b439cb68b826d0defb719bb4bb8694b29fdc';
const QUERY_PARAM_APP_ID = `appId=${APP_ID}`;

const apiClient = axios.create({
  baseURL: `http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?${QUERY_PARAM_APP_ID}&`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  async getPopulation(): Promise<StatisticalData> {
    const defaultQueryParams: {
      [key: string]: string | string[];
      cdCat01: string[];
    } = {
      cdArea: '00000',
      cdCat01: ['A1101', 'A110101', 'A110102'],
      lang: 'J',
      statsDataId: '0000010101',
      others: 'metaGetFlg=Y&cntGetFlg=N&explanationGetFlg=Y&annotationGetFlg=Y&sectionHeaderFlg=1&replaceSpChars=0',
    };

    let queryParams: string[] = [];
    for (const key in defaultQueryParams) {
      if (key === 'others') {
        const param: string = `${key}=${defaultQueryParams[key]}`;
        queryParams.push(param);
        continue;
      }

      if (key === 'cdCat01') {
        const param: string = `${key}=${defaultQueryParams.cdCat01.join(',')}`;
        queryParams.push(param);
        continue;
      }

      const param: string = `${key}=${defaultQueryParams[key]}`;
      queryParams.push(param);
    }
    const query = queryParams.join('&');

    const res: Root = (await apiClient.get(query)).data;

    return res.GET_STATS_DATA.STATISTICAL_DATA;
  },
};
