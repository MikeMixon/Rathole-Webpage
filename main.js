// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add fade-in animation for elements as they come into view
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add typing effect for headlines
function typeWriter(element, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add this at the end of your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h2');
    const originalText = heroTitle.innerText;
    heroTitle.innerText = '';
    typeWriter(heroTitle, originalText);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Add back to top button
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '↑';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form submission handling
document.querySelector('#contactUs form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitButton = this.querySelector('input[type="submit"]');
    submitButton.classList.add('loading');
    
    // Simulate form submission (replace with your actual form handling)
    setTimeout(() => {
        submitButton.classList.remove('loading');
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    }, 2000);
});
