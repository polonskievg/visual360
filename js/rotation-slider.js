const cards = document.querySelectorAll(".card");
const infoTitle = document.getElementById("card-title");
const infoDescription = document.getElementById("card-description");
const infoLink = document.getElementById("card-link");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 2; // Стартовий індекс
let autoPlayInterval;

// Функція оновлення карток та інформаційного блоку
function updateCards() {
  cards.forEach((card, index) => {
    card.className = "card"; // Скидаємо класи

    const relativeIndex = (index - currentIndex + cards.length) % cards.length;

    // Застосування класів залежно від положення картки
    if (relativeIndex === 0) {
      card.classList.add("active");
      updateInfoBlock(card);
    } else if (relativeIndex === 1 || relativeIndex === -4) {
      card.classList.add("right-1");
    } else if (relativeIndex === 2 || relativeIndex === -3) {
      card.classList.add("right-2");
    } else if (relativeIndex === -1 || relativeIndex === 4) {
      card.classList.add("left-1");
    } else if (relativeIndex === -2 || relativeIndex === 3) {
      card.classList.add("left-2");
    }
  });
}

// Функція поновлення інформаційного блоку
function updateInfoBlock(card) {
  // Добавляем класс для исчезновения
  infoTitle.classList.add("fade-out");
  infoDescription.classList.add("fade-out");
  infoLink.classList.add("fade-out");

  // Ждём завершения анимации исчезновения перед обновлением содержимого
  setTimeout(() => {
    // Обновляем содержимое
    infoTitle.textContent = card.dataset.title;
    infoDescription.textContent = card.dataset.description;
    infoLink.href = card.dataset.link;

    const linkIcon = card.dataset.icon || ""; // Иконка (если задана)
    const linkText = card.dataset.linkText || "Подробнее"; // Текст ссылки (по умолчанию)
    infoLink.innerHTML = linkIcon
      ? `<img src="${linkIcon}" alt="Иконка" class="link-icon"> ${linkText}`
      : linkText;

    // Удаляем fade-out и добавляем fade-in
    infoTitle.classList.remove("fade-out");
    infoDescription.classList.remove("fade-out");
    infoLink.classList.remove("fade-out");
  }, 300);

  infoTitle.classList.add("fade-in");
  infoDescription.classList.add("fade-in");
  infoLink.classList.add("fade-in");
}

// Обробники кнопок
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
  restartAutoPlay();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
  restartAutoPlay();
});

// Автоматичне перемикання слайдів
function autoPlay() {
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  }, 4000);
}

// Перезапуск автопрогравання
function restartAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlay();
}

updateCards();
// autoPlay();
