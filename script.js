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
    delay: 0.6,
    duration: 1
});

gsap.from(".circle1", {
    opacity: 0,
    scale: 0,
    delay: 1,
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


const container = document.querySelector('.img-placeholder');
const children = container.querySelectorAll(':scope > *:not(:first-child)');

// Set initial state
gsap.set(children, {
  marginLeft: '-200px'
});

// Animate on scroll
gsap.to(children, {
  marginLeft: '-50px',
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: container,
    start: 'top 80%',
    end: 'top 30%', 
    scrub: 1, 
  }
});

gsap.from(".title", {
  y: 500,
  opacity: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: ".forum-section",
    start: 'top 70%%',
    end: 'top 20%',
    scrub: 3
  }
});

gsap.from(".forum-body-text", {
  opacity: 0,
  duration: 5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: ".forum-section",
    start: "top 20%",
    end: 'top 0%',
    scrub: 2,
  }
});

gsap.from(".ripple-button", {
  y: 500,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: ".forum-section",
    start: 'top 15%',
    end: 'top 0%',
    scrub: 2,
  }
})





const books = document.querySelectorAll('.book');

// Store original positions
const originalPositions = [
  { y: 0, z: 1 },      // book1
  { y: -25, z: 2 },    // book2
  { y: -50, z: 10 },   // book3 (center/highest)
  { y: -25, z: 2 },    // book4
  { y: 0, z: 1 }       // book5
];

// Set initial GSAP positions (overrides Tailwind)
books.forEach((book, index) => {
  gsap.set(book, {
    y: originalPositions[index].y,
    zIndex: originalPositions[index].z
  });
});

books.forEach((book, index) => {
  book.addEventListener('mouseenter', () => {
    // Hovered book moves up from its original position
    gsap.to(book, {
      y: originalPositions[index].y - 30, // 30px above original
      zIndex: 20,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    // Other books move down from their original positions
    books.forEach((otherBook, otherIndex) => {
      if (otherIndex !== index) {
        gsap.to(otherBook, {
          y: originalPositions[otherIndex].y + 15, // 15px below original
          zIndex: originalPositions[otherIndex].z,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
  
  book.addEventListener('mouseleave', () => {
    // Reset all to original positions
    books.forEach((b, i) => {
      gsap.to(b, {
        y: originalPositions[i].y,
        zIndex: originalPositions[i].z,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
});