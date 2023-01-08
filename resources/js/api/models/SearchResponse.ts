import { Movie } from './Movie';

export interface SearchResponse {
    Response: boolean;
    Search: Movie[];
    totalResults: number;
}

