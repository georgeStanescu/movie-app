<?php

namespace App\Http\Controllers;

use App\Http\Responses\MovieResponse;
use App\Http\Responses\SearchResponse;
use App\Http\Services\HttpServiceInterface;
use App\Repositories\MovieRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    protected MovieRepositoryInterface $movieRepository;
    protected HttpServiceInterface $httpService;

    public function __construct(
        MovieRepositoryInterface $movieRepository,
        HttpServiceInterface $httpService
    ) {
        $this->movieRepository = $movieRepository;
        $this->httpService = $httpService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
        $query = $request->query('s');
        $emptyResponse = new SearchResponse([], 0);

        if (trim($query) == '') {
            return new JsonResponse($emptyResponse);
        }

        $responseObj = $this->httpService->fetchMovies($query);

        if ($responseObj->Response != 'True') {
            return new JsonResponse($emptyResponse);
        }

        $imdbIDs = [];
        foreach ($responseObj->Search as $searchItem) {
            array_push($imdbIDs, $searchItem->imdbID);
        }
        $dbMoviesMap = $this->movieRepository->getMovies($imdbIDs);

        $responses = [];
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

        return new JsonResponse(new SearchResponse($responses, $responseObj->totalResults));
    }
}
