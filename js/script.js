const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKeyTMDB: 'd806b562e36fc9c3e6d749c6dd837051',
    apiUrlTMDB: 'https://api.themoviedb.org/3/',
    apiUrlJikan: 'https://api.jikan.moe/v4/',
  },
};

// display popular movies
const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"`
                : `<img src="/images/no-image.jpg"`
            }
              class="card-img-top"
              alt="${movie.title}"/>
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
    document.querySelector('#popular-movies').appendChild(div);
  });
  toggleSpinner('hide');
};

// display popular tv shows
const displayPopularShows = async () => {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}"`
                : `<img src="/images/no-image.jpg"`
            }
              class="card-img-top"
              alt="${show.name}"/>
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
  toggleSpinner('hide');
};

// display popular anime
const displayPopularAnime = async () => {
  const { data } = await fetchAPIJikan('top/anime?filter=airing');
  data.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="anime-details.html?id=${show.mal_id}">
            ${
              show.images.jpg.large_image_url
                ? `<img src="${show.images.jpg.large_image_url}"`
                : `<img src="/images/no-image.jpg"`
            }
              class="card-img-top"
              alt="${show.titles[0].title}"/>
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.titles[0].title}</h5>
            <p class="card-text">
              <small class="text-muted">${
                show.titles[show.titles.length - 1].title
              }</small>
            </p>
          </div>`;
    document.querySelector('#popular-anime').appendChild(div);
  });
  toggleSpinner('hide');
};

// display movie details
const displayMovieDetails = async () => {
  // get the id from the url
  const movieID = window.location.search.split('=')[1];
  // fetch with id
  const movie = await fetchAPIData(`movie/${movieID}`);
  // background image
  displayBackgroundImage('movie', movie.backdrop_path);
  // render to dom
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
          <div>
            <img ${
              movie.poster_path
                ? `src="https://image.tmdb.org/t/p/w500${movie.poster_path}"`
                : `src="images/no-image.jpg"`
            }
              class="card-img-top"
              alt="${movie.title}"
            />
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Homepage</a>
            <a href="https://www.imdb.com/title/${
              movie.imdb_id
            }" target="_blank" class="btn">View on IMDb</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutues</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>`;
  document.querySelector('#movie-details').appendChild(div);
  toggleSpinner('hide');
};

// display show details
const displayShowDetails = async () => {
  // get the id from the url
  const showID = window.location.search.split('=')[1];
  // fetch with id
  const show = await fetchAPIData(`tv/${showID}`);
  // background image
  displayBackgroundImage('show', show.backdrop_path);
  // render to dom
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
          <div>
            <img ${
              show.poster_path
                ? `src="https://image.tmdb.org/t/p/w500${show.poster_path}"`
                : `src="images/no-image.jpg"`
            }
              class="card-img-top"
              alt="${show.name}"
            />
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Homepage</a>
            <a href="https://www.themoviedb.org/tv/${
              show.id
            }" target="_blank" class="btn">View on TMDB</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episode to Air:</span> ${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
            <h4>Networks</h4>
          <div class="list-group">${show.networks
            .map((network) => `<span>${network.name}</span>`)
            .join(', ')}</div>
        </div>`;
  document.querySelector('#show-details').appendChild(div);
  toggleSpinner('hide');
};

// display anime details
const displayAnimeDetails = async () => {
  // get the id from the url
  const showID = window.location.search.split('=')[1];
  // fetch with id
  const show = await fetchAPIJikan(`anime/${showID}/full`);
  // background image
  displayBackgroundImage('anime', show.data.trailer.images.maximum_image_url);
  //render to dom
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
          <div>
            <img ${
              show.data.images.jpg.large_image_url
                ? `src="${show.data.images.jpg.large_image_url}"`
                : `src="images/no-image.jpg"`
            }
              class="card-img-top"
              alt="${show.data.titles[0].title}"
            />
          </div>
          <div>
            <h2>${show.data.titles[0].title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.data.score.toFixed(1)} / 10
            </p>
            <p class="text-muted">${show.data.title_english}</p>
            <p>${show.data.synopsis}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.data.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join('')}
            </ul>
            <a href="${
              show.data.url
            }" target="_blank" class="btn">View on MyAnimeList</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${
              show.data.episodes
            }</li>
            <li><span class="text-secondary">Aired from:</span> ${
              show.data.aired.string
            }</li>
            <li><span class="text-secondary">Status:</span> ${
              show.data.status
            }</li>
          </ul>
          <h4>Producers:</h4>
          <div class="list-group">${show.data.producers
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
          <h4>Studios:</h4>
          <div class="list-group">${show.data.studios
            .map((studio) => `<span>${studio.name}</span>`)
            .join(', ')}</div>
        </div>`;
  document.querySelector('#anime-details').appendChild(div);
  toggleSpinner('hide');
};

// display backdrop on detail pages
const displayBackgroundImage = (type, path) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage =
    type === 'anime'
      ? `url(${path})`
      : `url(https://image.tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  type === 'movie' &&
    document.querySelector('#movie-details').appendChild(overlayDiv);
  type === 'tv' &&
    document.querySelector('#show-details').appendChild(overlayDiv);
  type === 'anime' &&
    document.querySelector('#anime-details').appendChild(overlayDiv);
};

// display slider movie
const displaySlider = async () => {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((res) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
        <a href="movie-details.html?id=${res.id}">
            <img src="https://image.tmdb.org/t/p/w500${res.poster_path}" alt="${res.title}" />
        </a>
        <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${res.vote_average} / 10
        </h4>`;

    document.querySelector('.swiper-wrapper').appendChild(div);
  });
  // init the swiper library
  initSwiper();
};

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: false,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

// display search results
const displaySearchResults = (results) => {
  // clear previous state before adding new
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';
  results.forEach((res) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="${global.search.type}-details.html?id=${res.id}">
            ${
              res.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500/${res.poster_path}"`
                : `<img src="/images/no-image.jpg"`
            }
              class="card-img-top"
              alt="${(() => {
                if (global.search.type === 'movie') return res.title;
                if (global.search.type === 'tv') return res.name;
              })()}"/>
          </a>
          <div class="card-body">
            <h5 class="card-title">${(() => {
              // IIFE magic wow
              if (global.search.type === 'movie') return res.title;
              if (global.search.type === 'tv') return res.name;
            })()}</h5>
            <p class="card-text">
              <small class="text-muted">${(() => {
                // even more IIFE magic wow
                if (global.search.type === 'movie')
                  return `Released: ${res.release_date}`;
                if (global.search.type === 'tv')
                  return `Aired: ${res.first_air_date}`;
              })()}</small>
            </p>
          </div>`;
    document.querySelector('#search-results').appendChild(div);
  });
  // display heading info
  document.querySelector(
    '#search-results-heading'
  ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} results for "${global.search.term}"</h2>`;
  displayPagination();
  toggleSpinner('hide');
};

// display anime results
const displayAnimeResults = (results) => {
  // clear previous state before adding new
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';
  results.forEach((res) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="${global.search.type}-details.html?id=${
      res.mal_id
    }">
      ${
        res.images.jpg.large_image_url
          ? `<img src="${res.images.jpg.large_image_url}"`
          : `<img src="/images/no-image.jpg"`
      }
        class="card-img-top"
        alt="${res.title}"/>
    </a>
    <div class="card-body">
      <h5 class="card-title">${res.title}</h5>
      <p class="card-text">
        <small class="text-muted">${res.title_english}</small>
      </p>
    </div>`;
    document.querySelector('#search-results').appendChild(div);
  });
  // display heading info
  document.querySelector(
    '#search-results-heading'
  ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} results for "${global.search.term}"</h2>`;
  displayPagination();
  toggleSpinner('hide');
};

// create and display pagination for search
const displayPagination = () => {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
  document.querySelector('#pagination').appendChild(div);
  // disable prev and next on first and last page
  if (global.search.page === 1) document.querySelector('#prev').disabled = true;
  if (global.search.page === global.search.totalPages)
    document.querySelector('#next').disabled = true;

  // add event listener
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    if (global.search.type === 'anime') {
      const { data } = await searchAPIJikan();
      displayAnimeResults(data);
    } else {
      const { results, total_pages } = await searchAPIData();
      displaySearchResults(results);
    }
  });
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    if (global.search.type === 'anime') {
      const { data } = await searchAPIJikan();
      displayAnimeResults(data);
    } else {
      const { results, total_pages } = await searchAPIData();
      displaySearchResults(results);
    }
  });
};

// on search function
const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term === '' || global.search.term === null) {
    showAlert('Search input is empty, please try again.', 'error');
  } else if (global.search.type === 'anime') {
    const { data, pagination } = await searchAPIJikan();
    // setting global state
    global.search.page = pagination.current_page;
    global.search.totalPages = pagination.last_visible_page;
    global.search.totalResults = pagination.items.total;

    if (data.length === 0) {
      showAlert('No results found, please try again.', 'success');
      toggleSpinner('hide');
      return;
    } else {
      displayAnimeResults(data);
    }
  } else {
    const { results, total_pages, page, total_results } = await searchAPIData();
    // setting global state
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found, please try again.', 'success');
      toggleSpinner('hide');
      return;
    } else {
      displaySearchResults(results);
    }
  }
};

// fetch from tmdb
const fetchAPIData = async (endpoint) => {
  const API_KEY = global.api.apiKeyTMDB;
  const API_URL = global.api.apiUrlTMDB;
  toggleSpinner('show');
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-AU`
  );

  const data = await response.json();

  return data;
};

const fetchAPIJikan = async (endpoint) => {
  const API_URL = global.api.apiUrlJikan;
  toggleSpinner('show');
  const response = await fetch(`${API_URL}${endpoint}`);
  const data = await response.json();
  return data;
};

// search from tmdb
const searchAPIData = async (endpoint) => {
  const API_KEY = global.api.apiKeyTMDB;
  const API_URL = global.api.apiUrlTMDB;
  toggleSpinner('show');
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-AU&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();

  return data;
};

// search from jikan mal
const searchAPIJikan = async (endpont) => {
  const API_URL = global.api.apiUrlJikan;
  toggleSpinner('show');
  const response = await fetch(
    `${API_URL}anime?q=${global.search.term}&order_by=members&sort=desc&page=${global.search.page}`
  );
  const data = await response.json();
  return data;
};

// spinning loading toggle
const toggleSpinner = (state) => {
  state === 'show' && document.querySelector('.spinner').classList.add('show');
  state === 'hide' &&
    document.querySelector('.spinner').classList.remove('show');
};

// highlight active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.getAttribute('href') === global.currentPage &&
      link.classList.add('active');
  });
};

// show alert
const showAlert = (message, className) => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  //hide alert after amount of time
  setTimeout(() => alertEl.remove(), 2000);
};

// init app
const init = () => {
  // multipage router
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/anime.html':
      displayPopularAnime();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/anime-details.html':
      displayAnimeDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
