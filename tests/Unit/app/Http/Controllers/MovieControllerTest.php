<?php

namespace Tests\Unit;

use App\Http\Controllers\MovieController;
use App\Http\Responses\SearchResponse;
use App\Http\Services\HttpServiceInterface;
use App\Models\Movie;
use App\Repositories\MovieRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class MovieControllerTest extends TestCase
{

    public function test_indexAction_shouldReturnEmptySearchResponse_whenTheSearchTermIsEmptyString()
    {
        $movieRepoMock = Mockery::mock(MovieRepositoryInterface::class);
        $httpServiceMock = Mockery::mock(HttpServiceInterface::class);

        $controller = new MovieController($movieRepoMock, $httpServiceMock);

        $req = Request::create('', 'GET', ['s' => ' ']);

        $response = $controller->index($req);

        $this->assertInstanceOf(JsonResponse::class, $response);

        $searchResponse = $response->original;
        $this->assertInstanceOf(SearchResponse::class, $searchResponse);
        $movies = $searchResponse->movies;

        $this->assertIsArray($movies);
        $this->assertEmpty($movies);
    }

    public function test_indexAction_shouldReturnEmptySearchResponse_whenTheExternalApiReturnsFalseResponse()
    {
        $movieRepoMock = Mockery::mock(MovieRepositoryInterface::class);
        $httpServiceMock = Mockery::mock(HttpServiceInterface::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('fetchMovies')
                ->once()
                ->andReturn((object)['Response' => 'False']);
        });

        $controller = new MovieController($movieRepoMock, $httpServiceMock);

        $req = Request::create('', 'GET', ['s' => 'term']);

        $response = $controller->index($req);

        $this->assertInstanceOf(JsonResponse::class, $response);

        $searchResponse = $response->original;
        $this->assertInstanceOf(SearchResponse::class, $searchResponse);
        $movies = $searchResponse->movies;

        $this->assertIsArray($movies);
        $this->assertEmpty($movies);
    }

    public function test_indexAction_shouldExpectedMovies_whenAlreadyStoredInDatabase()
    {
        $httpServiceMock = Mockery::mock(HttpServiceInterface::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('fetchMovies')
                ->once()
                ->andReturn((object)[
                    'Response' => 'True',
                    'Search' => [
                        (object)['imdbID' => "id1"],
                    ],
                    'totalResults' => 1
                ]);
        });
        $movieRepoMock = Mockery::mock(MovieRepositoryInterface::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('getMovies')
                ->once()
                ->andReturn([
                    'id1' => new Movie([
                        'imdbID' => "id1",
                        'title' => "Movie One",
                        'year' => 1999,
                        'type' => "movie",
                        'poster' => null
                    ]),
                ]);
        });

        $controller = new MovieController($movieRepoMock, $httpServiceMock);

        $req = Request::create('', 'GET', ['s' => 'term']);

        $response = $controller->index($req);

        $searchResponse = $response->original;
        $movies = $searchResponse->movies;

        $this->assertIsArray($movies);
        $this->assertCount(1, $movies);
    }
}
