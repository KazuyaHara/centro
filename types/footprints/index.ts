export type Footprint = {
  addressComponents: Array<{ longName: string; order: number; shortName: string; types: string[] }>;
  count: number;
  placeId: string;
  types: string[];
};
