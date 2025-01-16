function openPopup(videoUrl) {
  const overlay = document.getElementById("overlay");
  const iframe = document.getElementById("youtubeVideo");

  // Встановлюємо URL відео
  iframe.src = videoUrl;

  overlay.classList.add("visible");
  overlay.classList.remove("hidden");
}

function closePopup() {
  const overlay = document.getElementById("overlay");
  const iframe = document.getElementById("youtubeVideo");

  overlay.classList.remove("visible");
  overlay.classList.add("hidden");

  // Зупиняємо відео, очищуючи src
  iframe.src = "";
}
