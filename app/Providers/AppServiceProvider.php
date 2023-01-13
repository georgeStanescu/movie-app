<?php

namespace App\Providers;

use App\Http\Services\HttpServiceInterface;
use App\Http\Services\OmdbHttpService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(HttpServiceInterface::class, OmdbHttpService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
