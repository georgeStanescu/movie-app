export interface Movie {
    Poster: string;
    Title: string;
    Type: ContentType;
    Year: string;
    imdbID: string;
}

export enum ContentType {
    Game = 'game',
    Movie = 'movie'
}
