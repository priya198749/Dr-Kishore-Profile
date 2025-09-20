// Navigation and Page Management
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupProfileUpload();
        this.setupContactForm();
        this.animateSkillBars();
        this.setupObservers();
    }

    // Navigation Setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                this.navigateToPage(targetPage);
            });
        });

        // Handle navbar collapse on mobile
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                });
            });
        }
    }

    navigateToPage(pageName) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
        }

        // Update navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Trigger animations for the new page
        this.triggerPageAnimations(pageName);
    }

    triggerPageAnimations(pageName) {
        if (pageName === 'experince') {
            setTimeout(() => {
                this.animateexperienceBars();
            }, 300);
        }
    }

    // Profile Picture Upload
    setupProfileUpload() {
        const profileImageContainer = document.querySelector('.profile-image-container');
        const profileUpload = document.getElementById('profileUpload');
        const profileImage = document.getElementById('profileImage');
        
        // Profile page upload
        const profileImageContainerProfile = document.querySelector('#profile .profile-image-container');
        const profileUploadProfile = document.getElementById('profileUploadProfile');
        const profileImageProfile = document.getElementById('profileImageProfile');

        if (profileImageContainer && profileUpload && profileImage) {
            profileImageContainer.addEventListener('click', () => {
                profileUpload.click();
            });

            profileUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profileImage.src = e.target.result;
                        // Update profile page image as well
                        if (profileImageProfile) {
                            profileImageProfile.src = e.target.result;
                        }
                        this.showNotification('Profile picture updated successfully!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Profile page upload functionality
        if (profileImageContainerProfile && profileUploadProfile && profileImageProfile) {
            profileImageContainerProfile.addEventListener('click', () => {
                profileUploadProfile.click();
            });

            profileUploadProfile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profileImageProfile.src = e.target.result;
                        // Update home page image as well
                        if (profileImage) {
                            profileImage.src = e.target.result;
                        }
                        this.showNotification('Profile picture updated successfully!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;

                // Simulate form submission
                setTimeout(() => {
                    this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, 1000);
            });
        }
    }

    // Skill Bar Animations
    animateSkillBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 500);
        });
    }

    // Intersection Observer for Animations
    setupObservers() {
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

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.skill-category, .cert-card, .achievement-card, .strength-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} notification`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Utility Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Smooth scrolling for internal links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Dynamic typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Floating animation for cards
function addFloatingAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Theme customization (can be extended)
function toggleTheme() {
    // This can be implemented for light/dark theme switching
    document.body.classList.toggle('light-theme');
}

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 15, 35, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 2000);
}

// Parallax effect for background elements
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Add custom CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification {
            display: flex;
            align-items: center;
            gap: 10px;
            border: none;
            background: rgba(0, 212, 255, 0.1);
            backdrop-filter: blur(10px);
            color: white;
            border-left: 4px solid #00D4FF;
        }
        
        .notification.alert-success {
            border-left-color: #00FF88;
        }
        
        .notification i {
            color: #00D4FF;
        }
        
        .notification.alert-success i {
            color: #00FF88;
        }
        
        .btn-close {
            filter: invert(1);
        }
    `;
    document.head.appendChild(style);
    
    // Add floating animation
    addFloatingAnimation();
    
    // Show loading animation on first load
    if (sessionStorage.getItem('visited') !== 'true') {
        showLoading();
        sessionStorage.setItem('visited', 'true');
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}