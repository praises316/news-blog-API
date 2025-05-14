document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("list");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const dotsContainer = document.getElementById("dotList");
  const slides = document.querySelectorAll("#list li");
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoPlayInterval;

  // Create navigation dots
  function createDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("li");
      dot.className =
        "w-2 h-2 rounded-full bg-gray-300 cursor-pointer transition-all";
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  // Update active dot
  function updateDots() {
    const dots = dotsContainer.querySelectorAll("li");
    dots.forEach((dot, index) => {
      dot.classList.toggle("bg-blue-500", index === currentIndex);
      dot.classList.toggle("w-4", index === currentIndex);
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoPlay();
  }

  // Update slider position
  function updateSlider() {
    const slideWidth = slides[0].clientWidth;
    list.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Reset autoplay timer
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  // Event listeners
  prevButton.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  // Initialize
  createDots();
  resetAutoPlay();

  // Handle window resize
  window.addEventListener("resize", () => {
    updateSlider();
  });
});
