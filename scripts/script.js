const slides = [
  {
    city: 'Rostov-on-Don <br>LCD admiral',
    area: '81 m2',
    repairTime: '3.5 months',
  },

  {
    city: 'Sochi <br>Thieves',
    area: '105 m2',
    repairTime: '4 months',
  },

  {
    city: 'Rostov-on-Don <br>Patriotic',
    area: '93 m2',
    repairTime: '3 months',
  },
];

const mainSlide = document.querySelector('.page2__main-slide');
const mainSlideMobile = document.querySelector('.page2__main-slide_mobile');
const slidesNumber = mainSlide.querySelectorAll('img').length;

mainSlide.style.width = `${679 * slidesNumber}px`;
mainSlideMobile.style.width = `${340 * slidesNumber}px`;

const nav = document.querySelectorAll('.page2__navigation_item');

const leftArrow = document.querySelector('.page2__left-arrow');
const rightArrow = document.querySelector('.page2__right-arrow');

const leftArrowMobile = document.querySelector('.page2__left-arrow_mobile');
const rightArrowMobile = document.querySelector('.page2__right-arrow_mobile');

const dots = document.querySelectorAll('.page2__dots');

const city = document.querySelector('.city');
const area = document.querySelector('.area');
const repairTime = document.querySelector('.repair-time');

let slideNumber = 0;

nav.forEach((item, index) =>
  item.addEventListener('click', (event) => {
    event.preventDefault();
    slideNumber = index;
    changeSlide(mainSlide, slideNumber, 679);
  })
);

dots.forEach((item, index) =>
  item.addEventListener('click', (event) => {
    event.preventDefault();
    slideNumber = index;
    changeSlide(mainSlide, slideNumber, 679);
  })
);

rightArrow.addEventListener('click', (event) => {
  slideNumber++;
  changeSlide(mainSlide, 'right', 679);
});
rightArrowMobile.addEventListener('click', (event) => {
  slideNumber++;
  changeSlide(mainSlideMobile, 'right', 340);
});

leftArrow.addEventListener('click', (event) => {
  slideNumber--;
  changeSlide(mainSlide, 'left', 679);
});
leftArrowMobile.addEventListener('click', (event) => {
  slideNumber--;
  changeSlide(mainSlideMobile, 'left', 340);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    slideNumber++;
    changeSlide(mainSlide, 'right', 679);
  } else if (event.key === 'ArrowLeft') {
    slideNumber--;
    changeSlide(mainSlide, 'left', 679);
  }
});

// функция выделения активной точи
function makeDotActive(dotNumber) {
  dots[dotNumber].setAttribute('src', './images/Dot_light.svg');
  dots.forEach((item, index) => {
    // убрать подсветку с неактивных точек
    if (index !== dotNumber) item.setAttribute('src', './images/Dot_dark.svg');
  });
}
// функция выделения элемента меню
function makeNavItemActive(number) {
  nav[number].classList.add('active');
  nav.forEach((item, index) => {
    // убрать подсветку с неактивных элементов
    if (index !== number) item.classList.remove('active');
  });
}

function changeSlide(element, direction, slideWidth) {
  if (direction === 'right') {
    if (slideNumber === slidesNumber) {
      slideNumber = 0;
      element.style.transition = 'unset';
      setTimeout(() => {
        slideNumber = 1;
        element.style.transition = 'transform 0.5s ease-in-out';
        element.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
        fillInfo(slideNumber);
      }, 0);
      slideNumber = 0;
    }
  } else if (direction === 'left') {
    if (slideNumber < 0) {
      slideNumber = slidesNumber - 1;
      element.style.transition = 'unset';
      setTimeout(() => {
        slideNumber = slidesNumber - 2;
        element.style.transition = 'transform 0.5s ease-in-out';
        element.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
        fillInfo(slideNumber);
      }, 0);
    }
  }
  if (slideNumber !== slidesNumber - 1) {
    fillInfo(slideNumber);
  } else {
    fillInfo(0);
  }
  element.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
}

function fillInfo(slideNumber) {
  makeNavItemActive(slideNumber);
  makeDotActive(slideNumber);
  city.innerHTML = slides[slideNumber].city;
  area.innerHTML = slides[slideNumber].area;
  repairTime.innerHTML = slides[slideNumber].repairTime;
}
