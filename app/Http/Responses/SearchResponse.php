<?php

namespace App\Http\Responses;

class SearchResponse
{
    public array $movies;
    public int $totalResults;

    public function __construct(array $movies, int $totalResults)
    {
        $this->movies = $movies;
        $this->totalResults = $totalResults;
    }
}
