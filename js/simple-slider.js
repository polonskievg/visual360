class SimpleSlider {
  constructor(sliderElement, options = {}) {
    this.slider = sliderElement;
    this.slides = this.slider.querySelectorAll(".simple-slider-slide");
    this.prevButton = this.slider.querySelector(".simple-slider-arrow.prev");
    this.nextButton = this.slider.querySelector(".simple-slider-arrow.next");
    this.indicatorsContainer = this.slider.querySelector(
      ".simple-slider-indicators"
    );
    this.currentIndex = 0;
    this.isProgressBar = this.slider.classList.contains(
      "simple-slider-progress-bar"
    );
    this.autoPlayInterval = options.autoPlayInterval || 3000; 
    this.autoPlay = options.autoPlay !== false; 
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (this.isProgressBar) {
      this.createProgressBar();
    } else {
      this.createDotsIndicators();
    }
    this.updateSlider();
    this.setInitialHeight(); // Встановлюємо початкову висоту
    this.addEventListeners();
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  setInitialHeight() {
    const firstSlide = this.slides[0]; 
    if (firstSlide) {
      const slideHeight = firstSlide.offsetHeight; 
      this.slider.style.height = `${slideHeight}px`; 
    }
  }

  createDotsIndicators() {
    this.slides.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("simple-slider-indicator");
      if (index === this.currentIndex) {
        indicator.classList.add("active");
      }
      indicator.addEventListener("click", () => {
        this.currentIndex = index;
        this.updateSlider();
      });
      this.indicatorsContainer.appendChild(indicator);
    });
  }

  createProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.classList.add("simple-slider-progress-bar-container");
    const progressBarInner = document.createElement("div");
    progressBarInner.classList.add("simple-slider-progress-bar-inner");
    progressBar.appendChild(progressBarInner);
    this.indicatorsContainer.appendChild(progressBar);
    this.progressBarInner = progressBarInner;
  }

  updateSlider() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentIndex);
    });
    if (this.isProgressBar) {
      const progress = ((this.currentIndex + 1) / this.slides.length) * 100;
      this.progressBarInner.style.width = `${progress}%`;
    } else {
      const indicators = this.slider.querySelectorAll(
        ".simple-slider-indicator"
      );
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === this.currentIndex);
      });
    }
    this.adjustHeight();
  }

  adjustHeight() {
    const activeSlide = this.slides[this.currentIndex];
    if (activeSlide) {
      const slideHeight = activeSlide.offsetHeight;
      this.slider.style.height = `${slideHeight}px`;
    }
  }

  addEventListeners() {
    this.prevButton.addEventListener("click", () => {
      this.prevSlide();
    });
    this.nextButton.addEventListener("click", () => {
      this.nextSlide();
    });

    this.slider.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].clientX;
    });

    this.slider.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });

    this.slider.addEventListener("mouseover", () => {
      this.stopAutoPlay();
    });

    this.slider.addEventListener("mouseout", () => {
      this.startAutoPlay();
    });

    window.addEventListener("resize", () => {
      this.adjustHeight();
    });
  }

  handleSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;
    if (swipeDistance > 50) {
      this.nextSlide();
    } else if (swipeDistance < -50) {
      this.prevSlide();
    }
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlider();
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayTimer);
  }
}
