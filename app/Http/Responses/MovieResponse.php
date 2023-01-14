<?php

namespace App\Http\Responses;

class MovieResponse
{
    public string $title;
    public int $year;
    public string $imdbID;
    public string $type;
    public ?string $poster;


    public function __construct(string $title, int $year, string $imdbID, string $type, ?string $poster)
    {
        $this->title = $title;
        $this->year = $year;
        $this->imdbID = $imdbID;
        $this->type = $type;
        $this->poster = $poster;
    }
}
