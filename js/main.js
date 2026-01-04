function initSlider(trackSelector) {
  const track = document.querySelector(trackSelector);
  let index = 0;

  setInterval(() => {
    index = (index + 1) % track.children.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 4000);
}

initSlider(".hero__track");
initSlider(".exhibition__track");
