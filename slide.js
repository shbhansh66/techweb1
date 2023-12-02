
  let slideIndex = 0;

  function showSlides() {
    const slides = document.querySelector('.slides');
    const slidesCount = document.querySelectorAll('.slide').length;

    if (slideIndex >= slidesCount) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = slidesCount - 1;
    }

    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
  }

  function nextSlide() {
    slideIndex++;
    showSlides();
  }

  function prevSlide() {
    slideIndex--;
    showSlides();
  }

  // Automatic slideshow
  setInterval(() => {
    slideIndex++;
    showSlides();
  }, 3000); // Change slide every 3 seconds
