# FLIXX

![og](docs/_og.png)

---

An interactive web app for trending Movie, TV Show, and Anime info from TheMovieDB and MyAnimeList.

Built with:

- Vanilla HTML, CSS, JavaScript
- [TMDB API v3](https://developers.themoviedb.org/3)
- [Jikan API v4](https://docs.api.jikan.moe/)

## Features

### Display Popular Titles

For **Movies** and **TV Shows** titles, the app fetches [popular movies](https://www.themoviedb.org/movie) and [popular shows](https://www.themoviedb.org/tv) from `TMDB API` and displays the title `poster`, `name`, `rating`, and `release date` to the main UI.

<img src='docs/display-movie.png' style='width:800px'/>

For **Anime** titles, the app fetches [MAL top airing anime](https://myanimelist.net/topanime.php?type=airing) from `Jikan API`.

<img src='docs/display-anime.png' style='width:800px'/>

<details>
<summary>Demo</summary>
<img src='docs/display-popular.webp'/>
</details>

### Display Title Details

The app displays each title details in a dynamic `{title}-details.html` page that is routed via a multipage `router`. The page content is dynamically rendered based on the endpoint `type[movie,tv,anime]` and the `title.id`.

For **Movie** details, the page displays box office info such as `budget`, `revenue`, `runtime`, _etc._

<img src='docs/movie-details.png' style='width:800px'/>

<details>
<summary>Demo</summary>
<img src='docs/movie-details.webp'/>
</details>

For **TV** and **Anime** details, the page displays airing info such as `episode count`, `air date`, `networks`, `producers`, `studios`, _etc._

<img src='docs/anime-details.png' style='width:800px'/>

<details>
<summary>Demo</summary>
<img src='docs/anime-details.webp'/>
</details>

### Search

The app provides a search function that accepts user input `term` and endpoint `type[movie,tv,anime]`.

Search results are dynamically rendered on `search.html` page with dedicated `display`, `error handling`, and `pagination` functions.

<img src='docs/search.webp'/>

## Extras

### Search Pagination

For **Movies** and **TV**, displays 20 per page. For **Anime**, displays 25 per page.

<img src='docs/pagination-movie.png' style='width:800px'/>

<img src='docs/pagination-anime.png' style='width:800px'/>

### Hero Section Animation

Hero section displays [TMDB Now Playing Movie](https://www.themoviedb.org/movie/now-playing) titles in an animated slider using [Swiper](https://swiperjs.com/) library.

<img src='docs/slider.webp'/>

### Responsiveness

<img src='docs/responsive.webp'/>

### Styling

- [Font Awesome library](https://fontawesome.com/)
- [Spinner CodePen](https://codepen.io/tbrownvisuals/pen/edGYvx)

### Troubleshooting

#### English title search not accurate for anime

[MAL](https://myanimelist.net/) use [romaji](https://en.wikipedia.org/wiki/Romanization_of_Japanese) _(Romanised Japanese)_ names for most of their anime entries as `default title`. Thus leads to the fact that `Jikan API` [getAnimeSearch](https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch) only returns relevant results if searched with **romanji** title name.

<details>
<summary>For example:</summary>

- Search results for "attack on titan"
  <img src='docs/search-1.png' style='width:600px'/>

- Search results for "shingeki no kyojin"
  <img src='docs/search-2.png' style='width:600px'/>

</details>

#### Anime category crashed / lagged / slowed

The app uses the free and open-source [Jikan public API](https://docs.api.jikan.moe/) to fetch anime data. Thus, it can only operate within [Jikan Rate Limit](https://docs.api.jikan.moe/#section/Information). So if you run into problems, please be patient and try again after some time.

<br/>

---

<details>
<summary>Credits</summary>

- [Traversy JS course](https://www.traversymedia.com/modern-javascript-2-0)
- [@bradtraversy GitHub source](https://github.com/bradtraversy/flixx-app)

</details>
