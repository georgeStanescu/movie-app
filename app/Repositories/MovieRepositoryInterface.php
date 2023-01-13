<?php

namespace App\Repositories;

use App\Models\Movie;

interface MovieRepositoryInterface
{
    function getMovies(array $imdbIDs): array;
    function createMovie(string $title, int $year, string $type, string $imdbID, ?string $posterUrl): Movie;
}
