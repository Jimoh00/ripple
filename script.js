lucide.createIcons();

const buttons = document.querySelectorAll('.ripple-button');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    // 1. Calculate click position relative to the button
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 2. Create the ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // 3. Size the ripple based on button dimensions
    const diameter = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${diameter}px`;

    // 4. Clean up the DOM after animation finishes
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});


gsap.from(".circle3", {
    opacity: 0,
    scale: 0,
    delay: 0.2,
    duration: 1
});

gsap.from(".circle2", {
    opacity: 0,
    scale: 0,
    delay: 1,
    duration: 1
});

gsap.from("circle1", {
    opacity: 0,
    scale: 0,
    delay: 2,
    duration: 1
})

gsap.from(".book", {
    y: 5000,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
});






let slider = document.querySelector(".slider");
let images = gsap.utils.toArray(".img");

function sliderCircle() {
  let radius = slider.offsetWidth / 2;
  let center = slider.offsetWidth / 2;
  let total = images.length;
  let slice = (2 * Math.PI) / total;

  images.forEach((item, i) => {
    let radian = i * slice;

    let x = radius * Math.sin(radian) + center;
    let y = - radius * Math.cos(radian) + center;

    gsap.set(item, {
      rotation: radian + "rad",
      xPercent: -50,
      yPercent: -50,
      x: x,
      y: y
    });
  });
}

sliderCircle();

window.addEventListener("resize", sliderCircle);

let imageInfo = document.querySelector(".image-info");
let currentName = document.getElementById("current-name");
let currentAuthor = document.getElementById("current-author");
let currentPos = document.getElementById("current-pos");

gsap.to(".slider", {
  rotate: () => -360,
  ease: "none",
  scrollTrigger: {
    trigger: ".top-books-section",
    start: "top top",
    end: "+=200%",
    scrub: 1,
    pin: ".top-books-section",
    pinSpacing: true,
    onUpdate: (self) => {
      // Calculate which image is at top (12 o'clock position)
      let rotation = self.progress * 360;
      let currentIndex = Math.round(rotation / (360 / images.length)) % images.length;
      let currentImage = images[currentIndex];
      
      // Update info
      currentName.textContent = currentImage.dataset.name;
      currentAuthor.textContent = currentImage.dataset.author;
      currentPos.textContent = currentImage.dataset.position;
      
      // Show when in view
      if (self.progress > 0.05 && self.progress < 0.95) {
        imageInfo.classList.add("active");
      } else {
        imageInfo.classList.remove("active");
      }
    }
  }
});
