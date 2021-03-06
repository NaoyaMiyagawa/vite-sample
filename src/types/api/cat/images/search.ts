export interface Methods {
  get: {
    query?: Query;

    resBody: Images;
  };
}

//--------------------------------------------------
// Request

export type Query = {
  size?: 'thumb' | 'small' | 'med' | 'full';
  mime_types?: string;
  order?: 'RANDOM' | 'ASC' | 'DESC';
  limit?: number;
  page?: number;
  category_ids?: string;
  breed_id?: string;
  breed_ids?: string;
  format?: 'json' | 'src';
  has_breeds?: boolean;
  include_categories?: boolean;
};

//--------------------------------------------------
// Response

export type Images = Image[];
export interface Image {
  breeds: Breeds;
  height: number;
  id: string;
  url: string;
  width: number;
}

export type Breeds = Breed[];
export interface Breed {
  adaptability: number;
  affection_level: number;
  alt_names?: string;
  cfa_url?: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  image?: Image;
  indoor: number;
  intelligence: number;
  lap?: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id?: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vcahospitals_url?: string;
  vetstreet_url?: string;
  vocalisation: number;
  weight: Weight;
  wikipedia_url?: string;
  bidability?: number;
  cat_friendly?: number;
}

export interface Weight {
  imperial: string;
  metric: string;
}
