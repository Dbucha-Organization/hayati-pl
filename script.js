// Hamburger functionality

const ham = document.querySelector(".hamburger");
const menu = document.querySelector(".hamburger-content");

ham.addEventListener("click", () => {
  ham.classList.toggle("active");
  menu.classList.toggle("active");
});

document.querySelectorAll(".hamburger-content a").forEach((link) => {
  link.addEventListener("click", () => {
    ham.classList.remove("active");
    menu.classList.remove("active");
  });
});

// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
  if (localStorage.getItem("ageConfirmed") != "true") {
    ageModal.style.display = "flex";
  } else {
    ageModal.style.display = "none";
  }
});

yesBtn.addEventListener("click", () => {
  localStorage.setItem("ageConfirmed", "true");
  ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
  alert("Dostęp zabroniony. Strona tylko dla osób 18+");
  window.close();
  window.location.href = "https://www.google.pl";
});



// Конфигурация
const CONFIG = {
  autoplayInterval: 4000, // Интервал автопрокрутки (мс)
  autoplayEnabled: true,  // Включить/выключить автоплей
};

// Инициализация переменных
const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
var prevBtn = document.querySelector('.carousel-btn.prev');
var nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let currentIndex = 0;
let autoplayTimer = null;
let touchStartX = 0;
let touchEndX = 0;

// Создание индикаторов
function createIndicators() {
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    indicator.setAttribute('role', 'tab');
    indicator.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });
}

// Переход к слайду
function goToSlide(index) {
  // Циклическая прокрутка
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  
  currentIndex = index;
  
  // Обновление трансформации
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Обновление активных классов
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex);
    slide.setAttribute('aria-hidden', i !== currentIndex);
  });
  
  // Обновление индикаторов
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
    dot.setAttribute('aria-selected', i === currentIndex);
  });
  
  // Перезапуск автоплея
  resetAutoplay();
}

// Следующий слайд
function nextSlide() {
  goToSlide(currentIndex + 1);
}

// Предыдущий слайд
function prevSlide() {
  goToSlide(currentIndex - 1);
}

// Автопрокрутка
function startAutoplay() {
  if (!CONFIG.autoplayEnabled) return;
  autoplayTimer = setInterval(nextSlide, CONFIG.autoplayInterval);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Обработка свайпов (тач-события)
function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50; // Минимальное расстояние для свайпа
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide(); // Свайп влево
    } else {
      prevSlide(); // Свайп вправо
    }
  }
}

// Инициализация
function init() {
  createIndicators();
  
  // События кнопок
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Пауза при наведении
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  
  // Тач-события
  carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
  carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Управление клавиатурой
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Запуск автоплея
  startAutoplay();
}

// Запуск при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


//  


  // Get all video blocks
        // const videoBlocks = document.querySelectorAll('.video-block');

        // videoBlocks.forEach(block => {
        //     const video = block.querySelector('video');

        //     // Play video on mouse enter
        //     block.addEventListener('mouseenter', () => {
        //         video.play().catch(err => {
        //             console.log('Autoplay prevented:', err);
        //         });
        //     });

        //     // Pause video on mouse leave
        //     block.addEventListener('mouseleave', () => {
        //         video.pause();
        //         video.currentTime = 0; // Reset to start
        //     });

        //     // Handle touch devices (mobile)
        //     block.addEventListener('touchstart', (e) => {
        //         if (video.paused) {
        //             video.play();
        //         } else {
        //             video.pause();
        //             video.currentTime = 0;
        //         }
        //     });
        // });

//  document.querySelectorAll('.video-block').forEach(block => {
//     const video = block.querySelector('video');
//     const overlay = block.querySelector('.video-text');

//     block.addEventListener('mouseenter', () => {
//         video.play();                   // воспроизведение
//         overlay.style.transition = 'opacity 0.3s ease';
//         overlay.style.opacity = '0';    // скрываем overlay
//     });

//     block.addEventListener('mouseleave', () => {
//         video.pause();                  // остановка
//         video.currentTime = 0;          // сброс к началу
//         overlay.style.opacity = '1';    // возвращаем overlay
//     });
// });