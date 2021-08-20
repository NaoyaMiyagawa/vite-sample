export interface Root {
  GET_STATS_DATA: GetStatsData;
}

export interface GetStatsData {
  RESULT: Result;
  PARAMETER: Parameter;
  STATISTICAL_DATA: StatisticalData;
}

export interface Result {
  STATUS: number;
  ERROR_MSG: string;
  DATE: string;
}

export interface Parameter {
  LANG: string;
  STATS_DATA_ID: string;
  NARROWING_COND: NarrowingCond;
  DATA_FORMAT: string;
  START_POSITION: number;
  METAGET_FLG: string;
  EXPLANATION_GET_FLG: string;
  ANNOTATION_GET_FLG: string;
  REPLACE_SP_CHARS: number;
  CNT_GET_FLG: string;
  SECTION_HEADER_FLG: number;
}

export interface NarrowingCond {
  CODE_CAT01_SELECT: string;
  CODE_AREA_SELECT: string;
}

export interface StatisticalData {
  RESULT_INF: ResultInf;
  TABLE_INF: TableInf;
  CLASS_INF: ClassInf;
  DATA_INF: DataInf;
}

export interface ResultInf {
  TOTAL_NUMBER: number;
  FROM_NUMBER: number;
  TO_NUMBER: number;
}

export interface TableInf {
  '@id': string;
  STAT_NAME: StatName;
  GOV_ORG: GovOrg;
  STATISTICS_NAME: string;
  TITLE: Title;
  CYCLE: string;
  SURVEY_DATE: number;
  OPEN_DATE: string;
  SMALL_AREA: number;
  COLLECT_AREA: string;
  MAIN_CATEGORY: MainCategory;
  SUB_CATEGORY: SubCategory;
  OVERALL_TOTAL_NUMBER: number;
  UPDATED_DATE: string;
  STATISTICS_NAME_SPEC: StatisticsNameSpec;
  DESCRIPTION: Description;
  TITLE_SPEC: TitleSpec;
}

export interface StatName {
  '@code': string;
  $: string;
}

export interface GovOrg {
  '@code': string;
  $: string;
}

export interface Title {
  '@no': string;
  $: string;
}

export interface MainCategory {
  '@code': string;
  $: string;
}

export interface SubCategory {
  '@code': string;
  $: string;
}

export interface StatisticsNameSpec {
  TABULATION_CATEGORY: string;
  TABULATION_SUB_CATEGORY1: string;
}

export interface Description {
  TABULATION_CATEGORY_EXPLANATION: string;
}

export interface TitleSpec {
  TABLE_NAME: string;
}

export interface ClassInf {
  CLASS_OBJ: ClassObj[];
}

export interface ClassObj {
  '@id': string;
  '@name': string;
  CLASS: any;
}

export interface DataInf {
  NOTE: Note[];
  VALUE: Value[];
}

export interface Note {
  '@char': string;
  $: string;
}

export interface Value {
  '@tab': string;
  '@cat01': string;
  '@area': string;
  '@time': string;
  '@unit': string;
  $: string;
}
