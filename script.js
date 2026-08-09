
// Language switching functionality
let currentLanguage = 'sk';

function switchLanguage() {
  currentLanguage = currentLanguage === 'sk' ? 'en' : 'sk';
  updateContent();
  updateLanguageButton();
  updatePlaceholders();
}

function updateContent() {
  const elements = document.querySelectorAll('[data-en][data-sk]');
  elements.forEach(element => {
    const text = element.getAttribute(`data-${currentLanguage}`);
    if (text) {
      if (element.innerHTML.includes('<br>')) {
        element.innerHTML = text;
      } else {
        element.textContent = text;
      }
    }
  });
}

function updateLanguageButton() {
  const langBtn = document.getElementById('lang-toggle');
  langBtn.textContent = currentLanguage === 'sk' ? 'EN' : 'SK';
}

function updatePlaceholders() {
  const inputs = document.querySelectorAll('input[data-placeholder-en][data-placeholder-sk]');
  const textareas = document.querySelectorAll('textarea[data-placeholder-en][data-placeholder-sk]');
  
  [...inputs, ...textareas].forEach(element => {
    const placeholder = element.getAttribute(`data-placeholder-${currentLanguage}`);
    if (placeholder) {
      element.placeholder = placeholder;
    }
  });
}

// Initialize language functionality
document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', switchLanguage);
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact form removed

// Add scroll effect to header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(26, 26, 26, 0.98)';
  } else {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
  }
});

// Add animation on scroll for service cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Hero title now displays immediately without typing effect
