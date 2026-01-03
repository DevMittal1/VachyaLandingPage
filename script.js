// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
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

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Button click handlers
const ctaButtons = document.querySelectorAll('#cta-btn, #hero-cta, .pricing-btn');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Thank you for your interest! This is a demo landing page. In production, this would redirect to a signup page.');
    });
});

const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
    alert('Login functionality would be implemented here.');
});

const demoBtn = document.getElementById('demo-btn');
demoBtn.addEventListener('click', () => {
    alert('Demo video would play here. In production, this would open a video modal.');
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animate numbers on scroll
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (element.textContent.includes('K')) {
            element.textContent = (value / 1000).toFixed(0) + 'K+';
        } else if (element.textContent.includes('M')) {
            element.textContent = (value / 1000000).toFixed(1) + 'M+';
        } else if (element.textContent.includes('%')) {
            element.textContent = (value / 10).toFixed(1) + '%';
        } else {
            element.textContent = value;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observe hero stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('K')) {
                    animateValue(stat, 0, 10000, 2000);
                } else if (text.includes('M')) {
                    animateValue(stat, 0, 2000000, 2000);
                } else if (text.includes('%')) {
                    animateValue(stat, 0, 999, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Animate dashboard metrics
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricValues = entry.target.querySelectorAll('.metric-value');
            metricValues.forEach(metric => {
                const text = metric.textContent;
                if (text.includes(',')) {
                    const num = parseInt(text.replace(',', ''));
                    animateValue(metric, 0, num, 2000);
                    setTimeout(() => {
                        metric.textContent = num.toLocaleString();
                    }, 2000);
                } else if (text.includes('s')) {
                    const num = parseFloat(text) * 10;
                    animateValue(metric, 0, num, 2000);
                    setTimeout(() => {
                        metric.textContent = (num / 10).toFixed(1) + 's';
                    }, 2000);
                } else if (text.includes('%')) {
                    const num = parseFloat(text) * 10;
                    animateValue(metric, 0, num, 2000);
                    setTimeout(() => {
                        metric.textContent = (num / 10).toFixed(1) + '%';
                    }, 2000);
                }
            });
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const metricsRow = document.querySelector('.metrics-row');
if (metricsRow) {
    metricsObserver.observe(metricsRow);
}

// Add parallax effect to hero orbs
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Typing animation for chat messages
const typingAnimation = () => {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;
    
    setTimeout(() => {
        const typingMessage = document.querySelector('.message.typing');
        if (typingMessage) {
            typingMessage.classList.remove('typing');
            typingMessage.querySelector('.message-bubble').innerHTML = 
                "We're open Monday-Friday, 9 AM - 6 PM EST. How else can I assist you?";
        }
    }, 3000);
};

// Start typing animation when page loads
window.addEventListener('load', typingAnimation);

console.log('Vachya.ai landing page loaded successfully!');
