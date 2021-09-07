import { refs } from './refs';
import fetchCountries from './fetchCountries';
import countriesCard from '../templates/countriesCard.hbs';
import countriesList from '../templates/countriesList.hbs';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

refs.input.addEventListener('input', debounce(searchCountry, 500));

function searchCountry() {
  clearInput();
  const searchQuery = refs.input.value.trim();
  fetchCountries(searchQuery)
    .then(country => {
      if (country.length > 10) {
        error({
          text: 'Too many matches! Please, type a more specific query!',
        });
      } else if (country.status === 404) {
        console.log(country.status);
        error({
          text: 'There is no such country! Please, type a more specific query!',
        });
      } else if (country.length === 1) {
        renderCard(country);
      } else if (country.length <= 10) {
        renderList(country);
      }
    })
    .catch(fetchError);
}
function renderCard(country) {
  const markup = countriesCard(country);
  refs.countryCardMarkup.innerHTML = markup;
}

function renderList(country) {
  const listMarkup = countriesList(country);
  refs.listMarkup.insertAdjacentHTML('beforeend', listMarkup);
}

function clearInput() {
  refs.listMarkup.innerHTML = '';
  refs.countryCardMarkup.innerHTML = '';
}

function fetchError(Error) {
  Error;
}
