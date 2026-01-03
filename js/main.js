/* ==============================
   HERO SLIDER LOGIC
   ============================== */

const slider = document.querySelector(".hero__slider");
const track = document.querySelector(".hero__slider-track");
const slides = document.querySelectorAll(".hero__slide");

let currentIndex = 0;
let intervalId = null;
const AUTOPLAY_DELAY = 4000;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------- Helpers ---------- */

function getAxis() {
  return window.innerWidth <= 768 ? "x" : "y";
}

function updateSlides(index) {
  slides.forEach((slide, i) => {
    slide.setAttribute("aria-hidden", i !== index);
  });

  const axis = getAxis();
  const offset = -index * 100;

  track.style.transform =
    axis === "x" ? `translateX(${offset}%)` : `translateY(${offset}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides(currentIndex);
}

/* ---------- Autoplay ---------- */

function startAutoplay() {
  if (prefersReducedMotion) return;
  stopAutoplay();
  intervalId = setInterval(nextSlide, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

/* ---------- Interaction ---------- */

slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", startAutoplay);

slider.addEventListener("focusin", stopAutoplay);
slider.addEventListener("focusout", startAutoplay);

/* ---------- Keyboard ---------- */

slider.setAttribute("tabindex", "0");

slider.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides(currentIndex);
  }
});

/* ---------- Init ---------- */

updateSlides(currentIndex);
startAutoplay();
