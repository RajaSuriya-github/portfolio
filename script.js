// ========================================
// Navigation Functionality
// ========================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// Smooth Scrolling with Offset
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link Highlighting
// ========================================
const sections = document.querySelectorAll('section');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll(
    '.skill-category, .project-card, .responsibility-card, .stat-card, .contact-card'
);

animateOnScroll.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ========================================
// Code Window Typing Animation
// ========================================
function typeCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    let delay = 0;
    
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease-in';
            line.style.opacity = '1';
        }, delay);
        delay += 150;
    });
}

// Run typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeCodeAnimation, 500);
});

// ========================================
// Dynamic Gradient Background
// ========================================
const heroBackground = document.querySelector('.hero-background');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    const gradientX = mouseX * 100;
    const gradientY = mouseY * 100;
    
    heroBackground.style.background = `
        radial-gradient(ellipse at ${gradientX}% ${gradientY}%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.15) 0%, transparent 50%)
    `;
});

// ========================================
// Contact Cards Hover Effect
// ========================================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Skill Tags Interactive Effect
// ========================================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// ========================================
// Scroll Progress Indicator
// ========================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)';
    progressBar.style.width = '0%';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

createScrollProgress();

// ========================================
// Statistics Counter Animation
// ========================================
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent;
            
            if (text.includes('+')) {
                const targetValue = parseInt(text.replace('+', ''));
                animateCounter(number, targetValue, '+');
            } else if (text.includes('%')) {
                const targetValue = parseInt(text.replace('%', ''));
                animateCounter(number, targetValue, '%');
            }
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ========================================
// Email Protection
// ========================================
const emailCard = document.getElementById('emailCard');
if (emailCard) {
    emailCard.addEventListener('click', (e) => {
        // Placeholder for actual email - user should update this
        console.log('Email clicked - update with actual email');
    });
}

// ========================================
// Parallax Scroll Effect
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Performance Optimization
// ========================================
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    highlightNavigation();
}, 100));

// ========================================
// Loading Animation (Optional)
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Console Message (Easter Egg)
// ========================================
console.log(
    '%c👋 Hello, Developer!',
    'color: #6366f1; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cLike what you see? Let\'s connect!',
    'color: #ec4899; font-size: 14px;'
);
console.log(
    '%cBuilt with passion by Rajasuriya Madasamy',
    'color: #8b5cf6; font-size: 12px;'
);
