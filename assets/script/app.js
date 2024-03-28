'use strict';

import movies from './movies.js';

const searchInput = document.querySelector('.search-area');
const button = document.querySelector('.search-button');
const movieDetail = document.querySelector('.movie-detail');
const searchesMatched = document.querySelector('.movie-list');

function validateSearchedText(text) {
  return text.length > 2;
}

function findMovie(text) {
  return movies.filter(movie => {
    const title = movie.title.toLowerCase();
    return title.includes(text);
  });
}

function displayMovies(matchedMovies) {
  searchesMatched.innerHTML = '';
  
  if (matchedMovies.length > 0) {
    getMatchedMovies(matchedMovies);
  } else {
    notFound();
  }
}

function getMatchedMovies(matchedMovies) {
  const fivematchedMovies = matchedMovies.slice(0, 5);
  const ul = document.createElement('ul');

  fivematchedMovies.forEach(movie => {
    const li = document.createElement('li');
    li.textContent = movie.title;
    li.addEventListener('click', function() {
      searchInput.value = movie.title;
      printMovies(movie.title);
      searchesMatched.innerHTML = '';
    });
    ul.appendChild(li);
  });

  searchesMatched.appendChild(ul);
  searchesMatched.value = '';
}

function notFound() {
  searchesMatched.innerHTML = '<li>Movie not found</li>';
  const notFoundListItem = searchesMatched.querySelector('li');
  if (notFoundListItem) {
    notFoundListItem.classList.add('disabled');
    button.disabled = true;
  }
}

function printMovies(text) {
  const matchedMovies = findMovie(text.toLowerCase());
  displayMovies(matchedMovies);
}

function printSearch() {
  const text = searchInput.value.trim().toLowerCase();
  if (validateSearchedText(text)) {           
    searchesMatched.style.display = 'block';  
    printMovies(text);
    button.disabled = false;
  } else {
    searchesMatched.innerHTML = '';
    searchesMatched.style.display = 'none';
  }
}

function fetchMovieDetail() {
  const text = searchInput.value.toLowerCase();
  const matchedMovies = findMovie(text);
  if (matchedMovies.length > 0) {
    movieDetail.innerHTML = '';
    matchedMovies.forEach(movie => {
      const movieHTML = displayMovieInfo(movie);
      movieDetail.innerHTML += movieHTML;
    });
  } else {
    movieDetail.innerHTML = ''; 
  }
}

function displayMovieInfo(movie) {
  return `
      <div class="poster">
        <div class="poster-img">
        <img src="${movie.poster}" class="movie-poster" alt="${movie.title}">
        </div>
        <aside class="poster-text">
          <h2 class="movie-title">${movie.title}</h2>
          <div class="time">
            <p class="release-year">${movie.year}</p>
            <p class="run-time">${movie.runningTime}</p>
          </div>
          <p class="movie-text">${movie.description}</p>
          <p class="movie-genre">${movie.genre.join('    ')}</p>
        </aside>
      </div>
  `;
}

button.addEventListener('click', () => {
  fetchMovieDetail();
  searchInput.value = '';
  searchesMatched.style.display = 'none';
  searchesMatched.innerHTML = '';          
});

searchInput.addEventListener('input', () => {
  printSearch();
});