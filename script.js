
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Scroll to section
        window.scrollTo({
            top: targetSection.offsetTop - navbar.offsetHeight,
            behavior: 'smooth'
        });
    });
});

document.querySelector('.hamburger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('active');
});

// document.querySelector('.hamburger').addEventListener('click', function() {
//   document.querySelector('.navbar').classList.toggle('active');
// });

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



// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add IDs to sections for navigation
    sections.forEach((section, index) => {
        const ids = ['home', 'services', 'resume', 'portfolio', 'contact'];
        if (index < ids.length) {
            section.id = ids[index];
        }
    });
    
    // Update href attributes in nav links
    navLinks.forEach((link, index) => {
        if (index < sections.length) {
            link.href = `#${sections[index].id}`;
        }
    });
    
    // Initialize carousel
    initCarousel();
});