import { Movie } from './Movie';

export interface SearchResponse {
    movies: Movie[];
    totalResults: number;
}

