import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import {createTemplateItem,createTemplateItemList} from './js/markupTemplate';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputSearchBox: document.querySelector('#search-box'),
  countyList: document.querySelector('.country-list'),
  countyInfo: document.querySelector('.country-info'),
};

refs.inputSearchBox.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(e) {
  const countryName = e.target.value.trim();

  if (!countryName) {
    clearTemplate();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearTemplate();
        return;
      }
      renderTemplate(data);
    })
    .catch(error => {
      Notify.failure(`Oops, there is no country with that name`);
      clearTemplate();
    });
}

function renderTemplate(e) {
  let countryTemplate = '';
  let countryRefsTemplate = '';
  clearTemplate();

  if (e.length === 1) {
    countryTemplate = createTemplateItem(e);
    countryRefsTemplate = refs.countyInfo;
  } else {
    countryTemplate = createTemplateItemList(e);
    countryRefsTemplate = refs.countyList;
  }

  countryRefsTemplate.innerHTML = countryTemplate
}

function clearTemplate() {
  refs.countyInfo.innerHTML = '';
  refs.countyList.innerHTML = '';
}
