const global = {
  currentPage: window.location.pathname,
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

// fetch from tmdb
const fetchAPIData = async (endpoint) => {
  const API_KEY = 'd806b562e36fc9c3e6d749c6dd837051';
  const API_URL = 'https://api.themoviedb.org/3/';
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

// init app
const init = () => {
  // multipage router
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
