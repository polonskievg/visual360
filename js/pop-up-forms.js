// document.querySelectorAll(".trigger-button").forEach((button) => {
//   button.addEventListener("click", () => {
//     const popupId = button.dataset.popup;
//     document.getElementById(popupId).style.display = "flex";
//     disableScroll();
//   });
// });

// document.querySelectorAll(".popupForm__close").forEach((button) => {
//   button.addEventListener("click", () => {
//     const popupId = button.dataset.close;
//     document.getElementById(popupId).style.display = "none";
//     enableScroll();
//   });
// });

// function disableScroll() {
//   const scrollPosition = window.scrollY;
//   document.body.style.position = "fixed";
//   document.body.style.top = `-${scrollPosition}px`;
//   document.body.style.width = "100%";
// }

// function enableScroll() {
//   const scrollPosition = Math.abs(parseInt(document.body.style.top || "0", 10));
//   document.body.style.position = "";
//   document.body.style.top = "";
//   window.scrollTo(0, scrollPosition);
// }
