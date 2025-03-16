// Navigation menu toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle nav
            nav.classList.toggle('nav-active');

            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger animation
            burger.classList.toggle('toggle');
        });
    }
};

// Scroll Progress Bar
const progressBar = () => {
    const progressBar = document.getElementById('progressBar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
        const progress = (window.pageYOffset / totalHeight) * 100;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    });
};

// Smooth scrolling for nav links
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                if (nav.classList.contains('nav-active')) {
                    const burger = document.querySelector('.burger');
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    // Reset animations
                    const navLinks = document.querySelectorAll('.nav-links li');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                // Scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Section reveal on scroll
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const revealPoint = 150;
    
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - revealPoint) {
                section.classList.add('visible');
            }
        });
    });
    
    // Trigger once on load
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 300);
};

// Certificate modal
function openCertificate(cert) {
    let links = {
        "cert1": "https://drive.google.com/file/d/1GxJN32K0wrPk9w2ryQIaPwH6ECLGdw3d/view",
        "cert2": "https://drive.google.com/file/d/1ZxqjtkgBItXo4Tdl2MZ5Mkm4YGxyykby/view",
        "cert3": "https://drive.google.com/file/d/1HEK_6dtoNRwDi3WO10Z2Qb7c5LMg9Jfd/view",
        "cert4": "image.png",
        "cert5": "certificate5-thumbnail.png", // Accenture Developer Job Simulation
        "cert6": "certificate6-thumbnail.png"  // Deloitte Technology Job Simulation
    };
    
    const modal = document.getElementById("certificateModal");
    const iframe = document.getElementById("certificateFrame");
    
    if (modal && iframe) {
        iframe.src = links[cert];
        modal.style.display = "flex";
        
        // Add transition effect
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}
function closeCertificate() {
    const modal = document.getElementById("certificateModal");
    
    if (modal) {
        modal.classList.remove('active');
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
            modal.style.display = "none";
            document.getElementById("certificateFrame").src = "";
        }, 300);
    }
}

// Theme toggle functionality
const themeToggle = () => {
    const themeToggler = document.querySelector('.theme-toggle');
    
    if (themeToggler) {
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                themeToggler.classList.add('active');
            }
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggler.classList.add('active');
        }
        
        // Toggle theme on click
        themeToggler.addEventListener('click', () => {
            themeToggler.classList.toggle('active');
            
            if (themeToggler.classList.contains('active')) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    progressBar();
    smoothScroll();
    revealSections();
    themeToggle();
});