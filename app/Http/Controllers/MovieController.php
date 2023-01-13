<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Poster;
use App\Http\Responses\MovieResponse;
use App\Http\Responses\SearchResponse;
use App\Repositories\MovieRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MovieController extends Controller
{
    protected MovieRepositoryInterface $movieRepository;

    public function __construct(MovieRepositoryInterface $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }

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

        $imdbIDs = array();
        foreach ($responseObj->Search as $searchItem) {
            array_push($imdbIDs, $searchItem->imdbID);
        }
        $dbMoviesMap = $this->movieRepository->getMovies($imdbIDs);

        $responses = array();
        foreach ($responseObj->Search as $searchItem) {
            $dbMovie = $dbMoviesMap[$searchItem->imdbID] ?? null;
            $posterUrl = null;

            if (is_null($dbMovie)) {
                if (!is_null($searchItem->Poster) && $searchItem->Poster != 'N/A') {
                    $posterUrl = $searchItem->Poster;
                }
                $dbMovie = $this->movieRepository->createMovie(
                    $searchItem->Title,
                    $searchItem->Year,
                    $searchItem->Type,
                    $searchItem->imdbID,
                    $posterUrl
                );
            } else if (!is_null($dbMovie->poster)) {
                $posterUrl = $dbMovie->poster->url;
            }

            $movieResponse = new MovieResponse(
                $dbMovie->id,
                $dbMovie->title,
                $dbMovie->year,
                $dbMovie->imdbID,
                $dbMovie->type,
                $posterUrl
            );

            array_push($responses, $movieResponse);
        }

        return response()->json(new SearchResponse($responses, $responseObj->totalResults));
    }
}
