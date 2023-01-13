<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Poster;
use App\Http\Responses\MovieResponse;
use App\Http\Responses\SearchResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->query('s');

        $response = Http::get('http://www.omdbapi.com', [
            's' => $query,
            'apikey' => '720c3666'
        ]);

        $responseObj = $response->object();

        if ($responseObj->Response != 'True') {
            return response()->json(new SearchResponse([], 0));
        }

        $movies = array();

        foreach ($responseObj->Search as $searchItem) {
            $movie = Movie::firstOrCreate(
                [
                    'imdbID' => $searchItem->imdbID,
                ],
                [
                    'title' => $searchItem->Title,
                    'year' => $searchItem->Year,
                    'type' => $searchItem->Type,
                    'imdbID' => $searchItem->imdbID,
                ]
            );

            $poster = $movie->poster;
            $posterUrl = null;
            if (is_null($poster)) {
                if (!is_null($searchItem->Poster) && $searchItem->Poster != 'N/A') {
                    $posterUrl = $searchItem->Poster;
                    $poster = new Poster([
                        'url' => $posterUrl
                    ]);

                    $movie->poster()->save($poster);
                }
            } else {
                $posterUrl = $poster->url;
            }

            $movieResponse = new MovieResponse(
                $movie->id,
                $movie->title,
                $movie->year,
                $movie->imdbID,
                $movie->type,
                $posterUrl
            );

            array_push($movies, $movieResponse);
        }

        return response()->json(new SearchResponse($movies, $responseObj->totalResults));
    }
}
