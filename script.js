const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');


// Smooth scrolling for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;
        // Find the section by id (strip the #)
        const sectionId = targetId.replace('#', '');
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        // Close mobile nav if open
        const navLinksUl = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinksUl && hamburger && navLinksUl.classList.contains('active')) {
            navLinksUl.classList.remove('active');
            hamburger.classList.remove('active');
        }
        // Scroll to section
        const yOffset = navbar ? navbar.getBoundingClientRect().height : 0;
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset - yOffset;
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    });
});

document.querySelector('.hamburger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('active');
});

// Logo click scrolls to top
logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    navLinks[0].classList.add('active');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Resume tabs functionality
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');
        
        // Update active button
        resumeBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active content
        resumeDetails.forEach(detail => detail.classList.remove('active'));
        resumeDetails[idx].classList.add('active');
    });
});

// Portfolio carousel functionality
const prevBtn = document.querySelector('.portfolio-carousel-container .prev-btn');
const nextBtn = document.querySelector('.portfolio-carousel-container .next-btn');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
let currentIndex = 0;

// Initialize carousel
function initCarousel() {
    // Only show first project initially
    portfolioDetails.forEach((detail, index) => {
        detail.classList.toggle('active', index === 0);
    });
    
    // Set up image slider
    if (imgSlide) {
        imgSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    updateButtonStates();
}

// Update carousel display
function updateCarousel() {
    // Update project details visibility
    portfolioDetails.forEach((detail, index) => {
        detail.classList.toggle('active', index === currentIndex);
    });
    
    // Update image slider position
    if (imgSlide) {
        imgSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Update button states
    updateButtonStates();
}

// Update navigation button states
function updateButtonStates() {
    prevBtn.classList.toggle('disabled', currentIndex === 0);
    nextBtn.classList.toggle('disabled', currentIndex === portfolioDetails.length - 1);
}

// Next button click handler
nextBtn.addEventListener('click', () => {
    if (currentIndex < portfolioDetails.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Previous button click handler
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});


const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input, textarea');
    const data = {
      name: inputs[0].value,
      email: inputs[1].value,
      phone: inputs[2].value,
      subject: inputs[3].value,
      message: inputs[4].value,
    };
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      // Show thank you popup, reset form, etc.
      let popup = document.getElementById('thankYouPopup');
      if (popup) popup.classList.add('show');
      this.reset();
      setTimeout(() => {
        if (popup) popup.classList.remove('show');
      }, 3000);
    } catch (err) {
      alert('Failed to send message.');
    }
  });
}
