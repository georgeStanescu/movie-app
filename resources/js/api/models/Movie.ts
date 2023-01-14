export interface Movie {
    poster: string;
    title: string;
    type: ContentType;
    year: number;
    imdbID: string;
}

export enum ContentType {
    Game = 'game',
    Movie = 'movie'
}
