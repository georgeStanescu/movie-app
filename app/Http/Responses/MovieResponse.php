<?php

namespace App\Http\Responses;

class MovieResponse
{
    public string $id;
    public string $title;
    public int $year;
    public string $imdbID;
    public string $type;
    public ?string $poster;


    public function __construct(int $id, string $title, int $year, string $imdbID, string $type, ?string $poster)
    {
        $this->id = $id;
        $this->title = $title;
        $this->year = $year;
        $this->imdbID = $imdbID;
        $this->type = $type;
        $this->poster = $poster;
    }
}
