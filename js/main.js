// === Прелоадер ===
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  const content = document.querySelector(".content");

  // Ховаємо прелоадер
  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 1s ease";

  setTimeout(() => {
    document.body.style.overflow = "auto";
    preloader.style.display = "none";
    content.style.display = "block";
  }, 1000);
});

// === Управління хедером під час скролу ===
let lastScrollTop = 0;
const header = document.getElementById("header");
let isPopupOpen = false; 
let wasHeaderHidden = false; 

function handleScroll() {
  if (isPopupOpen) return; 

  const currentScroll = window.pageYOffset;

  // Сховати/показати хедер залежно від напрямку скролу
  header.classList.toggle("hidden", currentScroll > lastScrollTop);

  lastScrollTop = Math.max(50, currentScroll); // Оновлюємо позицію
}

window.addEventListener("scroll", handleScroll);

// === Управління мобільним меню ===
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

// === Аккордеон ===
document.querySelectorAll(".accordion__item").forEach((item) =>
  item.addEventListener("click", function () {
    
    document
      .querySelectorAll(".accordion__item--active")
      .forEach(
        (activeItem) =>
          activeItem !== this &&
          activeItem.classList.remove("accordion__item--active")
      );

    // Перемикати стан поточного елемента
    this.classList.toggle("accordion__item--active");
  })
);

// === Плавний скрол до елемента ===
function smoothScrollTo(target, duration = 1000, offset = 0) {
  const startPosition = window.pageYOffset;
  const targetPosition =
    target.getBoundingClientRect().top + startPosition - offset;
  const distance = targetPosition - startPosition;

  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    // Розрахувати поточну позицію із уповільненням
    const run = easeOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  }

  requestAnimationFrame(animation);
}

// === Обробник для плавного скролу ===
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) smoothScrollTo(targetElement, 1000, 50);
  });
});

// === Управління попапами з формами===
function togglePopup(popupId, action) {
  const popup = document.getElementById(popupId);
  if (popup) {
    if (action === "open") {
      wasHeaderHidden = header.classList.contains("hidden"); 
      popup.style.display = "flex"; 
      disableScroll(); // Заблокувати прокрутку
      header.classList.add("hidden"); // Сховати хедер
      isPopupOpen = true; 
    } else {
      popup.style.display = "none"; // Закрити попап
      enableScroll(); // Розблокувати прокрутку
      if (!wasHeaderHidden) {
        header.classList.remove("hidden"); 
      }
      isPopupOpen = false; 
    }
  }
}

// === Відкриття/закриття попапів ===
document.querySelectorAll(".trigger-button").forEach((button) => {
  button.addEventListener("click", () => {
    togglePopup(button.dataset.popup, "open");
  });
});

document.querySelectorAll(".popupForm__close").forEach((button) => {
  button.addEventListener("click", () => {
    togglePopup(button.dataset.close, "close");
  });
});

// === Блокування та розблокування прокрутки ===
function disableScroll() {
  const scrollPosition = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";
}

function enableScroll() {
  const scrollPosition = Math.abs(parseInt(document.body.style.top || "0", 10));
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, scrollPosition);
}

// Ініціалізація слайдерів
const slider1 = new SimpleSlider(document.getElementById("simple-slider-1"), {
  autoPlay: true, 
  autoPlayInterval: 4000, 
});
const slider2 = new SimpleSlider(document.getElementById("simple-slider-2"), {
  autoPlay: true, 
  autoPlayInterval: 4000, 
});
const slider3 = new SimpleSlider(document.getElementById("simple-slider-3"), {
  autoPlay: true, 
  autoPlayInterval: 4000, 
});


