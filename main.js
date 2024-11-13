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
    if (heroTitle) {
        const originalText = heroTitle.innerText;
        heroTitle.innerText = '';
        typeWriter(heroTitle, originalText);
    }
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
document.querySelector('.contact-section form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.classList.add('loading');

    // Prepare the template parameters
    const templateParams = {
        to_name: "Rathole Drilling", // Add recipient name
        from_name: document.getElementById('the-name').value,
        from_email: document.getElementById('the-email').value,
        phone: document.getElementById('the-phone').value,
        message: document.getElementById('the-message').value,
        service: document.getElementById('the-reason').value
    };

    // Replace these with your actual EmailJS credentials
    emailjs.send(
        'Rathole-Contact-Us', // Get this from EmailJS dashboard
        'template_myfxx1', // Get this from EmailJS dashboard
        templateParams
    )
    .then(function(response) {
        submitButton.classList.remove('loading');
        alert('Thank you for your message. We will get back to you soon!');
        form.reset();
    })
    .catch(function(error) {
        submitButton.classList.remove('loading');
        console.error('EmailJS error:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
    });
});