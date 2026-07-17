const slides = document.querySelectorAll(".banner-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let interval;
setInterval(() => {
    slideBanner(1);
}, 4000);
showSlide = (index) => {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = index;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

slideBanner = (step) => {
    showSlide(currentSlide + step);
}

goToSlide = (index) => {
    showSlide(index);
}
