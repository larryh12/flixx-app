const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
  },
  api: {
    apiKeyTMDB: 'd806b562e36fc9c3e6d749c6dd837051',
    apiUrlTMDB: 'https://api.themoviedb.org/3/',
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
    toggleSpinner('hide');
  });
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
    toggleSpinner('hide');
  });
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

// display backdrop on detail pages
const displayBackgroundImage = (type, path) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
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

  type === 'movie'
    ? document.querySelector('#movie-details').appendChild(overlayDiv)
    : document.querySelector('#show-details').appendChild(overlayDiv);
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
    // init the swiper library
    initSwiper();
  });
};

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
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
const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term === '' || global.search.term === null) {
    showAlert('Search input is empty, please try again.');
  } else {
    const results = await searchAPIData();
    console.log(results);
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
  setTimeout(() => alertEl.remove(), 3000);
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
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
