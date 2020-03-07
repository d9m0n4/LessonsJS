'use strict';

class SliderCarousel {
    constructor({
        main,
        wrap,
        next,
        prev,
        position = 0,
        slidesToShow = 3,
        infinity = false,
        responsive = []
    }) {
        if (!main || !wrap) {
            console.warn('slider: Необходимо передать 2 свйства: "main" и "wrap"!');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.slides = document.querySelector(wrap).children;
        this.options = {
            position,
            infinity,
            slideWidth: Math.floor(100 / this.slidesToShow)
        };
        this.responsive = responsive;
    }

    init() {
        this.addProClass();
        this.addStyle();

        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }

        if (this.responseInite) {
            this.responseInite();
        }
    }

    addProClass() {
        this.main.classList.add('pro-slider');
        this.wrap.classList.add('pro-slider__wrap');
        for (const item of this.slides) {
            item.classList.add('pro-slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('sliderCarousel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        style.textContent = `
            .pro-slider{
                overflow: hidden !important;
            }
            .pro-slider__wrap{
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .pro-slider__item{
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                flex: 0 0 ${this.options.slideWidth}% !important;
                margin: auto 0 !important;
            }`;
        document.head.appendChild(style);
    }
    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }
    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slides.length - this.slidesToShow;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
        }
    }
    nextSlider() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'pro-slider__prev';
        this.next.className = 'pro-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .pro-slider__prev,
            .pro-slider__next {
                margin: 0 10px;
                border: 15px solid transparent;
                background: transparent;
            }
            .pro-slider__prev {
                border-right-color: #19b5fe;
            }
            .pro-slider__next {
                border-left-color: #19b5fe;
            }
            .pro-slider__prev:hover,
            .pro-slider__prev:focus,
            .pro-slider__next:hover,
            .pro-slider__next:focus{
                background: transparent;
                outline: transparent;
            }
            `;
        document.head.appendChild(style);

    }

    responseInite() {
        const slidesToShowDefault = this.slidesToShow;
        const allRespon = this.responsive.map(item => item.breakpoint);
        const maxRespon = Math.max(...allRespon);
        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxRespon) {
                for (let i = 0; i < allRespon.length; i++) {
                    if (widthWindow < allRespon[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.slideWidth = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.slideWidth = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        };
        checkResponse();

        window.addEventListener('resize', checkResponse);
    }
}

export default SliderCarousel;
