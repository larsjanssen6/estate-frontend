const mix = require('laravel-mix');

var tailwindcss = require('tailwindcss');

mix.setPublicPath("./");
mix.js('resources/js/app.js', 'public/js');

mix.sass('resources/css/main.scss', 'public/css').version()
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('./tailwind.js') ],
    });
