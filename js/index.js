//***NOTE git push -u countries master - not origin***//

// DOM elements
const inputField = document.querySelector('#input');
const actions = document.querySelector('.actions');
const sortByNameButton = document.querySelector('#name');
const sortByCapitalButton = document.querySelector('#capital');
const sortByPopulationButton = document.querySelector('#population');
const countriesTotal = document.querySelector('.total-countries');
let countriesContainer = document.querySelector('.countries-container');
let chartContainer = document.querySelector('.chart-container');

/* ShowCountries() function */
const showCountries = (arr) => {
  arr.forEach((country) => {
    let {
      name,
      capital,
      languages,
      flag,
      population
    } = country
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country');
    countryDiv.innerHTML += `<div><img src="${flag}"/></div>`;
    countryDiv.innerHTML += `<h1>${name}</h1>`;
    countryDiv.innerHTML += `<p><span>Capital: <b>${capital}</b></p>`;
    countryDiv.innerHTML += `<p>Languages: <b>${languages.join(', ')}</b></p>`;
    countryDiv.innerHTML += `<p>Population: <b>${population.toLocaleString()}</b></h1>`;
    Object.assign(countryDiv.style, {
      color: 'red',
      fontWeight: '500',
      backgroundColor: `rgba(255, 255, 255, 0.7)`
    });
    countriesContainer.appendChild(countryDiv);
  })
  // Get the total number of countries and style it - default
  const message = document.querySelector('.message')
  message.innerHTML = arr.length > 1 ? `There are <span class="amount">${arr.length}</span> countries on this
  list.`: `There is only <span class="amount">${arr.length}</span> country on this
  list.`;
  const amount = document.querySelector('.amount')
  amount.style.fontWeight = '700';
}
showCountries(countries)

let [
  name,
  capital,
  languages,
  population,
  currency
] = countries

/*=== sortCountriesByName() function ===*/
const filterCountriesBySearchTerm = (arr, searchTerm) => {
  let filtered = arr.filter((country) => {
    let {
      name,
      capital,
      languages
    } = country
    let match = name.toLowerCase().includes(searchTerm.toLowerCase()) || capital.toLowerCase().includes(searchTerm.toLowerCase()) || languages.join(',').toLowerCase().includes(searchTerm.toLowerCase())
    return match
  })
  // console.log(filtered);
  let result = searchTerm == '' ? arr : filtered
  return result;
}

/*=== EVENT LISTENERS ===*/

// get the clicked button siblings

/* ButtonChanger() */
const buttonSiblings = n => [...n.parentElement.children].filter(currentButton => currentButton.nodeType === 1 && currentButton != n)

/*=== An event listener for sort by name button ===*/
inputField.addEventListener('input', (e) => {
  countriesContainer.innerHTML = '';
  const searchTerm = e.target.value;
  showCountries(filterCountriesBySearchTerm(countries, searchTerm))
})

/*=== An event listener for sort by name button ===*/
sortByNameButton.addEventListener('click', () => {
  sortByNameButton.classList.add('selected-button')
  const otherButtons = buttonSiblings(sortByNameButton)
  otherButtons.forEach((button) => {
    if (button.classList.contains('selected-button')) {
      button.classList.remove('selected-button')
    }
  })
  countriesContainer.innerHTML = '';
  showCountries(filterCountriesBySearchTerm(countries, inputField.value).sort((a, b) => {
    if (a.name < b.name) {
      return 1
    }
    if (a.name > b.name) {
      return -1
    }
    return 0
  }))
})

/*=== An event listener for sort by capital button ===*/
sortByCapitalButton.addEventListener('click', () => {
  sortByCapitalButton.classList.add('selected-button')
  const otherButtons = buttonSiblings(sortByCapitalButton)
  otherButtons.forEach((button) => {
    if (button.classList.contains('selected-button')) {
      button.classList.remove('selected-button')
    }
  })
  countriesContainer.innerHTML = '';
  showCountries(filterCountriesBySearchTerm(countries, inputField.value).sort((a, b) => {
    if (a.capital < b.capital) {
      return -1
    }
    if (a.capital > b.capital) {
      return 1
    }
    return 0
  }))
})
/*=== An event listener for sort by population button ===*/
sortByPopulationButton.addEventListener('click', () => {
  sortByPopulationButton.classList.add('selected-button')
  const otherButtons = buttonSiblings(sortByPopulationButton)
  otherButtons.forEach((button) => {
    if (button.classList.contains('selected-button')) {
      button.classList.remove('selected-button')
    }
  })

  countriesContainer.innerHTML = '';
  showCountries(filterCountriesBySearchTerm(countries, inputField.value).sort((a, b) => {
    if (a.population < b.population) {
      return 1
    }
    if (a.population > b.population) {
      return -1
    }
    return 0
  }))
})

// World population graph

const entirePopulationData = [];
let worldPopulation;
const filteredPopulationData = (arr) => {
  arr.forEach(country => {
    let { name, population } = country
    entirePopulationData.push({ name, population });
  })

  const tenMostPopulous = entirePopulationData.slice().sort((a, b) => {
    if (a.population < b.population) {
      return 1;
    } if (a.population > b.population) {
      return -1
    } return 0
  }).slice(0, 10);
  worldPopulation = entirePopulationData.reduce((total, element) => (total + element.population), 0);
  return tenMostPopulous;
}


// console.log(worldPopulation)


const buildCharts = (arr) => {
  arr.forEach(element => {
    const div = document.createElement('div');
    div.classList.add('chart-bar');
    // console.log(element.population);
    const population = element.population >= 1000000000 ? element.population.toString().slice(0, 1) + '.' + element.population.toString().slice(1, 3) + 'B' : element.population.toString().slice(0, 3) + 'M';
    div.innerHTML = `<span>${element.name} - ${population}</span>`;
    div.style.width = `${(element.population / 1377422166) * 100}%`;
    div.style.borderRadius = '0px 20px 20px 0px';
    chartContainer.appendChild(div);
    // console.log(typeof `${element.population}`);
  })

}

buildCharts(filteredPopulationData(countries))


// World language graph

const entireLanguageData = [];
let UniqueLanguage;
const filteredLanguageData = (arr) => {
  arr.forEach(country => {
    let { languages } = country
    languages.forEach(item => entireLanguageData.push(item))
  })
  console.log(new Set(entireLanguageData));
  return entireLanguageData;

  // const tenMostPopulous = entirePopulationData.slice().sort((a, b) => {
  //   if (a.population < b.population) {
  //     return 1;
  //   } if (a.population > b.population) {
  //     return -1
  //   } return 0
  // }).slice(0, 10);
  // worldPopulation = entirePopulationData.reduce((total, element) => (total + element.population), 0);
  // return tenMostPopulous;
}

console.log(filteredLanguageData(countries));