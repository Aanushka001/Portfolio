// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check if user has a theme preference stored
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !burger.contains(event.target) && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach((link) => {
                link.style.animation = '';
            });
        }
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            }
        });
    });
};

// Scroll Progress Indicator
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
    
    // Scroll animations for sections
    animateSectionsOnScroll();
};

// Animate sections when they come into view
function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('.section-animate');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('show-section');
        }
    });
}

// Certificate Modal
const certificates = document.querySelectorAll('.certificate');
const modal = document.getElementById('certificateModal');
const certificateFrame = document.getElementById('certificateFrame');

certificates.forEach(cert => {
    const viewBtn = cert.querySelector('.view-cert-btn');
    viewBtn.addEventListener('click', () => {
        const certId = cert.getAttribute('data-cert');
        openCertificateModal(certId);
    });
});

function openCertificateModal(certId) {
    // Map certificate IDs to their full-size images
    const certMap = {
        'cert1': 'certificate1-full.png',
        'cert2': 'certificate2-full.png',
        'cert3': 'certificate3-full.png',
        'cert4': 'certificate4-full.png',
        'cert5': 'certificate5-full.png',
        'cert6': 'certificate6-full.png'
    };
    
    certificateFrame.src = certMap[certId];
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCertificate() {
    modal.classList.remove('show');
    certificateFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeCertificate();
    }
});

// Escape key to close modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeCertificate();
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link highlighting
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

function setActiveNavItem() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + currentSection) {
            item.classList.add('active');
        }
    });
}

// Initialize functions on load
window.addEventListener('load', () => {
    navSlide();
    animateSectionsOnScroll();
    setActiveNavItem();
});

// Update active nav item on scroll
window.addEventListener('scroll', setActiveNavItem);