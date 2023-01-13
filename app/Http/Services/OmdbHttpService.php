<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

class OmdbHttpService implements HttpServiceInterface
{
    function fetchMovies(string $query)
    {
        $response = Http::get('http://www.omdbapi.com', [
            's' => $query,
            'apikey' => '720c3666'
        ]);

        return $response->object();
    }
}
