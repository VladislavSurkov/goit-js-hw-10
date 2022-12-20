export function createTemplateItem(element) {
  return element
    .map(
      ({ name, capital, population, flags, languages }) =>
        `
      <img
        src="${flags.svg}" 
        alt="${name.official}" 
        width="120" 
        height="80">
      <h1 class="country-info__title">${name.official}</h1>
      <ul class="country-info__list">
          <li>
          <span>Capital:</span>
        ${capital}
          </li>
          <li>
          <span>Population:</span>
          ${population}
          </li>
          <li>
          <span>Lenguages:</span>
          ${Object.values(languages)}
          </li>
      </ul>
  `
    )
    .join('');
}

export function createTemplateItemList(elements) {
  return elements
    .map(
      ({ name, flags }) => `
      <li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="60" 
          height="40">
        ${name.official}
      </li>`
    )
    .join('');
}
