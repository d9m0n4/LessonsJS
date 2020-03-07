const input = document.querySelector('.input');
const btn = document.querySelector('.button');
const textT = document.querySelector('.textT');
const btnRuEn = document.querySelector('.ru-en');
const btnEnRu = document.querySelector('.en-ru');
const lang = document.querySelector('.lang');


let translateLanguage = 'ru-en';
btnRuEn.style.display = 'none';

const key = "trnsl.1.1.20200304T194313Z.39bb1889185f632a.209a0609f2bb5a1cc47cfd77a715c5fb99023d80";

btnRuEn.addEventListener('click', () => {
  translateLanguage = 'ru-en';
  btnRuEn.style.display = 'none';
  btnEnRu.style.display = 'block';
  input.value = '';
  lang.textContent = 'Русский - Английский'
});
btnEnRu.addEventListener('click', () => {
  translateLanguage = 'en-ru';
  btnEnRu.style.display = 'none';
  btnRuEn.style.display = 'block';
  input.value = '';
  lang.textContent = 'Английский - Русский'
});



btn.addEventListener('click', () => {
  const getData = () => {
    let text = encodeURIComponent(input.value);
    let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${translateLanguage}&format=plain&options=1`;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    return new Promise((resolve, reject) => {
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(request.status);
        }
      });
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify())
    });
  };

  const request = () => {
    getData()
      .then((response) => {
        let data = JSON.parse(response);
        console.log('data: ', data.text[0]);
        textT.textContent = data.text[0];
      })
  };
  request()
});


