document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  // Перемикання табів
  const switchTab = (button, index) => {
    const isMobile = window.innerWidth <= 768;

    // Для мобільних пристроїв
    if (isMobile) {
      const isActive = button.classList.contains("active");

      tabButtons.forEach((btn, i) => {
        btn.classList.remove("active");
        tabPanels[i].classList.remove("active");
      });

      if (!isActive) {
        button.classList.add("active");
        tabPanels[index].classList.add("active");

        button.insertAdjacentElement("afterend", tabPanels[index]);
      }
    } else {
      tabButtons.forEach((btn, i) => {
        btn.classList.remove("active");
        tabPanels[i].classList.remove("active");
      });

      button.classList.add("active");
      tabPanels[index].classList.add("active");
    }
  };

  // Ініціалізація табів
  const initializeTabs = () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // На мобільних пристроях всі таби неактивні, контент прихований
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));
    } else {
      // На десктопах перший таб активний
      tabButtons.forEach((btn, i) => {
        if (i === 0) {
          btn.classList.add("active");
          tabPanels[i].classList.add("active");
        } else {
          btn.classList.remove("active");
          tabPanels[i].classList.remove("active");
        }
      });

      // Переміщуємо весь контент до загального блоку під табами
      const tabsContainer = document.querySelector(".tabs");
      tabPanels.forEach((panel) => tabsContainer.appendChild(panel));
    }
  };

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => switchTab(button, index));
  });

  // Ініціалізація при завантаженні
  initializeTabs();

  // Оновлення при зміні ширини екрану
  window.addEventListener("resize", initializeTabs);
});
