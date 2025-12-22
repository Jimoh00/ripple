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
    stagger: 0.3,
    ease: "power2.out",
});
