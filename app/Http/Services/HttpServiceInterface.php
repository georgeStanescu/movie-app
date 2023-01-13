<?php

namespace App\Http\Services;

interface HttpServiceInterface
{
    function fetchMovies(string $query);
}
