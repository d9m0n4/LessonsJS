'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const getData = () => new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open('GET', './db/dbHeroes.json');
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;

            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else {
                reject(request.statusText);
            }
        });
        request.send();
    });

    const fn = heroBase => {
        const base = heroBase.map(({ photo, name, actors, movies, status }) =>
                ({ photo, name, actors, movies, status })),
            movies = base.reduce((accum, item) => accum.concat(item.movies), []),
            filterMovies = movies.filter((item, i) => movies.indexOf(item) === i && item),
            clearBtn = document.querySelector('.clear'),
            menuItems = document.querySelector('.menu-items'),
            scrollBtn = document.querySelector('.scroll-btn');
        const card = () => {
            base.map(({ photo, name, actors, movies, status }) => {
                const newCard = document.createElement('div'),
                    newCardInfo = document.createElement('div'),
                    cardPhoto = document.createElement('div'),
                    contentBlock = document.querySelector('.content'),
                    clearBtn = document.querySelector('.clear');
                clearBtn.style.display = 'none';
                newCard.classList.add('card');
                newCardInfo.classList.add('card-info');
                cardPhoto.classList.add('card-photo');
                contentBlock.appendChild(newCard);
                newCard.append(cardPhoto, newCardInfo);
                cardPhoto.style.backgroundImage = `url(${photo})`;
                newCardInfo.innerHTML = `
                    <div class="inf">
                    <p class="name">${name}</p>
                    <p class="actor">${actors}</p>
                    <p class="movies">${movies}</p>
                    </div>
                    <div class= "stat">
                    <p class="status">${status}</p>
                    </div>
                    `;
            });
        };
        card();

        const menu = () => {
            filterMovies.forEach(item => {
                const newLi = document.createElement('li'),
                    link = document.createElement('a');
                link.setAttribute('href', '#');
                newLi.appendChild(link);
                link.textContent = item;
                menuItems.appendChild(newLi);
            });
        };
        menu();

        const filtredCards = filterArr => {
            filterArr.map(({ photo, name, actors, movies, status }) => {
                const newCard = document.createElement('div'),
                    newCardInfo = document.createElement('div'),
                    cardPhoto = document.createElement('div'),
                    contentBlock = document.querySelector('.content'),
                    clearBtn = document.querySelector('.clear');
                clearBtn.style.display = 'block';
                newCard.classList.add('card');
                newCardInfo.classList.add('card-info');
                cardPhoto.classList.add('card-photo');
                contentBlock.appendChild(newCard);
                newCard.append(cardPhoto, newCardInfo);
                cardPhoto.style.backgroundImage = `url(${photo})`;
                newCardInfo.innerHTML = `
                    <div class="inf">
                    <p class="name">${name}</p>
                    <p class="actor">${actors}</p>
                    <p class="movies">${movies}</p>
                    </div>
                    <div class="stat">
                    <p class="status">${status}</p>
                    </div>
                    `;
            });
        };
        const colorize = () => {
            const statusHero = document.querySelectorAll('.status');
            statusHero.forEach(elem => {
                if (elem.textContent === 'alive') {
                    elem.style.backgroundColor = 'green';
                } else if (elem.textContent === 'deceased') {
                    elem.style.backgroundColor = 'red';
                } else if (elem.textContent === 'unknown') {
                    elem.style.backgroundColor = `#f1f1f1`;
                }
            });
        };
        colorize();
        const filterCards = content => {
            const filterArr = base.filter(item => {
                if (item.movies) {
                    return item.movies.includes(content);
                }
            });
            filtredCards(filterArr);
        };

        const clearCards = () => {
            document.querySelectorAll('.card').forEach(item => {
                item.remove();
            });
        };
        clearBtn.addEventListener('click', e => {
            e.preventDefault();
            const mf = document.querySelector('.movie-name');
            mf.innerHTML = ``;
            clearCards();
            card();
            colorize();
        });

        const items = menuItems.querySelectorAll('li');
        items.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                if (e.target.matches('a')) {
                    const mf = document.querySelector('.movie-name');
                    mf.innerHTML = `<p>Герои из фильма: ${event.target.textContent}</p>`;
                    clearCards();
                    filterCards(event.target.textContent);
                    colorize();
                }
            });
        });
        const scrollTop = () => {
            window.addEventListener('scroll', () => {
                if (document.documentElement.scrollTop > 400) {
                    scrollBtn.style.display = 'inline-block';
                } else {
                    scrollBtn.style.display = 'none';
                }
            });
        };
        scrollTop();
        scrollBtn.addEventListener('click', e => {
            e.preventDefault();
            const header = document.querySelector('.header');
            header.scrollIntoView({ block: "start", behavior: "smooth" });
        });
    };
    getData()
        .then(fn)
        .catch(error => {
            console.error(error);
        });
});
