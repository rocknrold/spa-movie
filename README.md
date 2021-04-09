initial setup commands:

<p>composer update</p>
<p>php artisan migrate</p>
<p>php artisan db:seed</p>
<p>php artisan passport:install --force</p>
<p>php artisan passport:keys --force</p>

additional for image feature:
//this will resolve 404 not found for image path

<p>php artisan storage:link</p>
//this will create a symbolic link to the public directory
