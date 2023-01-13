<?php

namespace App\Repositories;

use App\Models\Movie;
use App\Models\Poster;

class MovieRepository implements MovieRepositoryInterface
{
    public function getMovies(array $imdbIDs): array
    {
        $dbMoviesMap = [];
        $dbMovies = Movie::whereIn('imdbID', $imdbIDs)->get();
        foreach ($dbMovies as $item) {
            $dbMoviesMap[$item->imdbID] = $item;
        }

        return $dbMoviesMap;
    }

    public function createMovie(string $title, int $year, string $type, string $imdbID, ?string $posterUrl): Movie
    {
        $dbMovie = Movie::create(
            [
                'title' => $title,
                'year' => $year,
                'type' => $type,
                'imdbID' => $imdbID,
            ]
        );

        if (!is_null($posterUrl)) {
            $poster = new Poster([
                'url' => $posterUrl
            ]);

            $dbMovie->poster()->save($poster);
        }

        return $dbMovie;
    }
}
