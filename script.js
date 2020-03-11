'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('select-cities'),
    defList = document.querySelector('.dropdown-lists__list--default'),
    colList = defList.querySelector('.dropdown-lists__col'),
    selList = document.querySelector('.dropdown-lists__list--select'),
    colSelect = selList.querySelector('.dropdown-lists__col'),
    btn = document.querySelector('.button'),
    closeBtn = document.querySelector('.close-button'),
    label = document.querySelector('.label'),
    countryBlock = document.createElement('div'),
    totalLine = document.createElement('div'),
    listCountry = document.createElement('div'),
    listCount = document.createElement('div');

  const autocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
    autoBlock = autocomplete.querySelector('.dropdown-lists__countryBlock');

  countryBlock.classList.add('dropdown-lists__countryBlock');
  totalLine.classList.add('dropdown-lists__total-line');
  listCountry.classList.add('dropdown-lists__country');
  listCount.classList.add('dropdown-lists__count');

  totalLine.appendChild(listCountry);
  totalLine.appendChild(listCount);
  countryBlock.appendChild(totalLine);
  colSelect.appendChild(countryBlock);

  // вывод городов при клике на инпут
  const inpCities = () => {
    if (colList.textContent === '') {
      data.RU.forEach(item => {
        const countryBlock = document.createElement('div'),
          totalLine = document.createElement('div'),
          listCountry = document.createElement('div'),
          listCount = document.createElement('div');

        countryBlock.classList.add('dropdown-lists__countryBlock');
        totalLine.classList.add('dropdown-lists__total-line');
        listCountry.classList.add('dropdown-lists__country');
        listCount.classList.add('dropdown-lists__count');

        listCountry.textContent = item.country;
        listCount.textContent = item.count;

        totalLine.appendChild(listCountry);
        totalLine.appendChild(listCount);
        countryBlock.appendChild(totalLine);
        colList.appendChild(countryBlock);


        let sortArr = item.cities.map((curretntValue, i) => {
          return item.cities[i].count;
        });
        sortArr.sort((a, b) => b - a);


        item.cities.forEach(cityItem => {

          if (cityItem.count == sortArr[0] || cityItem.count == sortArr[1] || cityItem.count == sortArr[2]) {
            const listLine = document.createElement('div'),
              listCity = document.createElement('div'),
              listCount = document.createElement('div');

            listLine.classList.add('dropdown-lists__line');
            listCity.classList.add('dropdown-lists__city');
            listCount.classList.add('dropdown-lists__count');

            listCity.textContent = cityItem.name;
            listCount.textContent = cityItem.count;

            listLine.appendChild(listCity);
            listLine.appendChild(listCount);
            countryBlock.appendChild(listLine);
          }
        });
      });
    }
  }
  // поиск города по введенному имени
  const autoSearche = () => {
    autocomplete.style.display = 'block';
    selList.style.display = 'none';
    defList.style.display = 'none';
    autoBlock.textContent = '';
    data.RU.forEach(item => {
      item.cities.forEach(cityItem => {

        if (input.value.toLowerCase() === cityItem.name.slice(0, input.value.length).toLowerCase()) {

          const listLine = document.createElement('div'),
            listCity = document.createElement('div'),
            listCount = document.createElement('div');

          listLine.classList.add('dropdown-lists__line');
          listCity.classList.add('dropdown-lists__city');
          listCount.classList.add('dropdown-lists__count');

          listCity.textContent = cityItem.name;
          listCount.textContent = cityItem.count;
          btn.setAttribute('href', cityItem.link);

          listLine.appendChild(listCity);
          listLine.appendChild(listCount);
          autoBlock.appendChild(listLine);

        }
      });
    });

    if (input.value !== '' && autoBlock.textContent === '') {
      autoBlock.textContent = 'Ничего не найдено';
      btn.removeAttribute('href');

    }

    if (input.value === '') {
      autocomplete.style.display = 'none';
      defList.style.display = 'block';
      label.style.display = 'block';
      btn.setAttribute('disabled', 'disabled');

    }
  }
  //вывод городов выбранной страны
  const selectCities = (event) => {
    if (listCountry.textContent == '') {
      let target = event.target;
      target = target.closest('.dropdown-lists__total-line');
      if (target) {
        let country = target.querySelector('.dropdown-lists__country');
        selList.style.display = 'block';

        data.RU.forEach(item => {
          if (country.textContent === item.country) {
            listCountry.textContent = item.country;
            listCount.textContent = item.count;
            item.cities.forEach(cityItem => {
              const listLine = document.createElement('div'),
                listCity = document.createElement('div'),
                listCount = document.createElement('div');

              listLine.classList.add('dropdown-lists__line');
              listCity.classList.add('dropdown-lists__city');
              listCount.classList.add('dropdown-lists__count');

              listCity.textContent = cityItem.name;
              listCount.textContent = cityItem.count;

              listLine.appendChild(listCity);
              listLine.appendChild(listCount);
              countryBlock.appendChild(listLine);
            });
          }
        });

      }
    }
  }
  // клик на название города
  const clickCity = (event) => {
    let target = event.target;
    target = target.closest('.dropdown-lists__line');
    if (target) {
      const city = target.querySelector('.dropdown-lists__city');

      data.RU.forEach(item => {
        item.cities.forEach(cityItem => {

          if (city.textContent === cityItem.name) {
            btn.removeAttribute('disabled');
            btn.setAttribute('href', cityItem.link);

            label.style.display = 'none';
            input.value = cityItem.name;
            closeBtn.style.display = 'block';
          }
        })
      })
    }
  }

  input.addEventListener('click', inpCities);
  input.addEventListener('input', autoSearche);
  colList.addEventListener('click', selectCities);

  // возврат в блок дефолт
  const totalLineSel = selList.querySelector('.dropdown-lists__total-line');
  totalLineSel.addEventListener('click', () => {
    listCountry.textContent = '';
    listCount.textContent = '';
    selList.style.display = 'none';
    const selCountryBlock = selList.querySelector('.dropdown-lists__countryBlock'),
      cities = selCountryBlock.querySelectorAll('.dropdown-lists__line');
    cities.forEach(item => {
      selCountryBlock.removeChild(item);
    })

  });

  // поиск по введенному значению
  colList.addEventListener('click', clickCity);
  colSelect.addEventListener('click', clickCity);

  //крестик в инпуте
  closeBtn.addEventListener('click', () => {
    input.value = '';
    closeBtn.style.display = 'none';
    btn.setAttribute('disabled', 'disabled');
    btn.removeAttribute('href');
    defList.style.display = 'block';
    autocomplete.style.display = 'none';
  });

  btn.setAttribute('disabled', 'disabled');

  btn.addEventListener('click', () => {
    input.value = '';
  })
})
