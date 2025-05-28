export interface Photo {
  id: number;
  src: {
    original: string;
    medium: string;
  };
  photographer: string;
  alt: string;
}

export interface PexelsResponse {
  photos: Photo[];
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
} 