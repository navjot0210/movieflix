'use strict';

import movies from './movies.js';

const searchInput = document.querySelector('.search-area');
const button = document.querySelector('.search-button');
const movieDetail = document.querySelector('.movie-detail');
const searchesMatched = document.querySelector('.result-list');

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
  const searchedText = searchInput.value.toLowerCase();
  if (validateSearchedText(searchedText)) {
    printMovies(searchedText);
  } else {
    searchesMatched.innerHTML = '';
  }
}

button.addEventListener('click', () => {
  printSearch();
  searchInput.value = '';
  searchesMatched.value = '';
  searchesMatched.style.display = 'none';
}); 

searchInput.addEventListener('input', printSearch);