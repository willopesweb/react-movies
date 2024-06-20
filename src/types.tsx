export const baseImageUrl = "https://media.themoviedb.org/t/p/w220_and_h330_face/";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres?: Array<Genre>;
  id: number;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}