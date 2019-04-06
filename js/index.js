//***NOTE git push -u countries master - not origin***//

// DOM elements
const inputField = document.querySelector('#input');
const actions = document.querySelector('.actions');
const sortByNameButton = document.querySelector('#name');
const sortByCapitalButton = document.querySelector('#capital');
const sortByPopulationButton = document.querySelector('#population');
const statisticsModalButton = document.querySelector('#statistics');
const countriesTotal = document.querySelector('.total-countries');
const countriesContainer = document.querySelector('.countries-container');
const chartsModal = document.querySelector('.charts-modal');
const closeButton = document.querySelector('.close-button');
const modalStatisticsContent = document.querySelector('.modal-statistics-content');
const chartPopulationContainer = document.querySelector('.population-chart-container');
const chartLanguageContainer = document.querySelector('.language-chart-container');

// copy countries array
const countriesCopy = [...countries];


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
showCountries(countriesCopy)


/*=== filterCountriesBySearchTerm() function ===*/
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

// get the clicked button siblings

/*=== ButtonChanger() function ===*/
const buttonSiblings = n => [...n.parentElement.children].filter(currentButton => currentButton.nodeType === 1 && currentButton != n)

/*=== inputEvent() function ===*/
const inputEvent = (e) => {
  countriesContainer.innerHTML = '';
  const searchTerm = e.target.value;
  showCountries(filterCountriesBySearchTerm(countriesCopy, searchTerm))
}

/*=== SORT FUNCTIONS ===*/
/*=== sortByName() function ===*/
const sortByName = () => {
  sortByNameButton.classList.add('selected-button')
  const otherButtons = buttonSiblings(sortByNameButton)
  otherButtons.forEach((button) => {
    if (button.classList.contains('selected-button')) {
      button.classList.remove('selected-button')
    }
  })
  countriesContainer.innerHTML = '';
  showCountries(filterCountriesBySearchTerm(countriesCopy, inputField.value).sort((a, b) => {
    if (a.name < b.name) {
      return 1
    }
    if (a.name > b.name) {
      return -1
    }
    return 0
  }))
}

/*=== sortByCapital() function ===*/
const sortByCapital = () => {
  sortByCapitalButton.classList.add('selected-button')
  const otherButtons = buttonSiblings(sortByCapitalButton)
  otherButtons.forEach((button) => {
    if (button.classList.contains('selected-button')) {
      button.classList.remove('selected-button')
    }
  })
  countriesContainer.innerHTML = '';
  showCountries(filterCountriesBySearchTerm(countriesCopy, inputField.value).sort((a, b) => {
    if (a.capital < b.capital) {
      return -1
    }
    if (a.capital > b.capital) {
      return 1
    }
    return 0
  }))
}

/*=== sortByCapital() function ===*/
const sortByPopulation = () => {
  sortByPopulationButton.classList.add('selected-button')
  const otherButtons = buttonSiblings(sortByPopulationButton)
  otherButtons.forEach((button) => {
    if (button.classList.contains('selected-button')) {
      button.classList.remove('selected-button')
    }
  })
  countriesContainer.innerHTML = '';
  showCountries(filterCountriesBySearchTerm(countriesCopy, inputField.value).sort((a, b) => {
    if (a.population < b.population) {
      return 1
    }
    if (a.population > b.population) {
      return -1
    }
    return 0
  }))
}

/*=== MODAL Functionality ===*/
// show modal toggle function
const toggleModal = () => {
  chartsModal.classList.toggle('show-modal');
}

// window click function
const windowOnclick = (e) => {
  if (e.target === chartsModal) {
    toggleModal()
  }
}


/*=== EVENT LISTENERS ===*/
/*=== An event listener for sort by name button ===*/
inputField.addEventListener('input', inputEvent)

/*=== An event listener for sort by name button ===*/
sortByNameButton.addEventListener('click', sortByName)

/*=== An event listener for sort by capital button ===*/
sortByCapitalButton.addEventListener('click', sortByCapital);

/*=== An event listener for sort by population button ===*/
sortByPopulationButton.addEventListener('click', sortByPopulation)

/*=== Event listeners modal ===*/
statisticsModalButton.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnclick);


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
  
  return tenMostPopulous;
}
// get world population
worldPopulation = entirePopulationData.reduce((total, element) => (total + element.population), 0);
// console.log(worldPopulation);

const buildCharts = (arr) => {
  arr.forEach(element => {
    const div = document.createElement('div');
    div.classList.add('chart-population-bar');
    const population = element.population >= 1000000000 ? element.population.toString().slice(0, 1) + '.' + element.population.toString().slice(1, 3) + 'B' : element.population.toString().slice(0, 3) + 'M';
    div.innerHTML = `<span>${element.name} - ${population}</span>`;
    div.style.width = `${(element.population / 1377422166) * 100}%`;
    
    div.style.borderRadius = '0px 20px 20px 0px';
    chartPopulationContainer.appendChild(div);
  })
}

// buildCharts(filteredPopulationData(countriesCopy));


const buildCharts2 = (arr) => {
  arr.forEach(element => {
    const div = document.createElement('div');
    div.classList.add('chart-population-bar');
    const population = element.population >= 1000000000 ? element.population.toString().slice(0, 1) + '.' + element.population.toString().slice(1, 3) + 'B' : element.population.toString().slice(0, 3) + 'M';
    div.innerHTML = `<span>${element.name} - ${population}</span>`;
    div.style.width = `${(element.population / 1377422166) * 100}%`;
    div.style.borderRadius = '0px 20px 20px 0px';
    modalStatisticsContent.appendChild(div);
  })
}

buildCharts2(filteredPopulationData(countriesCopy));

/*=== World language graph ===*/

const entireLanguageData = [];
const filteredLanguageData = (arr) => {
  arr.forEach(country => {
    let { languages } = country
    languages.forEach(item => entireLanguageData.push(item))
  })
  return entireLanguageData;
}

filteredLanguageData(countriesCopy);

// get collection of unique language into a set
let uniqueLanguagesSet = new Set(entireLanguageData);

// convert uniqueLanguagesSet set into an array
let uniqueLanguagesArray = [...uniqueLanguagesSet]

// count number of times each language repeats itself
let sortRepeatedLanguage = [];
uniqueLanguagesArray.forEach(item1 => {
  let LanguageMatchInBothArrays = entireLanguageData.filter(item => { return item1 === item })
  sortRepeatedLanguage.push(LanguageMatchInBothArrays);
})

console.log(sortRepeatedLanguage);

// get the number of times each language repeats itself.
const numberLang = sortRepeatedLanguage.map(item => item.length);

// console.log(uniqueLanguagesArray);
// console.log(numberLang);

// set the entire language name and frequency into one big object
let languageNumberOfTimes = {}
uniqueLanguagesArray.forEach((language, index) =>
  languageNumberOfTimes[language] = numberLang[index])

const languageNumberOfTimesArrayOfArrays = Object.entries(languageNumberOfTimes)
const tenMostSpokenLanguages = languageNumberOfTimesArrayOfArrays.slice().sort((a, b) => {
  if (a[1] < b[1]) {
    return 1;
  }
  if (a[1] > b[1]) {
    return -1;
  } return 0
}).slice(0, 10)

console.log(tenMostSpokenLanguages);

const buildChartsLanguage = (arr) => {
  arr.forEach(element => {
    const div = document.createElement('div');
    div.classList.add('chart-language-bar');
    div.innerHTML = `<span>${element[0]} - ${element[1]}</span>`;
    div.style.width = `${(element[1] / 91) * 100}%`;
    div.style.borderRadius = '0px 20px 20px 0px';
    chartLanguageContainer.appendChild(div);
  })
}

buildChartsLanguage(tenMostSpokenLanguages)


