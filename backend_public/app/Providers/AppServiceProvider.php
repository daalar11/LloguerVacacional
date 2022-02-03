<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema; //Importam per arreglar l'error (Info mes abaix)
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
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //Aquesta linia ha estat afegida per arreglar un error
        //Error -> PDOException::("SQLSTATE[HY000]: General error: 1709 Index column size too large. The maximum column size is 767 bytes.")
        //URL info -> https://laravel-news.com/laravel-5-4-key-too-long-error
        Schema::defaultStringLength(191);
    }
}
