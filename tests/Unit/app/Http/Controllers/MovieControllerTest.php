<?php

namespace Tests\Unit;

use App\Http\Controllers\MovieController;
use App\Http\Responses\SearchResponse;
use App\Http\Services\HttpServiceInterface;
use App\Repositories\MovieRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;

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
}
