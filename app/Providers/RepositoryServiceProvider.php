<?php

namespace App\Providers;

use App\Repositories\MovieRepository;
use App\Repositories\MovieRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(MovieRepositoryInterface::class, MovieRepository::class);
    }
}
