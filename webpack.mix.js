const mix = require('laravel-mix');

var tailwindcss = require('tailwindcss');


mix.js('resources/js/app.js', 'public/js');

mix.postCss('resources/css/main.css', 'public/css', [
    tailwindcss('./tailwind.js'),
]);